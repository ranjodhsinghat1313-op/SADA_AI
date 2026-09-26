"use client";

import React, { useRef, useEffect, useState } from "react";

export interface ShaderButtonsProps {
  variant?: "soft-surface" | string;
  mode?: "dark" | "light" | "auto";
  hue?: number;
  saturation?: number;
  brightness?: number;
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  "data-gp-enter"?: boolean | string;
}

/**
 * ShaderButtons - Soft Surface Variant
 * Reference brief: A softly extruded service button with a recessed arrow control.
 * Exact colors and styles authored from the user's specification and source:
 * - Light Mode: Authored .holo-btn holographic gradient (rgba(255,255,255,0.9) to rgba(240,220,205,0.9) to rgba(220,240,255,0.9)) with #0d0a12 text.
 * - Dark Mode: Authored #0e0e11 with border-[#ffffff12] and text-white.
 * - Recessed Arrow Control: Countersunk circular socket with solar:arrow-right-linear.
 */
export function ShaderButtons({
  variant = "soft-surface",
  mode = "dark",
  hue = 0,
  saturation = 1.0,
  brightness = 1.0,
  label = "Explore More",
  href = "#",
  onClick,
  className = "",
  style = {},
  "data-gp-enter": dataGpEnter,
}: ShaderButtonsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLAnchorElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animFrame = useRef<number>(0);

  const isDarkMode = mode === "dark";

  // Canvas 2D / WebGL Raking Light Shader Surface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let time = 0;
    let running = true;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (containerRef.current) ro.observe(containerRef.current);

    const render = () => {
      if (!running || !canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      if (w > 0 && h > 0) {
        ctx.clearRect(0, 0, w, h);

        // Smooth raking light movement
        mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
        mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

        const mx = mousePos.current.x * w;
        const my = mousePos.current.y * h;

        time += 0.02;
        const breath = Math.sin(time) * 0.05;

        // Radial specular raking sheen
        const grad = ctx.createRadialGradient(
          mx,
          my,
          2,
          mx,
          my,
          Math.max(w * 0.7, 100)
        );

        if (isDarkMode) {
          grad.addColorStop(0, `rgba(255, 255, 255, ${0.14 + breath + (isHovered ? 0.08 : 0)})`);
          grad.addColorStop(0.4, `rgba(220, 240, 255, 0.06)`);
          grad.addColorStop(1, "rgba(14, 14, 17, 0)");
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${0.45 + breath + (isHovered ? 0.2 : 0)})`);
          grad.addColorStop(0.4, `rgba(240, 220, 205, 0.2)`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        }

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      animFrame.current = requestAnimationFrame(render);
    };

    animFrame.current = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(animFrame.current);
      ro.disconnect();
    };
  }, [isDarkMode, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current.targetX = (e.clientX - rect.left) / rect.width;
    mousePos.current.targetY = (e.clientY - rect.top) / rect.height;
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mousePos.current.targetX = 0.5;
    mousePos.current.targetY = 0.5;
  };

  return (
    <a
      ref={containerRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-gp-enter={dataGpEnter ?? true}
      className={`group relative inline-flex items-center gap-3 select-none rounded-full transition-all duration-300 outline-none ${
        isDarkMode ? "text-white" : "text-[#0d0a12]"
      } ${className}`}
      style={{
        padding: "6px 8px 6px 20px",
        borderRadius: "9999px",
        ...(isDarkMode
          ? {
              backgroundColor: isHovered ? "#16161b" : "#0e0e11",
              border: `1px solid ${isHovered ? "rgba(255, 255, 255, 0.22)" : "rgba(255, 255, 255, 0.12)"}`,
              boxShadow: isHovered
                ? "0 12px 28px -4px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                : "0 6px 18px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
              transform: isHovered ? "translateY(-1px)" : "translateY(0)",
            }
          : {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,220,205,0.95) 50%, rgba(220,240,255,0.95) 100%)",
              boxShadow: isHovered
                ? "0 0 30px rgba(255, 220, 180, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.85)"
                : "0 0 20px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
              transform: isHovered ? "translateY(-1px)" : "translateY(0)",
            }),
        ...style,
      }}
      aria-label={label}
    >
      {/* Canvas Raking Light Shader Surface */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-full pointer-events-none z-0"
        style={{ borderRadius: "inherit" }}
      />

      {/* Button Text Label */}
      <span
        className={`relative z-10 text-[13px] sm:text-[13.5px] font-semibold tracking-normal leading-none ${
          isDarkMode ? "text-white" : "text-[#0d0a12]"
        }`}
      >
        {label}
      </span>

      {/* Recessed Arrow Control Chamber */}
      <div
        className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
        style={{
          borderRadius: "9999px",
          ...(isDarkMode
            ? {
                background: "#060608",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:
                  "inset 0 2px 4px rgba(0, 0, 0, 0.85), inset 0 1px 2px rgba(0, 0, 0, 0.95), inset 0 -0.5px 1px rgba(255, 255, 255, 0.15)",
              }
            : {
                background: "rgba(235, 225, 215, 0.65)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
                boxShadow:
                  "inset 0 1.5px 3px rgba(0, 0, 0, 0.22), inset 0 0.5px 1px rgba(0, 0, 0, 0.3), inset 0 -0.5px 1px rgba(255, 255, 255, 0.9)",
              }),
          transform: isHovered ? "scale(1.04)" : "scale(1)",
        }}
      >
        {/* Recessed solar:arrow-right-linear Arrow Icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5"
          style={{
            color: isDarkMode ? "#FFFFFF" : "#0d0a12",
          }}
        >
          <path
            d="M4 12H20M20 12L14 6M20 12L14 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}

export default ShaderButtons;
