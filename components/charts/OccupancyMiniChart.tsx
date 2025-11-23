"use client";

import { demoOccupancy } from "@/lib/data/occupancy-demo";
import { cn } from "@/lib/utils";
import type { OccupancyStats } from "@/lib/types";

export function OccupancyMiniChart() {
  return (
    <div className="space-y-5">
      {demoOccupancy.map((zone: OccupancyStats) => {
        const width = `${Math.min(100, Math.round(zone.utilizationRate * 100))}%`;
        const barColor =
          zone.riskLevel === "high"
            ? "bg-danger-500"
            : zone.riskLevel === "medium"
            ? "bg-warning-500"
            : "bg-success-500";
        const bgColor =
          zone.riskLevel === "high"
            ? "bg-danger-100"
            : zone.riskLevel === "medium"
            ? "bg-warning-100"
            : "bg-success-100";
        return (
          <div key={zone.zoneId} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-neutral-800">{zone.zoneLabel}</span>
              <span className="text-base font-bold tabular-nums text-neutral-700">
                {zone.current} / {zone.capacity}
              </span>
            </div>
            <div className={cn("h-3 w-full rounded-full overflow-hidden", bgColor)}>
              <div
                className={cn("h-full rounded-full transition-all duration-300", barColor)}
                style={{ width }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
