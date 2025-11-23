"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface NurseAvatarProps {
  position: [number, number, number];
  isAlerted?: boolean;
  targetPosition?: [number, number, number];
  name?: string;
}

/**
 * 照護人員/護理師虛擬人物 - 林護理師
 * 專業逼真的 3D avatar 設計
 */
export function NurseAvatar({
  position,
  isAlerted = false,
  targetPosition,
  name = "林護理師"
}: NurseAvatarProps) {
  const [mounted, setMounted] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);
  const alertPulse = useRef(0);
  const runCycle = useRef(0);
  const headRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // 警報脈動效果
      if (isAlerted) {
        alertPulse.current += 0.2;
      }

      // 如果有目標位置，朝目標移動並奔跑
      if (targetPosition && isAlerted) {
        const current = groupRef.current.position;
        const target = new THREE.Vector3(...targetPosition);

        // 平滑移動
        current.lerp(target, 0.025);

        // 面向目標
        const direction = new THREE.Vector3().subVectors(target, current);
        if (direction.length() > 0.1) {
          const angle = Math.atan2(direction.x, direction.z);
          groupRef.current.rotation.y = angle;

          // 奔跑動畫
          runCycle.current += 0.25;
          groupRef.current.position.y = position[1] + Math.abs(Math.sin(runCycle.current)) * 0.12;

          // 頭部微微點動
          if (headRef.current) {
            headRef.current.rotation.x = Math.sin(runCycle.current) * 0.08;
          }
        }
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* === 身體部分 === */}

      {/* 護理服上身 - 更深的綠色以提高對比 */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <capsuleGeometry args={[0.18, 0.48, 8, 16]} />
        <meshStandardMaterial color="#059669" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* 白色領子 */}
      <mesh position={[0, 0.65, 0.08]}>
        <boxGeometry args={[0.22, 0.06, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* 護理服扣子 */}
      <mesh position={[0, 0.5, 0.18]}>
        <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.4, 0.18]}>
        <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.3, 0.18]}>
        <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.5} />
      </mesh>

      {/* === 頭部 === */}

      {/* 頭部主體 - 膚色加深 */}
      <mesh ref={headRef} position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial color="#F4A460" roughness={0.5} />
      </mesh>

      {/* 頭髮（深褐色） */}
      <mesh position={[0, 0.88, 0]} castShadow>
        <sphereGeometry args={[0.145, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
        <meshStandardMaterial color="#2C1810" roughness={0.8} />
      </mesh>

      {/* 護理帽 */}
      <mesh position={[0, 0.92, -0.02]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.06, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>

      {/* 護理帽標誌 */}
      <mesh position={[0, 0.93, 0.1]}>
        <boxGeometry args={[0.04, 0.02, 0.02]} />
        <meshBasicMaterial color="#EF4444" />
      </mesh>
      <mesh position={[0, 0.93, 0.1]}>
        <boxGeometry args={[0.02, 0.04, 0.02]} />
        <meshBasicMaterial color="#EF4444" />
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
        <coneGeometry args={[0.018, 0.045, 8]} />
        <meshStandardMaterial color="#FFD4B4" />
      </mesh>

      {/* 嘴巴（專業微笑） */}
      <mesh position={[0, 0.74, 0.13]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.03, 0.008, 8, 16, Math.PI]} />
        <meshBasicMaterial color="#C84A4A" />
      </mesh>

      {/* === 手臂 === */}

      {/* 左手臂上臂 - 深綠護理服袖 */}
      <mesh position={[-0.22, 0.42, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.045, 0.24, 8, 16]} />
        <meshStandardMaterial color="#059669" roughness={0.6} />
      </mesh>

      {/* 左手臂下臂 - 膚色加深 */}
      <mesh position={[-0.28, 0.18, 0]} rotation={[0, 0, 0.2]} castShadow>
        <capsuleGeometry args={[0.04, 0.2, 8, 16]} />
        <meshStandardMaterial color="#F4A460" roughness={0.5} />
      </mesh>

      {/* 右手臂上臂 - 深綠護理服袖 */}
      <mesh position={[0.22, 0.42, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.045, 0.24, 8, 16]} />
        <meshStandardMaterial color="#059669" roughness={0.6} />
      </mesh>

      {/* 右手臂下臂（持設備姿勢） - 膚色加深 */}
      <mesh position={[0.28, 0.25, 0.08]} rotation={[-0.5, 0, -0.2]} castShadow>
        <capsuleGeometry args={[0.04, 0.2, 8, 16]} />
        <meshStandardMaterial color="#F4A460" roughness={0.5} />
      </mesh>

      {/* === 手持設備：平板電腦 === */}

      {/* 平板主體 */}
      <mesh position={[0.3, 0.35, 0.15]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.18, 0.25, 0.015]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 平板螢幕 */}
      <mesh position={[0.3, 0.35, 0.165]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[0.16, 0.23]} />
        <meshStandardMaterial color="#60A5FA" emissive="#60A5FA" emissiveIntensity={0.5} />
      </mesh>

      {/* === 腿部（白色護理褲） === */}

      {/* 左腿上部 */}
      <mesh position={[-0.09, 0.08, 0]}>
        <capsuleGeometry args={[0.055, 0.3, 8, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* 左腿下部 */}
      <mesh position={[-0.09, -0.28, 0]}>
        <capsuleGeometry args={[0.05, 0.28, 8, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* 左腳（白色護理鞋） */}
      <mesh position={[-0.09, -0.46, 0.05]}>
        <boxGeometry args={[0.09, 0.06, 0.14]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.5} />
      </mesh>

      {/* 右腿上部 */}
      <mesh position={[0.09, 0.08, 0]}>
        <capsuleGeometry args={[0.055, 0.3, 8, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* 右腿下部 */}
      <mesh position={[0.09, -0.28, 0]}>
        <capsuleGeometry args={[0.05, 0.28, 8, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* 右腳（白色護理鞋） */}
      <mesh position={[0.09, -0.46, 0.05]}>
        <boxGeometry args={[0.09, 0.06, 0.14]} />
        <meshStandardMaterial color="#F0F0F0" roughness={0.5} />
      </mesh>

      {/* === 職業標識 === */}

      {/* 名牌底板 */}
      <mesh position={[0.15, 0.58, 0.18]}>
        <boxGeometry args={[0.12, 0.06, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.3} />
      </mesh>

      {/* 醫療十字標誌（胸前） */}
      <mesh position={[0, 0.55, 0.19]}>
        <boxGeometry args={[0.06, 0.015, 0.01]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.55, 0.19]}>
        <boxGeometry args={[0.015, 0.06, 0.01]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* === 名稱標籤 === */}

      {/* 標籤背景 */}
      <mesh position={[0, 1.15, 0]}>
        <planeGeometry args={[0.7, 0.18]} />
        <meshBasicMaterial color="#10B981" opacity={0.95} transparent />
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

      {/* === 警報接收指示 === */}

      {isAlerted && (
        <>
          {/* 警報指示燈 */}
          <mesh position={[0, 1.05, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#F59E0B"
              emissiveIntensity={2.5}
            />
          </mesh>

          {/* 警報脈沖環 */}
          <mesh position={[0, 1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.08, 0.12, 32]} />
            <meshBasicMaterial
              color="#F59E0B"
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* 通知圖示（耳機） */}
          <mesh position={[-0.12, 0.85, 0]}>
            <torusGeometry args={[0.03, 0.008, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1} />
          </mesh>
          <mesh position={[0.12, 0.85, 0]}>
            <torusGeometry args={[0.03, 0.008, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1} />
          </mesh>
        </>
      )}

      {/* 狀態文字 - only render on client */}
      {mounted && (
        <Text
          position={[0, 1.3, 0]}
          fontSize={0.05}
          color={isAlerted ? "#F59E0B" : "#10B981"}
          anchorX="center"
          anchorY="middle"
        >
          {isAlerted ? "📞 收到警報" : "✓ 待命中"}
        </Text>
      )}
    </group>
  );
}
