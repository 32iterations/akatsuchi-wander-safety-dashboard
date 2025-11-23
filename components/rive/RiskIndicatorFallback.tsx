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
      bg: "bg-success-50",
      ring: "border-success-500",
      glow: "shadow-success-500/30",
      text: "text-success-600",
      label: "低風險"
    },
    medium: {
      bg: "bg-warning-50",
      ring: "border-warning-500",
      glow: "shadow-warning-500/30",
      text: "text-warning-600",
      label: "中風險"
    },
    high: {
      bg: "bg-danger-50",
      ring: "border-danger-500",
      glow: "shadow-danger-500/30",
      text: "text-danger-600",
      label: "高風險"
    }
  };

  const theme = colors[riskLevel];

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-200",
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
              pulsePhase === index ? "scale-100 opacity-100" : "scale-75 opacity-20"
            )}
            style={{
              width: `${30 + index * 25}%`,
              height: `${30 + index * 25}%`,
              boxShadow: pulsePhase === index ? `0 0 24px ${theme.glow}` : "none"
            }}
          />
        ))}

        {/* Center icon */}
        <div className="z-10 flex flex-col items-center gap-3">
          {riskLevel === "high" && (
            <svg
              className={cn("h-16 w-16", theme.text)}
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
              className={cn("h-16 w-16", theme.text)}
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
              className={cn("h-16 w-16", theme.text)}
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
          <span className={cn("text-sm font-bold uppercase tracking-wide", theme.text)}>
            {theme.label}
          </span>
        </div>
      </div>
    </div>
  );
}
