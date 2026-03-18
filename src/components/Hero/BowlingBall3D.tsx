import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

function BowlingBallMesh({ isFun }: { isFun: boolean }) {
  const group = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.4
      group.current.rotation.x += delta * 0.1
    }
  })

  const ballColor = isFun ? '#1B6FD6' : '#2D3748'
  const holeColor = '#0A1628'

  return (
    <group ref={group}>
      {/* Main ball */}
      <Sphere args={[1.5, 64, 64]} castShadow>
        <meshStandardMaterial
          color={ballColor}
          roughness={0.15}
          metalness={0.1}
          envMapIntensity={1.2}
        />
      </Sphere>

      {/* Finger holes */}
      <Sphere args={[0.18, 16, 16]} position={[0.45, 0.95, 1.0]}>
        <meshStandardMaterial color={holeColor} roughness={0.9} />
      </Sphere>
      <Sphere args={[0.18, 16, 16]} position={[0.8, 0.65, 0.85]}>
        <meshStandardMaterial color={holeColor} roughness={0.9} />
      </Sphere>
      <Sphere args={[0.18, 16, 16]} position={[0.55, 0.3, 1.1]}>
        <meshStandardMaterial color={holeColor} roughness={0.9} />
      </Sphere>

      {/* Specular highlight sphere */}
      <Sphere args={[1.51, 32, 32]}>
        <MeshDistortMaterial
          color={ballColor}
          transparent
          opacity={0.15}
          distort={0.02}
          speed={2}
          roughness={0}
          metalness={0.5}
        />
      </Sphere>
    </group>
  )
}

interface BowlingBall3DProps {
  isFun: boolean
}

export default function BowlingBall3D({ isFun }: BowlingBall3DProps) {
  const descId = isFun ? 'bowling-ball-desc-fun' : 'bowling-ball-desc-business'
  return (
    <>
      <span id={descId} className="sr-only">
        {isFun
          ? 'A 3D rotating blue bowling ball with finger holes, animated in a fun bowling alley style'
          : 'A 3D rotating dark bowling ball with finger holes, presented in a professional style'}
      </span>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        aria-label="3D rotating bowling ball"
        aria-describedby={descId}
      >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 3, 2]} intensity={0.8} color={isFun ? '#33BBEE' : '#E2E8F0'} />
      <pointLight position={[3, -3, 2]} intensity={0.4} color={isFun ? '#FF8833' : '#CBD5E0'} />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <BowlingBallMesh isFun={isFun} />
      </Float>

      <Environment preset={isFun ? 'sunset' : 'studio'} />
    </Canvas>
    </>
  )
}
