import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

interface HighRiskMarkerProps {
  position: [number, number, number];
  type: "exit" | "nursing_station" | "stairs";
}

/**
 * Pulsing marker for high-risk zones
 *
 * Visual indicators for:
 * - Exit doors (prevent wandering out)
 * - Nursing stations (where staff can respond)
 * - Stairs (fall risk areas)
 */
export function HighRiskMarker({ position, type }: HighRiskMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 1;
      meshRef.current.scale.set(pulse, pulse, 1);
    }
  });

  const colors = {
    exit: "#ef4444",           // red-500 - danger
    nursing_station: "#3b82f6", // blue-500 - safety point
    stairs: "#f59e0b"          // amber-500 - caution
  };

  const color = colors[type];

  return (
    <group position={position}>
      {/* Pulsing ring */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <ringGeometry args={[0.3, 0.4, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.9 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center dot */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.8}
        />
      </mesh>
    </group>
  );
}
