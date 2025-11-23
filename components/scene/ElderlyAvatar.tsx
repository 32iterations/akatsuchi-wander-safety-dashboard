"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ElderlyAvatarProps {
  position: [number, number, number];
  isMoving?: boolean;
  name?: string;
}

/**
 * 失智症老人虛擬人物 - 王奶奶
 * 專業逼真的 3D avatar 設計
 */
export function ElderlyAvatar({
  position,
  isMoving = false,
  name = "王奶奶"
}: ElderlyAvatarProps) {
  const [mounted, setMounted] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);
  const walkCycle = useRef(0);
  const headRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame((state) => {
    if (groupRef.current && isMoving) {
      // 行走動畫週期
      walkCycle.current += 0.12;

      // 上下擺動（模擬步行）
      groupRef.current.position.y = position[1] + Math.sin(walkCycle.current) * 0.08;

      // 輕微左右搖擺
      groupRef.current.rotation.y = Math.sin(walkCycle.current * 0.5) * 0.15;

      // 頭部微微點動（老人特徵）
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(walkCycle.current * 0.3) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* === 身體部分 === */}

      {/* 駝背的軀幹（老人特徵） - 深灰色衣服 */}
      <mesh position={[0, 0.35, 0.05]} rotation={[0.15, 0, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.45, 8, 16]} />
        <meshStandardMaterial color="#4A5568" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* 襯衫細節 - 領子（淺藍色） */}
      <mesh position={[0, 0.6, 0.08]} castShadow>
        <boxGeometry args={[0.2, 0.08, 0.05]} />
        <meshStandardMaterial color="#E0F2FE" roughness={0.5} />
      </mesh>

      {/* === 頭部 === */}

      {/* 頭部主體 - 膚色加深以提高對比 */}
      <mesh ref={headRef} position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#F4A460" roughness={0.5} />
      </mesh>

      {/* 白髮（老人特徵） - 灰白色 */}
      <mesh position={[0, 0.88, 0]} castShadow>
        <sphereGeometry args={[0.145, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.8} />
      </mesh>

      {/* 眼睛 - 左 */}
      <mesh position={[-0.05, 0.82, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#2C3E50" />
      </mesh>

      {/* 眼睛 - 右 */}
      <mesh position={[0.05, 0.82, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial color="#2C3E50" />
      </mesh>

      {/* 鼻子 */}
      <mesh position={[0, 0.78, 0.14]}>
        <coneGeometry args={[0.02, 0.05, 8]} />
        <meshStandardMaterial color="#FFD4B4" />
      </mesh>

      {/* 嘴巴（焦慮表情 - 微張） */}
      <mesh position={[0, 0.74, 0.13]}>
        <capsuleGeometry args={[0.01, 0.04, 4, 8]} />
        <meshBasicMaterial color="#8B4A4A" />
      </mesh>

      {/* === 手臂 === */}

      {/* 左手臂上臂 - 深灰衣袖 */}
      <mesh position={[-0.22, 0.45, 0]} rotation={[0, 0, 0.4]} castShadow>
        <capsuleGeometry args={[0.045, 0.22, 8, 16]} />
        <meshStandardMaterial color="#4A5568" roughness={0.7} />
      </mesh>

      {/* 左手臂下臂 - 膚色加深 */}
      <mesh position={[-0.3, 0.25, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.04, 0.18, 8, 16]} />
        <meshStandardMaterial color="#F4A460" roughness={0.5} />
      </mesh>

      {/* 右手臂上臂 - 深灰衣袖 */}
      <mesh position={[0.22, 0.45, 0]} rotation={[0, 0, -0.4]} castShadow>
        <capsuleGeometry args={[0.045, 0.22, 8, 16]} />
        <meshStandardMaterial color="#4A5568" roughness={0.7} />
      </mesh>

      {/* 右手臂下臂 - 膚色加深 */}
      <mesh position={[0.3, 0.25, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.04, 0.18, 8, 16]} />
        <meshStandardMaterial color="#F4A460" roughness={0.5} />
      </mesh>

      {/* === 腿部 === */}

      {/* 左腿上部 - 深藍褲子 */}
      <mesh position={[-0.09, 0.08, 0.05]} castShadow>
        <capsuleGeometry args={[0.055, 0.28, 8, 16]} />
        <meshStandardMaterial color="#1E3A5F" roughness={0.8} />
      </mesh>

      {/* 左腿下部 */}
      <mesh position={[-0.09, -0.25, 0.05]} castShadow>
        <capsuleGeometry args={[0.05, 0.25, 8, 16]} />
        <meshStandardMaterial color="#1E3A5F" roughness={0.8} />
      </mesh>

      {/* 左腳 - 深棕色鞋子 */}
      <mesh position={[-0.09, -0.42, 0.08]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.12]} />
        <meshStandardMaterial color="#3E2723" roughness={0.6} />
      </mesh>

      {/* 右腿上部 - 深藍褲子 */}
      <mesh position={[0.09, 0.08, 0.05]} castShadow>
        <capsuleGeometry args={[0.055, 0.28, 8, 16]} />
        <meshStandardMaterial color="#1E3A5F" roughness={0.8} />
      </mesh>

      {/* 右腿下部 */}
      <mesh position={[0.09, -0.25, 0.05]} castShadow>
        <capsuleGeometry args={[0.05, 0.25, 8, 16]} />
        <meshStandardMaterial color="#1E3A5F" roughness={0.8} />
      </mesh>

      {/* 右腳 - 深棕色鞋子 */}
      <mesh position={[0.09, -0.42, 0.08]} castShadow>
        <boxGeometry args={[0.08, 0.05, 0.12]} />
        <meshStandardMaterial color="#3E2723" roughness={0.6} />
      </mesh>

      {/* === 配件：拐杖（老人特徵） === */}

      {/* 拐杖主體 */}
      <mesh position={[0.28, 0.15, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 0.7, 12]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* 拐杖握把 */}
      <mesh position={[0.35, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.025, 0.1, 8, 16]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* 拐杖底部橡膠墊 */}
      <mesh position={[0.18, -0.15, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial color="#2C2C2C" roughness={0.9} />
      </mesh>

      {/* === 名稱標籤 === */}

      {/* 標籤背景 */}
      <mesh position={[0, 1.15, 0]}>
        <planeGeometry args={[0.6, 0.18]} />
        <meshBasicMaterial color="#EF4444" opacity={0.95} transparent />
      </mesh>

      {/* 名稱文字 - only render on client */}
      {mounted && (
        <Text
          position={[0, 1.15, 0.01]}
          fontSize={0.08}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      )}

      {/* === 狀態指示燈 === */}

      {/* 高風險指示燈（頭頂） */}
      <mesh position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#EF4444"
          emissive="#EF4444"
          emissiveIntensity={isMoving ? 2.0 : 0.8}
        />
      </mesh>

      {/* 警報脈沖環 */}
      {isMoving && (
        <mesh position={[0, 1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.08, 0.12, 32]} />
          <meshBasicMaterial
            color="#EF4444"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* 狀態文字 - only render on client */}
      {mounted && (
        <Text
          position={[0, 1.3, 0]}
          fontSize={0.05}
          color={isMoving ? "#EF4444" : "#10B981"}
          anchorX="center"
          anchorY="middle"
        >
          {isMoving ? "⚠️ 高風險" : "✓ 正常"}
        </Text>
      )}
    </group>
  );
}
