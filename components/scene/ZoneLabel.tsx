"use client";

import { Text } from "@react-three/drei";
import type { Vector3 } from "three";
import { useState, useEffect } from "react";

interface ZoneLabelProps {
  position: Vector3 | [number, number, number];
  text: string;
  color?: string;
  riskLevel?: "low" | "medium" | "high";
}

/**
 * 3D Text label for zones in the digital twin
 *
 * Helps judges quickly identify:
 * - What each area is (daycare, garden, hall, etc.)
 * - Risk level at a glance (color-coded)
 */
export function ZoneLabel({
  position,
  text,
  color = "#94a3b8",
  riskLevel
}: ZoneLabelProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const riskColors = {
    low: "#10b981",    // emerald-500
    medium: "#f59e0b", // amber-500
    high: "#ef4444"    // red-500
  };

  const labelColor = riskLevel ? riskColors[riskLevel] : color;

  // Only render Text on client to avoid SSR hydration mismatch
  if (!mounted) return null;

  return (
    <Text
      position={position}
      fontSize={0.25}
      color={labelColor}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#020617"
    >
      {text}
    </Text>
  );
}
