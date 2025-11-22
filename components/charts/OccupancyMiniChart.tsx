"use client";

import { demoOccupancy } from "@/lib/data/occupancy-demo";
import { cn } from "@/lib/utils";
import type { OccupancyStats } from "@/lib/types";

export function OccupancyMiniChart() {
  return (
    <div className="space-y-2">
      {demoOccupancy.map((zone: OccupancyStats) => {
        const width = `${Math.min(100, Math.round(zone.utilizationRate * 100))}%`;
        const barColor =
          zone.riskLevel === "high"
            ? "bg-red-500"
            : zone.riskLevel === "medium"
            ? "bg-amber-400"
            : "bg-emerald-400";
        return (
          <div key={zone.zoneId} className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-300">
              <span>{zone.zoneLabel}</span>
              <span className="tabular-nums text-slate-400">
                {zone.current}/{zone.capacity}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", barColor)}
                style={{ width }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
