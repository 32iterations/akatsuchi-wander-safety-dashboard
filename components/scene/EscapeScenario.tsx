"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ElderlyAvatar } from "./ElderlyAvatar";
import { NurseAvatar } from "./NurseAvatar";
import { RadarDetection } from "./RadarDetection";
import * as THREE from "three";

interface EscapeScenarioProps {
  autoPlay?: boolean;
  onScenarioEnd?: () => void;
}

/**
 * 完整的逃脫場景動畫
 * 演示：老人走向出口 → 雷達偵測 → 警報 → 護理師趕來
 */
export function EscapeScenario({
  autoPlay = true,
  onScenarioEnd
}: EscapeScenarioProps) {
  const [elderlyPos, setElderlyPos] = useState<[number, number, number]>([-3, 0, -1]);
  const [nursePos, setNursePos] = useState<[number, number, number]>([3, 0, -2]);
  const [isAlerted, setIsAlerted] = useState(false);
  const [scenarioPhase, setScenarioPhase] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [ringLevel, setRingLevel] = useState(0); // 0: 安全, 1: 第三層, 2: 第二層, 3: 第一層

  const exitPosition: [number, number, number] = [4.5, 0, 2];

  // 計算距離
  const getDistance = (pos: [number, number, number]) => {
    return Math.sqrt(
      Math.pow(pos[0] - exitPosition[0], 2) +
      Math.pow(pos[2] - exitPosition[2], 2)
    );
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timeline = [
      // Phase 0: 初始狀態 (0-2s)
      { delay: 0, action: () => setScenarioPhase(0) },

      // Phase 1: 老人開始移動 (2-5s)
      {
        delay: 2000,
        action: () => {
          setScenarioPhase(1);
          animateElderlyMovement();
        }
      },

      // Phase 2: 雷達偵測到接近 (5-7s)
      {
        delay: 5000,
        action: () => {
          setScenarioPhase(2);
          setIsAlerted(true);
        }
      },

      // Phase 3: 護理師收到警報並移動 (7-12s)
      {
        delay: 7000,
        action: () => {
          setScenarioPhase(3);
          animateNurseMovement();
        }
      },

      // Phase 4: 護理師到達，危機解除 (12-15s)
      {
        delay: 12000,
        action: () => {
          setScenarioPhase(4);
          setIsAlerted(false);
        }
      },

      // Phase 5: 重置場景 (15s)
      {
        delay: 15000,
        action: () => {
          resetScenario();
          if (onScenarioEnd) onScenarioEnd();
        }
      }
    ];

    const timers = timeline.map((event) =>
      setTimeout(event.action, event.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [autoPlay]);

  const animateElderlyMovement = () => {
    const startPos = elderlyPos;
    const endPos: [number, number, number] = [3.5, 0, 1.5]; // 接近出口
    let progress = 0;
    let hasTriggeredRing3 = false;
    let hasTriggeredRing2 = false;

    const interval = setInterval(() => {
      progress += 0.015; // 稍微慢一點，讓觀眾看清楚
      if (progress >= 1) {
        clearInterval(interval);
        setElderlyPos(endPos);
      } else {
        const newPos: [number, number, number] = [
          startPos[0] + (endPos[0] - startPos[0]) * progress,
          startPos[1],
          startPos[2] + (endPos[2] - startPos[2]) * progress
        ];
        setElderlyPos(newPos);

        const distance = getDistance(newPos);

        // 第三層（最外圈）- 2.0m 觸發預警
        if (distance < 2.0 && !hasTriggeredRing3) {
          hasTriggeredRing3 = true;
          setRingLevel(1);
          setShowNotification(true);
          setNotificationMessage("⚠️ 預警：王奶奶進入出口 2 公尺範圍");
          setTimeout(() => setShowNotification(false), 3000);
        }

        // 第二層（中圈）- 1.3m 觸發警戒，護理師移動
        if (distance < 1.3 && !hasTriggeredRing2) {
          hasTriggeredRing2 = true;
          setRingLevel(2);
          setIsAlerted(true);
          setShowNotification(true);
          setNotificationMessage("🚨 警戒：進入警戒區！護理師立即出動");
          setTimeout(() => setShowNotification(false), 3000);
          // 延遲 500ms 後護理師開始移動
          setTimeout(() => {
            setScenarioPhase(3);
            animateNurseMovement();
          }, 500);
        }

        // 第一層（內圈）- 0.7m 高度危險
        if (distance < 0.7) {
          setRingLevel(3);
        }
      }
    }, 50);
  };

  const animateNurseMovement = () => {
    const startPos = nursePos;
    const endPos: [number, number, number] = [2.5, 0, 1]; // 攔截位置
    let progress = 0;

    const interval = setInterval(() => {
      progress += 0.015;
      if (progress >= 1) {
        clearInterval(interval);
        setNursePos(endPos);
      } else {
        setNursePos([
          startPos[0] + (endPos[0] - startPos[0]) * progress,
          startPos[1],
          startPos[2] + (endPos[2] - startPos[2]) * progress
        ]);
      }
    }, 50);
  };

  const resetScenario = () => {
    setElderlyPos([-3, 0, -1]);
    setNursePos([3, 0, -2]);
    setIsAlerted(false);
    setScenarioPhase(0);
  };

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 8, 8], fov: 50 }}
        shadows
        dpr={[1, 2]}
      >
        {/* Light background */}
        <color attach="background" args={["#F8FAFC"]} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-3, 5, -3]} intensity={0.5} color="#94A3B8" />
        <hemisphereLight args={["#FFFFFF", "#E2E8F0", 0.5]} />

        {/* Floor */}
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[12, 8]} />
          <meshStandardMaterial color="#E2E8F0" />
        </mesh>

        {/* 出口門 */}
        <mesh position={exitPosition} castShadow>
          <boxGeometry args={[0.2, 2, 1.5]} />
          <meshStandardMaterial color="#DC2626" emissive="#DC2626" emissiveIntensity={0.3} />
        </mesh>

        {/* 出口標示 */}
        <mesh position={[exitPosition[0], exitPosition[1] + 1.2, exitPosition[2]]}>
          <boxGeometry args={[0.8, 0.3, 0.05]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>

        {/* 區域標線 */}
        <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 6]} />
          <meshBasicMaterial color="#CBD5E1" opacity={0.3} transparent wireframe />
        </mesh>

        {/* 毫米波雷達同心圓 */}
        <RadarDetection
          exitPosition={exitPosition}
          targetPosition={elderlyPos}
          isActive={scenarioPhase >= 1}
        />

        {/* 失智症老人 */}
        <ElderlyAvatar
          position={elderlyPos}
          isMoving={scenarioPhase >= 1 && scenarioPhase < 4}
        />

        {/* 護理師 */}
        <NurseAvatar
          position={nursePos}
          isAlerted={isAlerted}
          targetPosition={scenarioPhase >= 3 ? elderlyPos : undefined}
        />

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          minDistance={6}
          maxDistance={16}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>

      {/* 三層同心圓警報通知彈窗 */}
      {showNotification && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className={`rounded-2xl p-8 shadow-2xl border-4 backdrop-blur-md ${
            ringLevel === 1 ? 'bg-warning-50/95 border-warning-500' :
            ringLevel === 2 ? 'bg-danger-50/95 border-danger-500' :
            'bg-danger-100/95 border-danger-600'
          }`}>
            <div className="flex items-center gap-6">
              <div className={`flex h-20 w-20 items-center justify-center rounded-full ${
                ringLevel === 1 ? 'bg-warning-500' :
                ringLevel === 2 ? 'bg-danger-500' :
                'bg-danger-600'
              } animate-pulse`}>
                <span className="text-5xl">
                  {ringLevel === 1 ? '⚠️' : '🚨'}
                </span>
              </div>
              <div>
                <h3 className={`text-3xl font-black ${
                  ringLevel === 1 ? 'text-warning-900' :
                  ringLevel === 2 ? 'text-danger-900' :
                  'text-danger-950'
                }`}>
                  {ringLevel === 1 && '第三層預警'}
                  {ringLevel === 2 && '第二層警戒'}
                  {ringLevel === 3 && '第一層危險'}
                </h3>
                <p className="mt-2 text-xl font-bold text-neutral-800">
                  {notificationMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 場景說明文字 - 加大字體以提高可讀性 */}
      <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 backdrop-blur-sm p-6 shadow-large border-2 border-neutral-300">
        <div className="flex items-start gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-full ${
            scenarioPhase >= 2 ? 'bg-danger-100 animate-pulse' : 'bg-neutral-100'
          }`}>
            <span className="text-2xl font-black">{scenarioPhase + 1}</span>
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="text-xl font-bold text-neutral-900 leading-tight">
              {scenarioPhase === 0 && "準備中 - 三層超聲波雷達系統啟動"}
              {scenarioPhase === 1 && "⚠️ 階段一：王奶奶開始走向出口"}
              {scenarioPhase === 2 && "🚨 階段二：觸發第三層預警（2.0m）"}
              {scenarioPhase === 3 && "📞 階段三：觸發第二層警戒（1.3m），護理師出動"}
              {scenarioPhase === 4 && "✅ 危機解除 - 護理師成功攔截"}
            </h4>
            <p className="text-base font-medium text-neutral-700 leading-relaxed">
              {scenarioPhase === 0 && "三層同心圓雷達：外圈 2.0m（預警）、中圈 1.3m（警戒）、內圈 0.7m（危險）"}
              {scenarioPhase === 1 && "系統開始追蹤移動軌跡，準備觸發三層預警機制"}
              {scenarioPhase === 2 && "進入第三層（最外圈）！系統發送預警通知"}
              {scenarioPhase === 3 && "進入第二層（中圈）！護理師收到警報，立即前往攔截"}
              {scenarioPhase === 4 && "護理師在第一層（內圈）前成功介入，引導長輩返回安全區"}
            </p>
          </div>
          {scenarioPhase >= 2 && scenarioPhase < 4 && (
            <div className="flex items-center gap-2 rounded-lg bg-danger-50 px-4 py-3">
              <div className="h-4 w-4 rounded-full bg-danger-500 animate-pulse" />
              <span className="text-base font-bold text-danger-700">警報中</span>
            </div>
          )}
        </div>
      </div>

      {/* 距離顯示 - 加大字體 */}
      <div className="absolute top-6 right-6 rounded-xl bg-white/95 backdrop-blur-sm p-5 shadow-large border-2 border-neutral-300">
        <div className="text-center">
          <p className="text-base font-semibold text-neutral-700">距離出口</p>
          <p className={`mt-2 text-4xl font-black ${
            Math.sqrt(
              Math.pow(elderlyPos[0] - exitPosition[0], 2) +
              Math.pow(elderlyPos[2] - exitPosition[2], 2)
            ) < 2 ? 'text-danger-600' : 'text-neutral-900'
          }`}>
            {Math.sqrt(
              Math.pow(elderlyPos[0] - exitPosition[0], 2) +
              Math.pow(elderlyPos[2] - exitPosition[2], 2)
            ).toFixed(1)} <span className="text-lg font-bold text-neutral-700">公尺</span>
          </p>
        </div>
      </div>
    </div>
  );
}
