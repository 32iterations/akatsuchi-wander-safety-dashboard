"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RadarDetectionProps {
  exitPosition: [number, number, number];
  targetPosition: [number, number, number];
  isActive?: boolean;
}

/**
 * 三層超聲波雷達偵測系統
 * 第三層（最外圈）: 2.0m - 預警區
 * 第二層（中圈）: 1.3m - 警戒區
 * 第一層（內圈）: 0.7m - 危險區
 */
export function RadarDetection({
  exitPosition,
  targetPosition,
  isActive = true
}: RadarDetectionProps) {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);
  const scanRef = useRef(0);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (isActive) {
      // 三層同心圓各自獨立的脈動效果
      if (ring1Ref.current) {
        const pulse1 = Math.sin(time * 1.5) * 0.08 + 1;
        ring1Ref.current.scale.set(pulse1, pulse1, 1);
        const material1 = ring1Ref.current.material as THREE.MeshBasicMaterial;
        material1.opacity = (Math.sin(time * 1.5) * 0.2 + 0.6);
      }
      if (ring2Ref.current) {
        const pulse2 = Math.sin(time * 1.5 + Math.PI / 3) * 0.08 + 1;
        ring2Ref.current.scale.set(pulse2, pulse2, 1);
        const material2 = ring2Ref.current.material as THREE.MeshBasicMaterial;
        material2.opacity = (Math.sin(time * 1.5 + Math.PI / 3) * 0.15 + 0.5);
      }
      if (ring3Ref.current) {
        const pulse3 = Math.sin(time * 1.5 + Math.PI * 2 / 3) * 0.08 + 1;
        ring3Ref.current.scale.set(pulse3, pulse3, 1);
        const material3 = ring3Ref.current.material as THREE.MeshBasicMaterial;
        material3.opacity = (Math.sin(time * 1.5 + Math.PI * 2 / 3) * 0.1 + 0.4);
      }

      // 雷達掃描旋轉
      scanRef.current += 0.015;
    }
  });

  // 計算距離
  const distance = Math.sqrt(
    Math.pow(targetPosition[0] - exitPosition[0], 2) +
    Math.pow(targetPosition[2] - exitPosition[2], 2)
  );

  // 根據距離決定顏色
  const getColor = () => {
    if (distance < 0.7) return "#DC2626"; // 深紅 - 危險區
    if (distance < 1.3) return "#EF4444"; // 紅色 - 警戒區
    if (distance < 2.0) return "#F97316"; // 橙色 - 預警區
    return "#10B981"; // 綠色 - 安全
  };

  const color = getColor();

  return (
    <group position={exitPosition}>
      {/* 第三層（最外圈）- 預警區 - 半徑 2.0m */}
      <mesh
        ref={ring3Ref}
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.85, 2.0, 64]} />
        <meshBasicMaterial
          color={distance < 2.0 ? color : "#94A3B8"}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 第二層（中圈）- 警戒區 - 半徑 1.3m */}
      <mesh
        ref={ring2Ref}
        position={[0, 0.03, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[1.15, 1.3, 64]} />
        <meshBasicMaterial
          color={distance < 1.3 ? color : "#94A3B8"}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 第一層（最內圈）- 危險區 - 半徑 0.7m */}
      <mesh
        ref={ring1Ref}
        position={[0, 0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.55, 0.7, 64]} />
        <meshBasicMaterial
          color={distance < 0.7 ? color : "#94A3B8"}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 雷達掃描線 - 旋轉動畫 */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, scanRef.current, 0]}>
        <planeGeometry args={[2.2, 0.08]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 中心感測器 */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.35, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* 感測器頂部天線 */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* 警示脈沖波 - 只在危險時顯示 */}
      {isActive && distance < 1.3 && (
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0, 2.5, 48]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
