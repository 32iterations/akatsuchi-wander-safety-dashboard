"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { RiskLevel } from "@/lib/types";

interface RiskIndicatorFallbackProps {
  riskLevel?: RiskLevel;
  className?: string;
}

/**
 * Fallback component for Rive animation when .riv file is not available
 *
 * Visual design:
 * - Low risk: Slow pulsing green rings
 * - Medium risk: Medium-speed pulsing amber rings
 * - High risk: Fast pulsing red rings with alert triangle
 *
 * This will be replaced by the actual Rive animation once the designer
 * provides the wandering-indicator.riv file.
 */
export function RiskIndicatorFallback({
  riskLevel = "high",
  className
}: RiskIndicatorFallbackProps) {
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const speeds = { low: 2000, medium: 1200, high: 600 };
    const speed = speeds[riskLevel];

    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 3);
    }, speed / 3);

    return () => clearInterval(interval);
  }, [riskLevel]);

  const colors = {
    low: {
      bg: "bg-emerald-500/10",
      ring: "border-emerald-400",
      glow: "shadow-emerald-400/50",
      text: "text-emerald-300"
    },
    medium: {
      bg: "bg-amber-500/10",
      ring: "border-amber-400",
      glow: "shadow-amber-400/50",
      text: "text-amber-300"
    },
    high: {
      bg: "bg-red-500/10",
      ring: "border-red-400",
      glow: "shadow-red-400/50",
      text: "text-red-300"
    }
  };

  const theme = colors[riskLevel];

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-800",
        theme.bg,
        className
      )}
    >
      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              "absolute rounded-full border-2 transition-all duration-500",
              theme.ring,
              pulsePhase === index ? "scale-100 opacity-100" : "scale-75 opacity-30"
            )}
            style={{
              width: `${30 + index * 25}%`,
              height: `${30 + index * 25}%`,
              boxShadow: pulsePhase === index ? `0 0 20px ${theme.glow}` : "none"
            }}
          />
        ))}

        {/* Center icon */}
        <div className="z-10 flex flex-col items-center gap-2">
          {riskLevel === "high" && (
            <svg
              className={cn("h-12 w-12", theme.text)}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          {riskLevel === "medium" && (
            <svg
              className={cn("h-12 w-12", theme.text)}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          {riskLevel === "low" && (
            <svg
              className={cn("h-12 w-12", theme.text)}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <span className={cn("text-xs font-semibold uppercase tracking-wider", theme.text)}>
            {riskLevel === "high" && "高風險"}
            {riskLevel === "medium" && "中風險"}
            {riskLevel === "low" && "低風險"}
          </span>
        </div>
      </div>

      {/* Status label */}
      <div className="absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-3 py-1 text-[10px] text-slate-300 backdrop-blur-sm">
        等待 Rive 動畫檔案 • 使用 fallback 顯示
      </div>
    </div>
  );
}
