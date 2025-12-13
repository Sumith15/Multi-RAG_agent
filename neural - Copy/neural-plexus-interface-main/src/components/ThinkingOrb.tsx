import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InnerOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.7;
      ref.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="#00f3ff" wireframe />
    </mesh>
  );
}

function OuterCage() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -state.clock.getElapsedTime() * 0.3;
      ref.current.rotation.z = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 0]} />
      <meshBasicMaterial color="#8b5cf6" wireframe opacity={0.6} transparent />
    </mesh>
  );
}

export default function ThinkingOrb() {
  return (
    <div className="w-32 h-32 mx-auto my-4">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <InnerOrb />
        <OuterCage />
      </Canvas>
    </div>
  );
}
