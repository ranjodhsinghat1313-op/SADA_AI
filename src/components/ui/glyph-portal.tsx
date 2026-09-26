"use client";

/**
 * Glyph Portal © 2026 Christian Katzmann. MIT.
 * Origin: UsefulPortal.astro on https://ktzm.dk → UsefulPortal.tsx → ClarityPortal.tsx.
 * Adapted for SADA AI - 24/7 AI Receptionist.
 * A scroll-driven camera through live type. Keep this notice with copies.
 */
import { useId, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { ShaderButtons } from "@/components/ui/shader-buttons";

export type GlyphPortalStyle = CSSProperties & {
  "--gp-paper"?: string;
  "--gp-ink"?: string;
  "--gp-field"?: string;
  "--gp-foreground"?: string;
  "--gp-glyph-gradient"?: string;
  "--gp-field-bg"?: string;
};

export type GlyphPortalProps = {
  word?: string;
  /** First matching character. Omit to choose the largest safe patch of ink. */
  focusChar?: string;
  /** Hover, tap, or use arrow keys to choose a letter before scrolling. */
  interactive?: boolean;
  /** Decorative, inert, mounted once. Fill its parent with an image, video, or canvas. */
  background?: ReactNode;
  /** Optional foreground composition for the opening frame, above the clipped scene. */
  front?: ReactNode;
  children?: ReactNode;
  /** Scroll travel in visible container heights, clamped to 1–8. */
  scrollLength?: number;
  fontFamily?: string;
  fontWeight?: number;
  annotations?: boolean;
  enterLabel?: string;
  className?: string;
  style?: GlyphPortalStyle;
  /** Called once per rendered scroll frame, never through React state. */
  onProgress?: (progress: number) => void;
  mode?: "dark" | "light";
};

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const smooth = (a: number, b: number, n: number) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const DEFAULT_FONT = '"Arial Black", "Arial", sans-serif';
type Ink = { x: number; y: number; radius: number; index: number };
type Letter = { index: number; x: number; y: number; width: number; height: number };

/** Largest opaque square, in linear time. Unlike a stem guess, it works in O, S and Ø. */
function interior(context: CanvasRenderingContext2D, char: string, font: string): Omit<Ink, "index"> | null {
  if (!char || !char.trim()) return null;
  const canvas = context.canvas;
  context.font = font;
  const m = context.measureText(char);
  const pad = 12;
  const left = Math.ceil(m.actualBoundingBoxLeft || 0);
  const ascent = Math.ceil(m.actualBoundingBoxAscent || 70);
  const right = Math.ceil(m.actualBoundingBoxRight || m.width || 60);
  const descent = Math.ceil(m.actualBoundingBoxDescent || 20);
  canvas.width = Math.max(10, left + right + pad * 2);
  canvas.height = Math.max(10, ascent + descent + pad * 2);
  context.font = font;
  context.fontKerning = "none";
  context.fillStyle = "#000000";
  context.fillText(char, pad + left, pad + ascent);
  const { width, height } = canvas;
  const pixels = context.getImageData(0, 0, width, height).data;
  const rows = new Uint16Array(width + 1);
  let size = 0, bx = 0, by = 0;
  for (let y = 0; y < height; y++) {
    let diagonal = 0;
    for (let x = 0; x < width; x++) {
      const above = rows[x + 1];
      rows[x + 1] = pixels[(y * width + x) * 4 + 3] > 180
        ? Math.min(above, rows[x], diagonal) + 1 : 0;
      diagonal = above;
      if (rows[x + 1] > size) { size = rows[x + 1]; bx = x; by = y; }
    }
  }
  if (size < 3) {
    // Resilient fallback disk so letters always have an ink target
    return {
      x: (right - left) / 6,
      y: (descent - ascent) / 6,
      radius: Math.max(8, (ascent + descent) / 8),
    };
  }
  // Scan at 3× SVG size. Inscribe a disk in the square, with room for raster disagreement.
  return { 
    x: (bx + 1 - size / 2 - pad - left) / 3,
    y: (by + 1 - size / 2 - pad - ascent) / 3, 
    radius: Math.max(6, (size / 2 - 1) / 3) 
  };
}

function scrollParent(element: HTMLElement): HTMLElement | null {
  for (let p = element.parentElement; p; p = p.parentElement) {
    // Only return if it is explicitly an overflow container with non-visible overflow and not document/body
    const style = getComputedStyle(p);
    if (/(auto|scroll)/.test(style.overflowY) && p !== document.body && p !== document.documentElement && !p.hasAttribute("data-page-scroll")) {
      return p;
    }
  }
  return null;
}

export default function GlyphPortal({
  word = "SADA AI", focusChar, interactive = true, background, front, children, scrollLength = 2.4,
  fontFamily = DEFAULT_FONT, fontWeight = 900, annotations = false,
  enterLabel = "Explore More", className, style, onProgress, mode,
}: GlyphPortalProps) {
  const uid = `gp-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const clipId = `${uid}-clip`;
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(onProgress);
  useLayoutEffect(() => { progressRef.current = onProgress; }, [onProgress]);
  const text = word.trim().normalize("NFC") || "SADA AI";
  let characterOffset = 0;
  const characters = Array.from(text, (char) => {
    const index = characterOffset; characterOffset += char.length;
    return { char, index };
  });
  const length = Number.isFinite(scrollLength) ? clamp(scrollLength, 1, 8) : 2.6;
  const weight = Number.isFinite(fontWeight) ? clamp(fontWeight, 1, 1000) : 900;
  const hasFront = front != null;
  const q = `:where(#${uid})`;

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    if (!section) return;
    const pin = section.querySelector<HTMLElement>("[data-gp-pin]")!;
    const field = section.querySelector<HTMLElement>("[data-gp-field]")!;
    const art = section.querySelector<SVGSVGElement>("[data-gp-art]")!;
    const clip = section.querySelector<SVGClipPathElement>(`#${clipId}`)!;
    const glyph = section.querySelector<SVGTextElement>("[data-gp-glyph]")!;
    const marks = section.querySelector<SVGGElement>("[data-gp-marks]")!;
    const choices = section.querySelector<HTMLElement>("[data-gp-choices]")!;
    const buttons = Array.from(choices.querySelectorAll<HTMLButtonElement>("button"));
    const picker = section.querySelector<HTMLSelectElement>("[data-gp-select]")!;
    const root = scrollParent(section);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    let disposed = false, raf = 0, dirty = true, active = true, ready = false;
    let browserFrameSeen = true;
    let stalled = false;
    let W = 1, H = 1, travel = 1, startScale = 1, endScale = 1;
    let center = { x: 0, y: 0 }, target: Ink | null = null;
    let lastProgress = -1;
    let candidates: Ink[] = [], letters: Letter[] = [];
    let choosing = false;
    let bounds = { x: 0, y: 0, width: 1, height: 1 };
    let fontDirty = true;
    
    // Freeze an available face for this mount
    glyph.style.fontFamily = fontFamily;
    const computedFamily = getComputedStyle(glyph).fontFamily;
    const families = computedFamily.match(/(?:[^,"']+|"[^"]*"|'[^']*')+/g) ?? [];
    const available = families.filter((family) => {
      try { return document.fonts.check(`${weight} 100px ${family.trim()}`, text); }
      catch { return false; }
    });
    glyph.style.fontFamily = [...available, DEFAULT_FONT].join(",");
    stalled = false; // Never stall motion so zoom in works smoothly

    const readInk = () => {
      if (!context) return false;
      const font = getComputedStyle(glyph);
      const scanFont = `${font.fontWeight} 300px ${font.fontFamily}`;
      context.font = `${font.fontWeight} 100px ${font.fontFamily}`;
      context.fontKerning = "none";
      const metrics = context.measureText(text);
      const advances = Array.from({ length: text.length }, (_, i) => context.measureText(text.slice(0, i)).width);
      bounds = { 
        x: -Math.max(1, metrics.actualBoundingBoxLeft || 0), 
        y: -Math.max(1, metrics.actualBoundingBoxAscent || 70),
        width: Math.max(10, (metrics.actualBoundingBoxLeft || 0) + (metrics.actualBoundingBoxRight || metrics.width || 100)),
        height: Math.max(10, (metrics.actualBoundingBoxAscent || 70) + (metrics.actualBoundingBoxDescent || 20)) 
      };
      if (!bounds.width || !bounds.height) return false;
      center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
      const requested = focusChar ? text.indexOf(focusChar.normalize("NFC")) : -1;
      let offset = 0;
      candidates = []; letters = [];
      for (const char of Array.from(text)) {
        context.font = `${font.fontWeight} 100px ${font.fontFamily}`;
        const m = context.measureText(char);
        const left = m.actualBoundingBoxLeft || 0;
        const ascent = m.actualBoundingBoxAscent || 70;
        const right = m.actualBoundingBoxRight || m.width || 60;
        const descent = m.actualBoundingBoxDescent || 20;
        letters.push({ 
          index: offset, 
          x: advances[offset] - left,
          y: -ascent, 
          width: Math.max(10, left + right),
          height: Math.max(10, ascent + descent) 
        });
        const found = interior(context, char, scanFont);
        if (found) candidates.push({ ...found, x: found.x + advances[offset], index: offset });
        offset += char.length;
      }
      target = candidates.find((candidate) => candidate.index === requested) 
        ?? [...candidates].sort((a, b) => b.radius - a.radius || Math.abs(a.x - center.x) - Math.abs(b.x - center.x))[0] 
        ?? (candidates[0] || { x: center.x, y: center.y, radius: 25, index: 0 });
      return true;
    };

    const select = (next: Ink | null) => {
      target = next || candidates[0] || { x: center.x, y: center.y, radius: 25, index: 0 };
      const isMobile = W < 768;
      const baseScale = target ? Math.hypot(W, H) / (target.radius * (isMobile ? 0.25 : 1.35)) : 15;
      endScale = target ? Math.max(startScale * (isMobile ? 90 : 12), baseScale * (isMobile ? 8 : 1)) : startScale * (isMobile ? 90 : 15);
      section.dataset.gpFocus = target ? Array.from(text.slice(target.index))[0] : "";
      section.dataset.gpFocusIndex = String(target?.index ?? -1);
      for (const button of buttons) {
        const selected = Number(button.dataset.gpLetter) === target?.index;
        button.disabled = !candidates.some((candidate) => candidate.index === Number(button.dataset.gpLetter));
        button.setAttribute("aria-checked", String(selected));
        button.tabIndex = selected ? 0 : -1;
      }
      if (picker.value !== "") picker.value = String(target?.index ?? -1);
      for (const option of Array.from(picker.options)) option.disabled = option.value === "" || !candidates.some((candidate) => candidate.index === Number(option.value));
      const u = 1 / startScale;
      const y = bounds.y + bounds.height + 25 * u;
      const x = bounds.x;
      const right = x + bounds.width;
      const cross = target ? `M${target.x - 9 * u} ${target.y}h${18 * u}M${target.x} ${target.y - 9 * u}v${18 * u}` : "";
      const annotationPath = marks.querySelector("path")!;
      annotationPath.setAttribute("d", `M${x} ${y}H${right}M${x} ${y - 5 * u}v${10 * u}M${right} ${y - 5 * u}v${10 * u}${cross}`);
      annotationPath.setAttribute("stroke-width", String(u));
    };

    const position = () => {
      if (root) {
        const origin = root.getBoundingClientRect().top + root.clientTop;
        const rootPos = clamp((origin - section.getBoundingClientRect().top) / travel);
        if (rootPos > 0) return rootPos;
      }
      // Also calculate against viewport / window scroll position
      const winOrigin = 0;
      return clamp((winOrigin - section.getBoundingClientRect().top) / travel);
    };

    const paint = (progress: number) => {
      const isStatic = motion.matches || stalled || !target;
      const p = isStatic ? 0 : progress;
      const isMobile = W < 768;
      const zoomThreshold = isMobile ? 0.82 : 0.80;
      const t = clamp(p / zoomThreshold);
      const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      const scale = Math.exp(Math.log(startScale) + Math.log(endScale / startScale) * eased);
      const blend = endScale === startScale ? 0 : (1 / scale - 1 / startScale) / (1 / endScale - 1 / startScale);
      const cx = center.x + ((target?.x ?? center.x) - center.x) * blend;
      const cy = center.y + ((target?.y ?? center.y) - center.y) * blend;
      const roll = -4 * smooth(0.06, 0.5, t) * (1 - smooth(0.62, 0.92, t));
      const initialCenterY = isMobile ? H * 0.38 : H * 0.48;
      const centerY = initialCenterY + (H * 0.50 - initialCenterY) * eased;
      const transform = `translate(${W / 2} ${centerY}) scale(${scale}) rotate(${roll}) translate(${-cx} ${-cy})`;
      const radians = roll * Math.PI / 180;
      const dx = W / 2 / scale, dy = centerY / scale;
      clip.setAttribute("transform", `scale(${scale}) rotate(${roll})`);
      glyph.setAttribute("transform", `translate(${Math.cos(radians) * dx + Math.sin(radians) * dy - cx} ${-Math.sin(radians) * dx + Math.cos(radians) * dy - cy})`);
      marks.setAttribute("transform", transform);
      marks.style.opacity = String(1 - smooth(0.015, 0.17, p));
      choosing = interactive && !isStatic && p < .04;
      choices.inert = !choosing;
      section.dataset.gpChoosing = String(choosing);
      field.style.clipPath = t >= 1 ? "none" : `url(#${clipId})`;
      const interiorBlend = smooth(0.55, 0.88, p);
      section.style.setProperty("--gp-glyph-opacity", String(1 - interiorBlend));
      section.style.setProperty("--gp-interior-opacity", String(interiorBlend));
      section.style.setProperty("--gp-caption", String(1 - smooth(0.01, 0.16, p)));
      section.style.setProperty("--gp-reveal", String(isStatic ? 1 : smooth(0.80, 0.93, p)));
      section.style.setProperty("--gp-field-scale", String(1 + .16 * smooth(0, 0.85, p)));
      section.style.setProperty("--gp-caption-hit", p < 0.08 ? "auto" : "none");
      section.dataset.gpEntered = String(p >= 0.90);
      section.dataset.gpProgress = p.toFixed(5);
      if (p !== lastProgress) { lastProgress = p; progressRef.current?.(p); }
    };

    const layout = () => {
      if (!section.clientWidth) return;
      W = pin.clientWidth;
      const isMobile = W < 768;
      const smallViewport = section.querySelector<HTMLElement>("[data-gp-viewport]")?.offsetHeight || window.innerHeight;
      const measuredH = Math.max(
        window.innerHeight,
        window.visualViewport?.height ?? 0,
        smallViewport
      );
      const viewportHeight = isMobile
        ? (window.visualViewport?.height || window.innerHeight)
        : Math.max(1, Math.min(root?.clientHeight ?? smallViewport, smallViewport));
      H = motion.matches ? Math.min(viewportHeight * 0.75, 480) : viewportHeight;
      section.style.setProperty("--gp-height", `${H}px`);
      const effectiveLength = isMobile ? 1.45 : Math.min(length, 2.6);
      travel = H * effectiveLength;
      section.style.setProperty("--gp-length", String(effectiveLength));
      art.setAttribute("viewBox", `0 0 ${W} ${H}`);
      if (fontDirty) { ready = readInk(); fontDirty = false; }
      if (!ready) return;
      const widthFactor = isMobile ? 0.86 : 0.975;
      const maxWordHeight = hasFront && H < 480 ? Math.min(H * 0.28, Math.max(24, H - 240)) : (isMobile ? H * 0.18 : H * 0.27);
      startScale = Math.min((W * widthFactor) / bounds.width, maxWordHeight / bounds.height);
      select(target);
      const wordCenterY = isMobile ? H * 0.38 : H * 0.48;
      for (const button of buttons) {
        const letter = letters.find((item) => item.index === Number(button.dataset.gpLetter))!;
        if (letter) {
          Object.assign(button.style, {
            left: `${W / 2 + (letter.x - center.x) * startScale}px`,
            top: `${wordCenterY + (letter.y - center.y) * startScale - Math.max(0, 44 - letter.height * startScale) / 2}px`,
            width: `${Math.max(1, letter.width * startScale)}px`,
            height: `${Math.max(44, letter.height * startScale)}px`,
          });
        }
      }
      section.style.setProperty("--gp-word-top", `${wordCenterY - bounds.height * startScale / 2}px`);
      section.style.setProperty("--gp-word-bottom", `${wordCenterY + bounds.height * startScale / 2}px`);
      section.dataset.gpReady = "true";
      section.dataset.gpMotion = !motion.matches && target ? "on" : "off";

      if (field) {
        field.style.clipPath = "none";
        void field.offsetHeight;
        field.style.clipPath = `url(#${clipId})`;
      }
    };

    const frame = (time?: number) => {
      raf = 0;
      if (disposed) return;
      if (dirty) { dirty = false; layout(); }
      if (ready) paint(position());
    };
    const schedule = () => { if (!raf && active) raf = requestAnimationFrame(frame); };
    const resize = () => { cancelAnimationFrame(raf); dirty = true; frame(); };
    const scroll = () => {
      if (W < 768) {
        const curH = Math.max(window.innerHeight, window.visualViewport?.height ?? 0);
        if (Math.abs(curH - H) > 25) {
          dirty = true;
        }
      }
      schedule();
    };
    const choose = (event: Event) => {
      if (!choosing || position() >= .04) return;
      const button = (event.target as Element).closest<HTMLButtonElement>("[data-gp-letter]");
      const next = candidates.find((candidate) => candidate.index === Number(button?.dataset.gpLetter));
      if (!next || next === target) return;
      select(next); paint(position());
    };
    const navigate = (event: KeyboardEvent) => {
      if (!choosing || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const current = candidates.indexOf(target!);
      const index = event.key === "Home" ? 0 : event.key === "End" ? candidates.length - 1
        : (current + (event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1) + candidates.length) % candidates.length;
      buttons.find((button) => Number(button.dataset.gpLetter) === candidates[index].index)?.focus({ preventScroll: true });
    };
    const pick = () => {
      if (!choosing || position() >= .04) return;
      const next = candidates.find((candidate) => candidate.index === Number(picker.value));
      if (next) { select(next); paint(position()); }
    };
    let enterRaf = 0;
    let restoreScrollBehavior: (() => void) | null = null;

    const stopEnterAnimation = () => {
      if (enterRaf) {
        cancelAnimationFrame(enterRaf);
        enterRaf = 0;
      }
      if (restoreScrollBehavior) {
        restoreScrollBehavior();
        restoreScrollBehavior = null;
      }
    };

    const enterButton = section.querySelector<HTMLAnchorElement>("[data-gp-enter]");
    const onEnterClick = (e: MouseEvent) => {
      e.preventDefault();
      enterButton?.blur();
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      stopEnterAnimation();

      const startY = root ? root.scrollTop : window.scrollY;
      const sectionTop = section.getBoundingClientRect().top + startY;
      const targetY = sectionTop + travel;
      const distance = targetY - startY;

      if (Math.abs(distance) < 5) return;

      // Temporarily override CSS smooth scroll to allow precise frame-by-frame pacing
      const prevBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      restoreScrollBehavior = () => {
        document.documentElement.style.scrollBehavior = prevBehavior;
      };

      // Responsive smooth animation: 1100ms on mobile, 1350ms on desktop
      const isMobile = (root ? root.clientWidth : window.innerWidth) < 768;
      const duration = isMobile ? 1100 : 1350;
      const startTime = performance.now();

      const easeInOutCubic = (t: number) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentY = startY + distance * easeInOutCubic(progress);

        if (root) {
          root.scrollTop = currentY;
        } else {
          window.scrollTo(0, currentY);
        }

        if (progress < 1) {
          enterRaf = requestAnimationFrame(step);
        } else {
          stopEnterAnimation();
        }
      };

      enterRaf = requestAnimationFrame(step);
    };
    enterButton?.addEventListener("click", onEnterClick);

    // Cancel programmatic animation if user manually scrolls or touches during transition
    const onUserInterrupt = () => {
      if (enterRaf) stopEnterAnimation();
    };
    window.addEventListener("wheel", onUserInterrupt, { passive: true });
    window.addEventListener("touchmove", onUserInterrupt, { passive: true });

    choices.addEventListener("pointerover", choose);
    choices.addEventListener("click", choose);
    choices.addEventListener("focusin", choose);
    choices.addEventListener("keydown", navigate);
    picker.addEventListener("change", pick);
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    if (root) observer.observe(root);
    const visibility = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) { dirty = true; schedule(); }
      else if (raf) { cancelAnimationFrame(raf); raf = 0; }
    }, { root, rootMargin: "100% 0px" });
    visibility.observe(section);
    
    const onScroll = () => {
      const p = position();
      if (p < 0.85 && document.activeElement && section.contains(document.activeElement)) {
        (document.activeElement as HTMLElement).blur();
      }
      if (!active) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom >= -window.innerHeight && rect.top <= window.innerHeight * 2) {
          active = true;
        }
      }
      scroll();
    };

    // Listen to both container scroll and window scroll
    if (root) root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);
    motion.addEventListener("change", resize);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (!disposed) {
          fontDirty = true;
          dirty = true;
          schedule();
        }
      });
    }
    frame();
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      stopEnterAnimation();
      observer.disconnect();
      visibility.disconnect();
      enterButton?.removeEventListener("click", onEnterClick);
      window.removeEventListener("wheel", onUserInterrupt);
      window.removeEventListener("touchmove", onUserInterrupt);
      if (root) root.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      motion.removeEventListener("change", resize);
      choices.removeEventListener("pointerover", choose);
      choices.removeEventListener("click", choose);
      choices.removeEventListener("focusin", choose);
      choices.removeEventListener("keydown", navigate);
      picker.removeEventListener("change", pick);
    };
  }, [text, focusChar, interactive, fontFamily, weight, length, clipId, hasFront]);

  return (
    <section ref={sectionRef} id={uid} className={className} aria-label={text}
      style={{ "--gp-length": length, "--gp-characters": Array.from(text).length, ...style } as CSSProperties}>
      <style>{`
        ${q}{
          --gp-paper: #0A1128;
          --gp-ink: #F1F5F9;
          --gp-field: #0A1128;
          --gp-foreground: #F1F5F9;
          --gp-glyph-gradient: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 25%, #93C5FD 55%, #60A5FA 85%, #3B82F6 100%);
          --gp-field-bg: radial-gradient(circle at 50% 30%, #14213D 0%, #0A1128 70%, #060A18 100%);
          position:relative;isolation:isolate;background:var(--gp-paper);color:var(--gp-ink);font-family:system-ui,sans-serif;
        }
        ${q}>[data-gp-viewport]{position:absolute;inset:0 auto auto 0;height:100vh;height:100dvh;width:0;pointer-events:none;visibility:hidden;}
        ${q} [data-gp-pin]{position:relative;height:var(--gp-height,100dvh);min-height:var(--gp-height,100dvh);overflow:clip;isolation:isolate;container-type:size;}
        ${q} [data-gp-field]{position:absolute;inset:0;bottom:-40px;min-height:calc(100% + 40px);background:var(--gp-field);opacity:0;pointer-events:none;}
        ${q}[data-gp-ready] [data-gp-field]{opacity:1;}
        ${q} [data-gp-art]{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;}
        ${q} [data-gp-marks]{fill:none;stroke:#60A5FA;opacity:.6;}
        ${q} [data-gp-choices]{position:absolute;inset:0;visibility:hidden;pointer-events:none;}
        ${q}[data-gp-choosing=true] [data-gp-choices]{visibility:visible;}
        ${q} [data-gp-letter]{box-sizing:border-box;position:absolute;border:0;padding:0;margin:0;background:transparent;cursor:pointer;pointer-events:auto;touch-action:pan-y;}
        ${q} [data-gp-letter]:disabled{pointer-events:none;}
        ${q} [data-gp-letter]:focus-visible{outline:2px solid #2563EB;outline-offset:5px;}
        ${q} [data-gp-touch-picker]{display:none;position:absolute;top:calc(var(--gp-word-bottom,50%) + 42px);left:50%;transform:translateX(-50%);font:12px/1.4 system-ui,sans-serif;align-items:center;gap:12px;visibility:hidden;}
        ${q}[data-gp-choosing=true] [data-gp-touch-picker]{visibility:visible;}
        ${q} [data-gp-select]{min-height:44px;min-width:90px;border:1px solid #1E293B;border-radius:8px;background:#14213D;color:#F1F5F9;padding:0 10px;font:inherit;}
        ${q} [data-gp-select]:focus-visible{outline:2px solid #2563EB;outline-offset:4px;}
        @media(any-pointer:coarse){${q} [data-gp-touch-picker]{display:flex;}}
        ${q} [data-gp-fallback]{position:absolute;inset:0;display:none;place-items:center;font-size:min(calc(100cqw / var(--gp-characters)),38cqh);line-height:1;color:var(--gp-ink);}
        ${q}[data-gp-ready] [data-gp-fallback]{visibility:hidden;}
        ${q} [data-gp-caption]{position:absolute;inset:auto 8% 9%;display:flex;align-items:center;justify-content:space-between;gap:1rem;font:13px/1.4 system-ui,sans-serif;opacity:var(--gp-caption,1);pointer-events:var(--gp-caption-hit,auto);}
        ${q} [data-gp-caption]{font-family:inherit;}
        ${q} [data-gp-front]{position:absolute;inset:0;opacity:var(--gp-caption,1);pointer-events:none;}
        ${q} [data-gp-front] a,${q} [data-gp-front] button{pointer-events:var(--gp-caption-hit,auto);}
        ${q} [data-gp-front]:focus-within{opacity:1;}
        ${q} [data-gp-hint]{max-width:30ch;color:#94A3B8;}
        ${q} [data-gp-caption]:focus-within{opacity:1;pointer-events:auto;}
        ${q} [data-gp-content]{box-sizing:border-box;position:relative;min-height:var(--gp-height,100dvh);padding:clamp(32px,7%,100px);display:grid;align-content:center;color:var(--gp-foreground);background:var(--gp-field);overflow-wrap:anywhere;}
        ${q}[data-gp-motion=on] [data-gp-pin]{position:sticky;top:0;}
        ${q}[data-gp-motion=off] [data-gp-hint]{display:none;}
        ${q}[data-gp-motion=on] [data-gp-content]{margin-top:calc((var(--gp-length) - 1) * var(--gp-height));background:transparent;opacity:var(--gp-reveal,0);pointer-events:none;}
        ${q}[data-gp-motion=on][data-gp-entered=true] [data-gp-content]{pointer-events:auto;}
        ${q} [data-gp-default-title]{color:inherit;font:600 clamp(32px,5vw,68px)/1.08 "Plus Jakarta Sans",system-ui,sans-serif;letter-spacing:-.03em;max-width:16ch;margin:0 0 24px;text-wrap:balance;}
        ${q} [data-gp-default-copy]{color:#94A3B8;font:16px/1.6 system-ui,sans-serif;max-width:44ch;margin:0;}
        @media(prefers-reduced-motion:reduce){${q} [data-gp-pin]{position:relative!important;} ${q} [data-gp-content]{margin-top:0!important;opacity:1!important;background:var(--gp-field)!important;min-height:0;padding-block:64px;} ${q} [data-gp-caption]{opacity:1!important;}}
        @media(prefers-reduced-motion:reduce){${q} [data-gp-hint]{display:none;}}
      `}</style>
      <noscript><style>{`${q} [data-gp-fallback]{display:grid}${q} [data-gp-hint]{display:none}`}</style></noscript>
      <div data-gp-viewport aria-hidden="true" />
      <div data-gp-pin>
        <div data-gp-field aria-hidden="true">
          {background ?? (
            <>
              <div
                data-gp-glyph-fill
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "scale(var(--gp-field-scale,1))",
                  background: "var(--gp-glyph-gradient)",
                  opacity: "var(--gp-glyph-opacity, 1)",
                }}
              />
              <div
                data-gp-field-ambient
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--gp-field-bg)",
                  opacity: "var(--gp-interior-opacity, 0)",
                }}
              />
            </>
          )}
        </div>
        <svg data-gp-art aria-hidden="true" focusable="false">
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <text
                data-gp-glyph
                x="0"
                y="0"
                stroke="currentColor"
                strokeWidth="1.6"
                paintOrder="stroke fill"
                style={{ fontFamily, fontWeight: 950, fontSize: 100, fontKerning: "none", fontVariantLigatures: "none", letterSpacing: "0.01em" }}
              >
                {text}
              </text>
            </clipPath>
          </defs>
          <g data-gp-marks style={{ visibility: annotations ? "visible" : "hidden" }}><path /></g>
        </svg>
        <div data-gp-choices role="radiogroup" aria-label="Choose the letter to enter through">
          {characters.map(({ char, index }, i) => <button type="button" role="radio" aria-checked="false" tabIndex={-1} data-gp-letter={index} key={index} aria-label={`${char}, letter ${i + 1} of ${characters.length}`} />)}
        </div>
        <label data-gp-touch-picker><span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>Entry letter</span><select data-gp-select defaultValue="">
          <option value="" disabled>Choose a letter</option>
          {characters.map(({ char, index }, i) => <option key={index} value={index}>{i + 1} · {char}</option>)}
        </select></label>
        {front && <div data-gp-front>{front}</div>}
        <span data-gp-fallback aria-hidden="true" style={{ fontFamily, fontWeight: 950, WebkitTextStroke: "1px currentColor" }}>{text}</span>
        <div data-gp-caption>
          <span data-gp-hint aria-hidden="true">{interactive ? "Scroll down to step inside." : annotations ? "AI Receptionist · SADA AI" : ""}</span>
          <ShaderButtons
            variant="soft-surface"
            mode={(mode === "dark" || style?.["--gp-paper"] === "#0A1128") ? "light" : "dark"}
            label={typeof enterLabel === "string" ? enterLabel : "Explore More"}
            href={`#${uid}-content`}
            data-gp-enter
          />
        </div>
      </div>
      <div data-gp-content id={`${uid}-content`}>
        {children ?? <div><h2 data-gp-default-title>Every call answered. Every booking captured.</h2><p data-gp-default-copy>SADA AI delivers an always-on 24/7 intelligent receptionist tailored for Australian and New Zealand businesses.</p></div>}
      </div>
    </section>
  );
}
