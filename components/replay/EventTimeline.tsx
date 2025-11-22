"use client";

import { useMemo } from "react";
import type { WanderingEvent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Clock, AlertTriangle, CheckCircle, Users } from "lucide-react";

interface EventTimelineProps {
  event: WanderingEvent;
  className?: string;
}

/**
 * Timeline visualization for wandering events
 *
 * Shows the complete story:
 * 1. When wandering started
 * 2. What triggered the alerts
 * 3. How staff intervened
 * 4. Final resolution
 *
 * Critical for judges to understand the system's value:
 * - Early detection (before the resident reaches the exit)
 * - Clear escalation path
 * - Documented outcomes
 */
export function EventTimeline({ event, className }: EventTimelineProps) {
  const timelineItems = useMemo(() => {
    const items: Array<{
      time: Date;
      type: "start" | "trigger" | "resolution";
      label: string;
      icon: React.ReactNode;
      color: string;
    }> = [];

    // Event start
    items.push({
      time: event.startTime,
      type: "start",
      label: `${event.residentName} 開始徘徊`,
      icon: <Users className="h-4 w-4" />,
      color: "text-blue-400"
    });

    // Triggers
    event.triggers.forEach((trigger) => {
      let label = "";
      switch (trigger.type) {
        case "repeated_pacing":
          label = `同一區域來回走動 ${trigger.details.count} 次`;
          break;
        case "exit_attempt":
          label = `嘗試走向出口（第 ${trigger.details.count} 次）`;
          break;
        case "nighttime_activity":
          label = `夜間活動超過 ${trigger.details.duration} 分鐘`;
          break;
        case "zone_violation":
          label = `進入高風險區域：${trigger.details.zone}`;
          break;
      }

      items.push({
        time: trigger.timestamp,
        type: "trigger",
        label,
        icon: <AlertTriangle className="h-4 w-4" />,
        color: "text-amber-400"
      });
    });

    // Resolution
    if (event.resolution) {
      let outcomeLabel = "";
      switch (event.resolution.outcome) {
        case "returned_to_room":
          outcomeLabel = "返回房間休息";
          break;
        case "joined_activity":
          outcomeLabel = "參加活動";
          break;
        case "family_pickup":
          outcomeLabel = "家屬接回";
          break;
      }

      items.push({
        time: event.resolution.timestamp,
        type: "resolution",
        label: `${event.resolution.staffName || "工作人員"}介入 → ${outcomeLabel}`,
        icon: <CheckCircle className="h-4 w-4" />,
        color: "text-emerald-400"
      });
    }

    return items.sort((a, b) => a.time.getTime() - b.time.getTime());
  }, [event]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-TW", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className={cn("space-y-3", className)}>
      {timelineItems.map((item, index) => (
        <div key={index} className="flex gap-3">
          {/* Time */}
          <div className="flex min-w-[60px] items-center gap-1 text-xs text-slate-400">
            <Clock className="h-3 w-3" />
            <span className="tabular-nums">{formatTime(item.time)}</span>
          </div>

          {/* Connector line */}
          <div className="relative flex flex-col items-center">
            {/* Icon circle */}
            <div
              className={cn(
                "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2",
                item.type === "start" && "border-blue-500 bg-blue-500/20",
                item.type === "trigger" && "border-amber-500 bg-amber-500/20",
                item.type === "resolution" && "border-emerald-500 bg-emerald-500/20"
              )}
            >
              <span className={item.color}>{item.icon}</span>
            </div>

            {/* Vertical line to next item */}
            {index < timelineItems.length - 1 && (
              <div
                className={cn(
                  "absolute top-8 h-[calc(100%+12px)] w-0.5",
                  item.type === "trigger" ? "bg-amber-500/30" : "bg-slate-700"
                )}
              />
            )}
          </div>

          {/* Label */}
          <div className="flex-1 pb-4">
            <p className="text-sm text-slate-200">{item.label}</p>
          </div>
        </div>
      ))}

      {/* Summary note */}
      {event.resolution?.notes && (
        <div className="ml-[88px] rounded-lg border border-slate-800 bg-slate-900/60 p-3">
          <p className="text-xs text-slate-300">{event.resolution.notes}</p>
        </div>
      )}
    </div>
  );
}
