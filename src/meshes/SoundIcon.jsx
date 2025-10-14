import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// Note
// Spheres overlap with pipe in each ring.
// To avoid this, set renderOrder on spheres and pipe
export function SoundIcon(props) {
  const { nodes } = useGLTF('/models/sound-icon-less-details.glb')

  const icon = useRef()
  const audioRings = useRef()
  const audioRing0 = useRef()
  const audioRing0Cylinder = useRef()
  const audioRing0Ball0 = useRef()
  const audioRing0Ball1 = useRef()
  const audioRing0CylinderMat = useRef()
  const audioRing0Ball0Mat = useRef()
  const audioRing0Ball1Mat = useRef()
  const audioRing1Cylinder = useRef()
  const audioRing1Ball0 = useRef()
  const audioRing1Ball1 = useRef()
  const audioRing1 = useRef()
  const audioRing1CylinderMat = useRef()
  const audioRing1Ball0Mat = useRef()
  const audioRing1Ball1Mat = useRef()

  const audioRingFlashSpeed = 1
  const iconBobbingSpeed = 1.8
  const audioRingPulseSpeed = 2
  const iconBobbingAngleFactor = 0.05
  const audioRingFlashOpacityFactor = 0.3
  useFrame((state, delta) => {
    if(props.animated) {
      const time = state.clock.getElapsedTime(); 
      // tilt icon up and down
      icon.current.rotation.x = Math.sin(time * iconBobbingSpeed) * iconBobbingAngleFactor + iconBobbingAngleFactor*2
      icon.current.rotation.y = Math.sin(time * iconBobbingSpeed) * 0.05

      // make the rings pulse
      audioRings.current.scale.x = 1 + Math.sin(time * audioRingPulseSpeed) * 0.05
      audioRings.current.scale.y = 1 + Math.sin(time * audioRingPulseSpeed) * 0.05
      audioRings.current.scale.z = 1 + Math.sin(time * audioRingPulseSpeed) * 0.05

      audioRing0CylinderMat.current.opacity = Math.sin(time * audioRingFlashSpeed) * audioRingFlashOpacityFactor + 0.5
      audioRing0Ball0Mat.current.opacity = Math.sin(time * audioRingFlashSpeed) * audioRingFlashOpacityFactor + 0.5
      audioRing0Ball1Mat.current.opacity = Math.sin(time * audioRingFlashSpeed) * audioRingFlashOpacityFactor + 0.5

      audioRing1CylinderMat.current.opacity = Math.sin((time - Math.PI/4) * audioRingFlashSpeed) * audioRingFlashOpacityFactor + 0.5
      audioRing1Ball0Mat.current.opacity = Math.sin((time - Math.PI/4) * audioRingFlashSpeed) * audioRingFlashOpacityFactor + 0.5
      audioRing1Ball1Mat.current.opacity = Math.sin((time - Math.PI/4) * audioRingFlashSpeed) * audioRingFlashOpacityFactor + 0.5
    } else {
      icon.current.rotation.x = Math.PI/32
      icon.current.rotation.y = -Math.PI/16
      audioRings.current.scale.x = 1
      audioRings.current.scale.y = 1
      audioRings.current.scale.z = 1
      
      audioRing0CylinderMat.current.opacity = 0
      audioRing0Ball0Mat.current.opacity = 0
      audioRing0Ball1Mat.current.opacity = 0

      audioRing1CylinderMat.current.opacity = 0
      audioRing1Ball0Mat.current.opacity = 0
      audioRing1Ball1Mat.current.opacity = 0
    }
  })

  useEffect(() => {
    if (audioRing0Cylinder.current) {
      audioRing0Cylinder.current.renderOrder = 0
    }
    if (audioRing0Ball0.current) {
      audioRing0Ball0.current.renderOrder = 1
    }
    if (audioRing0Ball1.current) {
      audioRing0Ball1.current.renderOrder = 1
    }
    if (audioRing1Cylinder.current) {
      audioRing0Cylinder.current.renderOrder = 0
    }
    if (audioRing1Ball0.current) {
      audioRing1Ball0.current.renderOrder = 1
    }
    if (audioRing1Ball1.current) {
      audioRing1Ball1.current.renderOrder = 1
    }
  }, [])

  return (
    <group {...props} dispose={null}>
      <group name='animation-wrapper' ref={icon}>
        <mesh
          name='megaphone-base'
          castShadow
          receiveShadow
          geometry={nodes.Cylinder003.geometry}
          material={nodes.Cylinder003.material}
          position={[0, 0, 0.264]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1, 1.007, 1]}
        >
          <meshStandardMaterial color={props.colorMegaphone}/>
        </mesh>
        <mesh
          name='megaphone-cylinder'
          castShadow
          receiveShadow
          geometry={nodes.Cone003.geometry}
          material={nodes.Cone003.material}
          position={[0, 0, -0.264]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.722, 1.549, 1.722]}
        >
          <meshStandardMaterial color={props.colorMegaphone}/>
        </mesh>
        <group name='audio-rings' ref={audioRings}>
          <group name='audio-ring-0' ref={audioRing0}>
            <mesh
              name='audio-ring-0-cylinder'
              castShadow
              receiveShadow
              geometry={nodes['ring-0'].geometry}
              material={nodes['ring-0'].material}
              position={[0, -0.048, -2.941]}
              rotation={[0.409, 0, 0]}
              ref={audioRing0Cylinder}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing0CylinderMat}/>
            </mesh>
            <mesh
              name='audio-ring-0-ball-0'
              castShadow
              receiveShadow
              geometry={nodes['ring-0-ball-0'].geometry}
              material={nodes['ring-0-ball-0'].material}
              position={[0, -0.048, -2.941]}
              rotation={[0.409, 0, 0]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing0Ball0}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing0Ball0Mat}/>
            </mesh>
            <mesh
              name='audio-ring-0-ball-1'
              castShadow
              receiveShadow
              geometry={nodes['ring-0-ball-1'].geometry}
              material={nodes['ring-0-ball-1'].material}
              rotation={[0.409, 0, 0]}
              position={[0, -0.048, -2.941]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing0Ball1}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing0Ball1Mat}/>
            </mesh>
          </group>
          <group name='audio-ring-1' ref={audioRing1} rotation={[0, 0, 0]}>
            <mesh
              name='audio-ring-1-cylinder'
              castShadow
              receiveShadow
              geometry={nodes['ring-1'].geometry}
              material={nodes['ring-1'].material}
              position={[0, 0, -3.204]}
              rotation={[0.36, 0, 0]}
              ref={audioRing1Cylinder}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing1CylinderMat}/>
            </mesh>
            <mesh
              name='audio-ring-1-ball-0'
              castShadow
              receiveShadow
              geometry={nodes['ring-1-ball-0'].geometry}
              material={nodes['ring-1-ball-0'].material}
              position={[0, 0, -3.204]}
              rotation={[0.36, 0, 0]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing1Ball0}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing1Ball0Mat}/>
            </mesh>
            <mesh
              name='audio-ring-1-ball-1'
              castShadow
              receiveShadow
              geometry={nodes['ring-1-ball-1'].geometry}
              material={nodes['ring-1-ball-1'].material}
              position={[0, 0, -3.204]}
              rotation={[0.36, 0, 0]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing1Ball1}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing1Ball1Mat}/>
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}
