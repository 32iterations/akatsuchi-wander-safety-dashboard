"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { ZoneLabel } from "./ZoneLabel";
import { HighRiskMarker } from "./HighRiskMarker";
import { ElderlyAvatar } from "./ElderlyAvatar";
import { NurseAvatar } from "./NurseAvatar";

function FloorPlan() {
  return (
    <group>
      {/* Base plate - 極淺的白色地板（亮色系） */}
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 6]} />
        <meshStandardMaterial color="#F8FAFC" metalness={0.05} roughness={0.4} />
      </mesh>

      {/* Zone A: 日照空間（左） - 亮橘色半透明填充 */}
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[3, 1, 5]} />
        <meshStandardMaterial
          color="#FB923C"
          opacity={0.25}
          transparent
        />
      </mesh>
      {/* Zone A 邊框 - 深橘色線框 */}
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[3, 1, 5]} />
        <meshBasicMaterial
          color="#EA580C"
          wireframe
        />
      </mesh>

      {/* Zone B: 活動大廳（右） - 亮綠色半透明填充 */}
      <mesh position={[2.5, 0, 0]}>
        <boxGeometry args={[3, 1, 5]} />
        <meshStandardMaterial
          color="#34D399"
          opacity={0.25}
          transparent
        />
      </mesh>
      {/* Zone B 邊框 - 深綠色線框 */}
      <mesh position={[2.5, 0, 0]}>
        <boxGeometry args={[3, 1, 5]} />
        <meshBasicMaterial
          color="#059669"
          wireframe
        />
      </mesh>

      {/* 中央走廊 - 淺藍色帶光暈 */}
      <mesh position={[0, -0.49, 0]} receiveShadow>
        <boxGeometry args={[9.8, 0.02, 1]} />
        <meshStandardMaterial
          color="#DBEAFE"
          emissive="#60A5FA"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Zone labels */}
      <ZoneLabel
        position={[-2.5, 1.3, 0]}
        text="A 區：日照空間"
        riskLevel="medium"
      />
      <ZoneLabel
        position={[2.5, 1.3, 0]}
        text="B 區：活動大廳"
        riskLevel="low"
      />
      <ZoneLabel
        position={[0, 1.3, 0]}
        text="中央走廊"
      />

      {/* High-risk markers */}
      <HighRiskMarker position={[4.5, 0, 2]} type="exit" />
      <HighRiskMarker position={[-4.5, 0, -2]} type="exit" />
      <HighRiskMarker position={[0, 0, -2.5]} type="nursing_station" />
    </group>
  );
}

function AnimatedSceneContent() {
  const elderlyPosRef = useRef<[number, number, number]>([-3, 0, -1]);
  const elderlyGroupRef = useRef<THREE.Group | null>(null);
  const nursePos: [number, number, number] = [3, 0, -2];

  useFrame(({ clock }) => {
    // 老人沿著路徑緩慢移動
    const t = (clock.getElapsedTime() * 0.15) % 1;
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, 0, -2.0),
      new THREE.Vector3(-1.5, 0, -0.5),
      new THREE.Vector3(0.5, 0, 0.5),
      new THREE.Vector3(2.5, 0, 1.5),
      new THREE.Vector3(4.0, 0, 2.0) // 朝出口方向
    ]);
    const p = path.getPoint(t);
    elderlyPosRef.current = [p.x, 0, p.z];
  });

  return (
    <>
      {/* 老人虛擬人物 - 高風險移動中 */}
      <ElderlyAvatar
        position={elderlyPosRef.current}
        isMoving={true}
        name="王奶奶"
      />

      {/* 護理師虛擬人物 - 待命中 */}
      <NurseAvatar
        position={nursePos}
        isAlerted={false}
        name="林護理師"
      />

      {/* 路徑軌跡線（虛線顯示老人移動路徑） */}
      <PathTrail />
    </>
  );
}

function PathTrail() {
  const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.5, 0.02, -2.0),
    new THREE.Vector3(-1.5, 0.02, -0.5),
    new THREE.Vector3(0.5, 0.02, 0.5),
    new THREE.Vector3(2.5, 0.02, 1.5),
    new THREE.Vector3(4.0, 0.02, 2.0)
  ]);

  const points = path.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
      color: "#EF4444",
      linewidth: 3,
      opacity: 0.6,
      transparent: true
    }))} />
  );
}

export function DigitalTwinCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="h-[480px] w-full overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-base font-medium text-neutral-700">載入 3D 場景中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[480px] w-full overflow-hidden rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100" suppressHydrationWarning>
      <Canvas
        key={`digital-twin-canvas-${mounted ? 'mounted' : 'loading'}`}
        camera={{ position: [8, 7, 8], fov: 40 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "default",
          preserveDrawingBuffer: false
        }}
      >
        {/* Light background for light theme */}
        <color attach="background" args={["#F8FAFC"]} />

        {/* Enhanced lighting for better depth perception in light theme */}
        <ambientLight intensity={0.6} />

        {/* Key light - main directional light with shadows */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Fill light - softer light from opposite side */}
        <directionalLight
          position={[-3, 5, -3]}
          intensity={0.5}
          color="#94A3B8"
        />

        {/* Rim light - highlights edges */}
        <pointLight position={[0, 6, 0]} intensity={0.4} color="#F97316" />

        {/* Subtle hemisphere light */}
        <hemisphereLight
          args={["#FFFFFF", "#E2E8F0", 0.5]}
          position={[0, 1, 0]}
        />

        <FloorPlan />
        <AnimatedSceneContent />
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          minDistance={6}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
