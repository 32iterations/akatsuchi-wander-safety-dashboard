"use client";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import { RiskIndicatorFallback } from "./RiskIndicatorFallback";
import { useState, useEffect } from "react";
import type { RiskLevel } from "@/lib/types";

interface WanderingRiskRiveProps {
  riskLevel?: RiskLevel;
}

/**
 * Rive-powered risk indicator with graceful fallback
 *
 * Expected Rive state machine inputs:
 * - risk_level (number): 0 = low, 1 = medium, 2 = high
 *
 * If the .riv file is not available, falls back to CSS/SVG animation
 */
export function WanderingRiskRive({ riskLevel = "high" }: WanderingRiskRiveProps) {
  const [hasRiveFile, setHasRiveFile] = useState(true);

  const { RiveComponent, rive } = useRive({
    src: "/rive/wandering-indicator.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
    onLoadError: () => {
      setHasRiveFile(false);
    }
  });

  // Update Rive state machine when risk level changes
  useEffect(() => {
    if (rive && hasRiveFile) {
      const stateMachine = rive.stateMachineInputs("State Machine 1");
      const riskInput = stateMachine?.find((input) => input.name === "risk_level");
      if (riskInput) {
        const levelMap = { low: 0, medium: 1, high: 2 };
        riskInput.value = levelMap[riskLevel];
      }
    }
  }, [rive, riskLevel, hasRiveFile]);

  if (!hasRiveFile) {
    return <RiskIndicatorFallback riskLevel={riskLevel} />;
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <RiveComponent />
    </div>
  );
}
