"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.8, 100, 200]} scale={1}>
        <MeshDistortMaterial
          color="#00ff88"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
          opacity={0.15}
          transparent
        />
      </Sphere>
      <Sphere args={[1.85, 60, 60]} scale={1}>
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.06}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const count = 2000;
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3} args={[]}        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ff88"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function FloatingRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = state.clock.elapsedTime * 0.05;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <group ref={group}>
      {[2.5, 3.2, 4.0].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.5]}>
          <torusGeometry args={[r, 0.008, 16, 200]} />
          <meshBasicMaterial
            color={i === 0 ? "#00ff88" : i === 1 ? "#0088ff" : "#ffffff"}
            transparent
            opacity={0.2 - i * 0.04}
          />
        </mesh>
      ))}
    </group>
  );
}

function GlowLight() {
  const light = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!light.current) return;
    light.current.position.x = Math.sin(state.clock.elapsedTime) * 3;
    light.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 2;
  });
  return (
    <pointLight ref={light} color="#00ff88" intensity={2} distance={8} decay={2} />
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.2} />
      <GlowLight />
      <pointLight position={[-5, 5, 5]} color="#0088ff" intensity={1} />
      <Stars radius={60} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <ParticleField />
      <AnimatedSphere />
      <FloatingRings />
    </Canvas>
  );
}
