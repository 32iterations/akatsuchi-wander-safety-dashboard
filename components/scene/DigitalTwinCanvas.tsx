"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloorPlan() {
  return (
    <group>
      {/* Base plate */}
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 6]} />
        <meshStandardMaterial color="#020617" />
      </mesh>

      {/* Outlined rooms (wireframe boxes) */}
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[3, 1, 5]} />
        <meshStandardMaterial color="#38bdf8" wireframe />
      </mesh>
      <mesh position={[2.5, 0, 0]}>
        <boxGeometry args={[3, 1, 5]} />
        <meshStandardMaterial color="#22c55e" wireframe />
      </mesh>

      {/* Central corridor */}
      <mesh position={[0, -0.49, 0]} receiveShadow>
        <boxGeometry args={[9.8, 0.02, 1]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
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
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 7, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <FloorPlan />
        <ResidentPath />
        <OrbitControls
          enablePan={false}
          enableDamping
          minDistance={6}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
