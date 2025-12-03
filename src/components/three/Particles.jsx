import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function Particles() {
  const ref = useRef();

  const particles = useMemo(() => {
    const arr = new Float32Array(700 * 3);
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  useFrame(() => {
    ref.current.rotation.y += 0.0008;
    ref.current.rotation.x += 0.0004;
  });

  return (
    <Points ref={ref} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="black"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function Particles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2] }}
      className="absolute inset-0 -z-10 pointer-events-none"
    >
      <ParticlesPoints />
    </Canvas>
  );
}
