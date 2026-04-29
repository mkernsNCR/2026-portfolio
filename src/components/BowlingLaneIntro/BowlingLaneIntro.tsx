import { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

// --- Three.js scene components ---

function Lane() {
  return (
    <group>
      {/* Lane floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[3.6, 20]} />
        <meshStandardMaterial color="#C8922A" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Lane lines */}
      {[-0.5, 0.5].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
          <planeGeometry args={[0.04, 20]} />
          <meshStandardMaterial color="#8B6020" />
        </mesh>
      ))}
      {/* Arrow guides */}
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, 4]}>
          <coneGeometry args={[0.06, 0.18, 4]} />
          <meshStandardMaterial color="#CC2222" />
        </mesh>
      ))}
    </group>
  )
}

function BowlingPin({ position, fallen, delay }: {
  position: [number, number, number]
  fallen: boolean
  delay: number
}) {
  const meshRef = useRef<THREE.Group>(null)
  const targetRotation = useRef(0)
  const currentRotation = useRef(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (fallen && !hasAnimated) {
      const timeoutId = setTimeout(() => {
        targetRotation.current = Math.PI / 2 + (Math.random() * 0.4 - 0.2)
        setHasAnimated(true)
      }, delay)
      return () => clearTimeout(timeoutId)
    }
  }, [fallen, delay, hasAnimated])

  useFrame((_s, delta) => {
    if (!meshRef.current) return
    if (currentRotation.current < targetRotation.current) {
      currentRotation.current = Math.min(
        currentRotation.current + delta * 5,
        targetRotation.current
      )
      meshRef.current.rotation.z = currentRotation.current
      meshRef.current.position.y = position[1] - Math.sin(currentRotation.current) * 0.3
    }
  })

  return (
    <group ref={meshRef} position={position}>
      {/* Pin body */}
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.6, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.3} />
      </mesh>
      {/* Pin neck */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.12, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.3} />
      </mesh>
      {/* Pin head */}
      <mesh position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.3} />
      </mesh>
      {/* Red stripe */}
      <mesh position={[0, 0.72, 0]}>
        <torusGeometry args={[0.09, 0.015, 8, 24]} />
        <meshStandardMaterial color="#CC2222" />
      </mesh>
    </group>
  )
}

function RollingBall({ rolling, onReachPins }: { rolling: boolean; onReachPins: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const zPos = useRef(10)
  const hasTriggered = useRef(false)
  const rotX = useRef(0)

  useFrame((_s, delta) => {
    if (!meshRef.current || !rolling) return
    if (zPos.current > -6) {
      zPos.current -= delta * 12
      rotX.current += delta * 8
      meshRef.current.position.z = zPos.current
      meshRef.current.rotation.x = rotX.current

      if (zPos.current < -3 && !hasTriggered.current) {
        hasTriggered.current = true
        onReachPins()
      }
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0.18, rolling ? zPos.current : 10]} castShadow>
      <sphereGeometry args={[0.18, 24, 24]} />
      <meshStandardMaterial color="#1B6FD6" roughness={0.2} metalness={0.1} />
    </mesh>
  )
}

function IntroCamera({ animating }: { animating: boolean }) {
  const { camera } = useThree()
  const progress = useRef(0)

  useEffect(() => {
    camera.position.set(0, 1.2, 12)
    camera.lookAt(0, 0.4, -8)
  }, [camera])

  useFrame((_s, delta) => {
    if (!animating) return
    progress.current = Math.min(progress.current + delta * 0.3, 1)
    const t = progress.current
    camera.position.z = THREE.MathUtils.lerp(12, 6, t)
    camera.position.y = THREE.MathUtils.lerp(1.2, 0.9, t)
    camera.lookAt(0, 0.4, -8)
  })

  return null
}

// --- Pin positions (triangle formation) ---
const PIN_POSITIONS: [number, number, number][] = [
  // Row 4 (back)
  [-0.405, 0, -6.6], [-0.135, 0, -6.6], [0.135, 0, -6.6], [0.405, 0, -6.6],
  // Row 3
  [-0.27, 0, -6.3], [0, 0, -6.3], [0.27, 0, -6.3],
  // Row 2
  [-0.135, 0, -6.0], [0.135, 0, -6.0],
  // Row 1 (front)
  [0, 0, -5.7],
]

// --- Main component ---

interface BowlingLaneIntroProps {
  onComplete: () => void
}

export default function BowlingLaneIntro({ onComplete }: BowlingLaneIntroProps) {
  const [phase, setPhase] = useState<'idle' | 'rolling' | 'strike' | 'fading'>('idle')
  const [pinsDown, setPinsDown] = useState(false)
  const [visible, setVisible] = useState(true)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const pinDelays = useMemo(
    () => PIN_POSITIONS.map((_, i) => i * 80 + Math.floor(Math.random() * 100)),
    []
  )

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('rolling'), 800)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    return () => {
      for (const id of timeoutsRef.current) clearTimeout(id)
    }
  }, [])

  const handlePinsHit = () => {
    setPinsDown(true)
    const t1 = setTimeout(() => setPhase('strike'), 500)
    const t2 = setTimeout(() => setPhase('fading'), 2200)
    const t3 = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 3200)
    timeoutsRef.current = [t1, t2, t3]
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          {/* Three.js canvas */}
          <Canvas
            shadows
            camera={{ position: [0, 1.2, 12], fov: 60 }}
            style={{ width: '100%', height: '100%' }}
            aria-label="Bowling lane intro animation"
          >
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[0, 8, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[0, 3, -4]} intensity={1} color="#FFFDE7" />

            <IntroCamera animating={phase === 'rolling' || phase === 'strike'} />
            <Lane />

            {PIN_POSITIONS.map((pos, i) => (
              <BowlingPin
                key={i}
                position={pos}
                fallen={pinsDown}
                delay={pinDelays[i]}
              />
            ))}

            <RollingBall
              rolling={phase === 'rolling' || phase === 'strike'}
              onReachPins={handlePinsHit}
            />

            {/* Fog for depth */}
            <fog attach="fog" args={['#000000', 8, 25]} />
          </Canvas>

          {/* STRIKE overlay */}
          <AnimatePresence>
            {phase === 'strike' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="text-center">
                  <div
                    className="text-8xl sm:text-9xl font-black text-yellow-400 drop-shadow-lg"
                    style={{
                      fontFamily: 'Impact, Arial Black, sans-serif',
                      WebkitTextStroke: '3px #FF6600',
                      textShadow: '0 0 40px #FF6600, 0 4px 0 #CC4400',
                    }}
                  >
                    STRIKE!
                  </div>
                  <motion.div
                    className="text-white text-2xl font-bold mt-4 font-wii"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Welcome to Matt's Portfolio
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip button */}
          <button
            type="button"
            className="absolute bottom-6 right-6 text-white/50 hover:text-white/90 text-sm font-wii transition-colors px-4 py-2 rounded-full border border-white/20 hover:border-white/50"
            onClick={() => {
              for (const id of timeoutsRef.current) clearTimeout(id)
              setVisible(false)
              onComplete()
            }}
            aria-label="Skip intro animation"
          >
            Skip intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
