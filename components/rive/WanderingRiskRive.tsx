"use client";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export function WanderingRiskRive() {
  const { RiveComponent } = useRive({
    src: "/rive/wandering-indicator.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center })
  });

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* If the .riv asset is not present yet, this will just render an empty box. */}
      <RiveComponent />
    </div>
  );
}
