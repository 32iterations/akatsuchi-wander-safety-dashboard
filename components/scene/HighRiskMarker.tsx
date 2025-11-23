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
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // 三層同心圓，各自獨立的脈動效果
    if (ring1Ref.current) {
      const pulse1 = Math.sin(time * 1.5) * 0.08 + 1;
      ring1Ref.current.scale.set(pulse1, pulse1, 1);
      const material1 = ring1Ref.current.material as THREE.MeshBasicMaterial;
      material1.opacity = (Math.sin(time * 1.5) * 0.2 + 0.5);
    }
    if (ring2Ref.current) {
      const pulse2 = Math.sin(time * 1.5 + Math.PI / 3) * 0.08 + 1;
      ring2Ref.current.scale.set(pulse2, pulse2, 1);
      const material2 = ring2Ref.current.material as THREE.MeshBasicMaterial;
      material2.opacity = (Math.sin(time * 1.5 + Math.PI / 3) * 0.15 + 0.4);
    }
    if (ring3Ref.current) {
      const pulse3 = Math.sin(time * 1.5 + Math.PI * 2 / 3) * 0.08 + 1;
      ring3Ref.current.scale.set(pulse3, pulse3, 1);
      const material3 = ring3Ref.current.material as THREE.MeshBasicMaterial;
      material3.opacity = (Math.sin(time * 1.5 + Math.PI * 2 / 3) * 0.1 + 0.3);
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
      {/* 三層超聲波雷達同心圓 - 從外到內 */}

      {/* 第三層（最外圈）- 預警區 - 半徑 2.0 */}
      <mesh
        ref={ring3Ref}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <ringGeometry args={[1.8, 2.0, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 第二層（中圈）- 警戒區 - 半徑 1.3 */}
      <mesh
        ref={ring2Ref}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <ringGeometry args={[1.1, 1.3, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 第一層（最內圈）- 危險區 - 半徑 0.7 */}
      <mesh
        ref={ring1Ref}
        rotation={[-Math.PI / 2, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <ringGeometry args={[0.5, 0.7, 48]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 中心感測器 */}
      <mesh position={[0, 0.05, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.5 : 1.0}
        />
      </mesh>

      {/* 中心小柱子（模擬超聲波感測器） */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.3, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
