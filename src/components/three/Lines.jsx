import { useRef, useMemo } from "react";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Lines() {
  const groupRef = useRef();

  // Generate curved lines (Catmull-Rom)
  const lines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      const points = [];
      for (let j = 0; j < 6; j++) {
        points.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 12,
            (Math.random() - 0.5) * 4
          )
        );
      }
      arr.push(points);
    }
    return arr;
  }, []);

  // Floating animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;

    groupRef.current.rotation.z = Math.sin(t * 0.07) * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {lines.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="black"
          lineWidth={1}
          transparent
          opacity={0.13}
          curved
        />
      ))}
    </group>
  );
}
