import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleData {
  position: Float32Array;
  velocity: Float32Array;
  color: Float32Array;
  size: Float32Array;
  isLine: boolean[];
  rotation: Float32Array;
  rotationSpeed: Float32Array;
}

const Particles = ({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) => {
  const count = 120;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo<ParticleData>(() => {
    const position = new Float32Array(count * 3);
    const velocity = new Float32Array(count * 3);
    const color = new Float32Array(count * 3);
    const size = new Float32Array(count);
    const isLine: boolean[] = [];
    const rotation = new Float32Array(count * 3);
    const rotationSpeed = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      position[i * 3] = (Math.random() - 0.5) * 16;
      position[i * 3 + 1] = (Math.random() - 0.5) * 10;
      position[i * 3 + 2] = -2 - Math.random() * 8;

      velocity[i * 3] = (Math.random() - 0.5) * 0.004;
      velocity[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocity[i * 3 + 2] = (Math.random() - 0.5) * 0.002;

      const isCyan = Math.random() > 0.5;
      color[i * 3] = isCyan ? 0 : 0.482;
      color[i * 3 + 1] = isCyan ? 0.898 : 0.184;
      color[i * 3 + 2] = isCyan ? 1 : 1;

      isLine.push(Math.random() > 0.6);
      size[i] = isLine[i] ? 0.06 : 0.03;

      rotation[i * 3] = Math.random() * Math.PI * 2;
      rotation[i * 3 + 1] = Math.random() * Math.PI * 2;
      rotation[i * 3 + 2] = Math.random() * Math.PI * 2;
      rotationSpeed[i * 3] = (Math.random() - 0.5) * 0.02;
      rotationSpeed[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      rotationSpeed[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { position, velocity, color, size, isLine, rotation, rotationSpeed };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const mouse = mouseRef.current;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      data.position[ix] += data.velocity[ix];
      data.position[ix + 1] += data.velocity[ix + 1];
      data.position[ix + 2] += data.velocity[ix + 2];

      // Wrap around
      if (data.position[ix] > 8) data.position[ix] = -8;
      if (data.position[ix] < -8) data.position[ix] = 8;
      if (data.position[ix + 1] > 5) data.position[ix + 1] = -5;
      if (data.position[ix + 1] < -5) data.position[ix + 1] = 5;
      if (data.position[ix + 2] > -1) data.position[ix + 2] = -10;
      if (data.position[ix + 2] < -10) data.position[ix + 2] = -1;

      // Mouse repulsion in screen space
      if (mouse) {
        const screenX = mouse.x * viewport.width * 0.5;
        const screenY = mouse.y * viewport.height * 0.5;
        const dx = data.position[ix] - screenX;
        const dy = data.position[ix + 1] - screenY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2) {
          const force = 0.003 / (dist * dist + 0.1);
          data.position[ix] += dx * force;
          data.position[ix + 1] += dy * force;
        }
      }

      data.rotation[ix] += data.rotationSpeed[ix];
      data.rotation[ix + 1] += data.rotationSpeed[ix + 1];

      const z = data.position[ix + 2];
      const depthFactor = Math.max(0.3, 1 + (z + 5) * 0.15);
      const s = data.size[i] * depthFactor;

      dummy.position.set(data.position[ix], data.position[ix + 1], data.position[ix + 2]);
      dummy.rotation.set(data.rotation[ix], data.rotation[ix + 1], data.rotation[ix + 2]);

      if (data.isLine[i]) {
        dummy.scale.set(s * 0.3, s * 3, s * 0.3);
      } else {
        dummy.scale.set(s, s, s);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const geometry = useMemo(() => new THREE.SphereGeometry(1, 6, 6), []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshBasicMaterial transparent opacity={0.35} color="#00E5FF" />
    </instancedMesh>
  );
};

const HeroParticles = ({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none" 
      style={{ 
        opacity: 0.7, 
        zIndex: 0,
        isolation: "isolate"
      }}
    >
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        dpr={[1, 1.5]}
        style={{ pointerEvents: "none" }}
      >
        <Particles mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
};

export default HeroParticles;
