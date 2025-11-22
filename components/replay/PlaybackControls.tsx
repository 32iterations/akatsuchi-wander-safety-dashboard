"use client";

import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlaybackControlsProps {
  onPlay?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onSpeedChange?: (speed: number) => void;
  isPlaying?: boolean;
  className?: string;
}

/**
 * Video-style playback controls for event replay
 *
 * Allows judges to:
 * - Play/pause the animation
 * - Adjust playback speed (1x, 2x, 4x)
 * - Reset to beginning
 * - Skip to key moments
 *
 * Makes the demo more engaging and interactive
 */
export function PlaybackControls({
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  isPlaying = false,
  className
}: PlaybackControlsProps) {
  const [speed, setSpeed] = useState(1);

  const speeds = [
    { value: 1, label: "1x" },
    { value: 2, label: "2x" },
    { value: 4, label: "4x" }
  ];

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    onSpeedChange?.(newSpeed);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {/* Reset button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-9 w-9 p-0"
          title="重新播放"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        {/* Play/Pause button */}
        <Button
          variant="default"
          size="sm"
          onClick={isPlaying ? onPause : onPlay}
          className="h-9 w-9 p-0"
          title={isPlaying ? "暫停" : "播放"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4" fill="currentColor" />
          )}
        </Button>

        {/* Skip forward button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          title="跳至下一個事件"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Speed controls */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">播放速度：</span>
        <div className="flex gap-1">
          {speeds.map((s) => (
            <button
              key={s.value}
              onClick={() => handleSpeedChange(s.value)}
              className={cn(
                "rounded-lg px-2 py-1 text-xs font-medium transition-colors",
                speed === s.value
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            isPlaying ? "animate-pulse bg-emerald-400" : "bg-slate-600"
          )}
        />
        <span className="text-xs text-slate-400">
          {isPlaying ? "播放中" : "已暫停"}
        </span>
      </div>
    </div>
  );
}
