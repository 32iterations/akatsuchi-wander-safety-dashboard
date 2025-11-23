"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

function Box() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#EA580C" />
    </mesh>
  );
}

export function SimpleTest3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[480px] w-full flex items-center justify-center bg-neutral-100 rounded-xl">
        <p className="text-lg font-bold text-neutral-900">載入中...</p>
      </div>
    );
  }

  return (
    <div className="h-[480px] w-full rounded-xl overflow-hidden border-2 border-neutral-300">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <color attach="background" args={["#F8FAFC"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Box />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
