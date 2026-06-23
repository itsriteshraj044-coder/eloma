import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, RoundedBox, Sparkles, Text } from '@react-three/drei';
import * as THREE from 'three';
import { COMPANIES } from '@/data/content';

/**
 * Real WebGL (three.js) coverflow for "Our Companies".
 *
 * Five lit card-meshes ride a 3D arc; the active one rolls front-and-centre and
 * glows, the rest rotate away in true perspective. Drag to spin the deck, and
 * ambient sparkles float through the depth. Text/description content lives in
 * the synced DOM panel next to this canvas — here we carry the spatial 3D.
 */

const NAVY = '#08213C';
const EMERALD = '#3CB98C';

function Panel({
  index,
  active,
  onSelect,
}: {
  index: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const company = COMPANIES[index];
  const isEmerald = index % 2 === 1;
  const accent = isEmerald ? EMERALD : '#1f4267';

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const offset = index - active;
    const dist = Math.abs(offset);
    const tx = offset * 2.6;
    const tz = -dist * 1.55;
    const try_ = THREE.MathUtils.degToRad(-offset * 28);
    const ts = Math.max(0.74, 1 - dist * 0.12);

    g.position.x = THREE.MathUtils.lerp(g.position.x, tx, 0.12);
    g.position.z = THREE.MathUtils.lerp(g.position.z, tz, 0.12);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, try_, 0.12);
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, ts, 0.12));
  });

  const isActive = index === active;

  return (
    <group ref={group}>
      <Float
        speed={isActive ? 1.6 : 0.8}
        rotationIntensity={isActive ? 0.18 : 0.08}
        floatIntensity={isActive ? 0.5 : 0.25}
      >
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <RoundedBox args={[2.3, 3, 0.16]} radius={0.16} smoothness={5} creaseAngle={0.5}>
            <meshStandardMaterial
              color={isActive ? NAVY : '#f3f7fb'}
              roughness={isActive ? 0.35 : 0.5}
              metalness={0.18}
              emissive={accent}
              emissiveIntensity={isActive ? 0.45 : 0.05}
            />
          </RoundedBox>

          {/* Accent bar across the top of the card face */}
          <mesh position={[0, 1.18, 0.09]}>
            <planeGeometry args={[1.7, 0.12]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>

          {/* Index number on the card face */}
          <Text
            position={[0, 0.15, 0.1]}
            fontSize={1.15}
            color={isActive ? accent : '#c2d2e4'}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            {company.index}
          </Text>

          {/* Company name on the card face */}
          <Text
            position={[0, -0.95, 0.1]}
            fontSize={0.2}
            color={isActive ? '#ffffff' : '#7d9abb'}
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
            textAlign="center"
            lineHeight={1.15}
          >
            {company.name}
          </Text>
        </mesh>
      </Float>
    </group>
  );
}

export default function CompaniesStage({
  active,
  onSelect,
  frameloop = 'always',
}: {
  active: number;
  onSelect: (i: number) => void;
  /** 'never' halts WebGL rendering — set while the section is scrolled off-screen. */
  frameloop?: 'always' | 'demand' | 'never';
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={frameloop}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 5, 6]} intensity={1.15} />
      <pointLight position={[-5, 2, 4]} color={EMERALD} intensity={28} distance={20} />
      <pointLight position={[5, -2, 4]} color="#6b8db3" intensity={16} distance={20} />

      <PresentationControls
        global
        snap
        cursor={false}
        polar={[-0.25, 0.25]}
        azimuth={[-0.5, 0.5]}
        config={{ mass: 1, tension: 180, friction: 26 }}
      >
        {COMPANIES.map((c, i) => (
          <Panel key={c.name} index={i} active={active} onSelect={onSelect} />
        ))}
      </PresentationControls>

      <Sparkles count={26} scale={[12, 7, 6]} size={2.4} speed={0.32} color={EMERALD} opacity={0.5} />
    </Canvas>
  );
}
