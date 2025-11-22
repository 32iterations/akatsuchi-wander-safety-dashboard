"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { ZoneLabel } from "./ZoneLabel";
import { HighRiskMarker } from "./HighRiskMarker";

function FloorPlan() {
  return (
    <group>
      {/* Base plate - darker for better contrast */}
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 6]} />
        <meshStandardMaterial color="#020617" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Zone A: Memory Lane / Daycare Area (Left) - Cyan wireframe */}
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[3, 1, 5]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          opacity={0.7}
          transparent
        />
      </mesh>

      {/* Zone B: Activity Hall (Right) - Green wireframe */}
      <mesh position={[2.5, 0, 0]}>
        <boxGeometry args={[3, 1, 5]} />
        <meshStandardMaterial
          color="#22c55e"
          wireframe
          opacity={0.7}
          transparent
        />
      </mesh>

      {/* Central corridor - subtle glow */}
      <mesh position={[0, -0.49, 0]} receiveShadow>
        <boxGeometry args={[9.8, 0.02, 1]} />
        <meshStandardMaterial
          color="#1e293b"
          emissive="#0f172a"
          emissiveIntensity={0.2}
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

function ResidentPath() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.2) % 1; // loop 0-1
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.5, -0.3, -2.0),
      new THREE.Vector3(-1.0, -0.3, 0.0),
      new THREE.Vector3(0.0, -0.3, 0.5),
      new THREE.Vector3(2.0, -0.3, 1.0),
      new THREE.Vector3(3.0, -0.3, 2.0)
    ]);
    const p = path.getPoint(t);
    meshRef.current.position.copy(p);
  });

  return (
    <mesh ref={meshRef} castShadow>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.9} />
    </mesh>
  );
}

export function DigitalTwinCanvas() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/90">
      <Canvas
        camera={{ position: [8, 7, 8], fov: 40 }}
        shadows
        dpr={[1, 2]}
      >
        <color attach="background" args={["#020617"]} />

        {/* Enhanced lighting for better depth perception */}
        <ambientLight intensity={0.4} />

        {/* Key light - main directional light with shadows */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.5}
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
          intensity={0.4}
          color="#60a5fa"
        />

        {/* Rim light - highlights edges */}
        <pointLight position={[0, 6, 0]} intensity={0.6} color="#f97316" />

        {/* Subtle ground fog effect via hemisphere light */}
        <hemisphereLight
          args={["#1e293b", "#0f172a", 0.3]}
          position={[0, 1, 0]}
        />

        <FloorPlan />
        <ResidentPath />
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
