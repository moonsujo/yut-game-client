import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// Note
// Spheres overlap with pipe in each ring.
// To avoid this, set renderOrder on spheres and pipe
export function SoundIcon(props) {
  const { nodes } = useGLTF('/models/sound-icon.glb')

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
  const audioRing2Cylinder = useRef()
  const audioRing2Ball0 = useRef()
  const audioRing2Ball1 = useRef()
  const audioRing2 = useRef()
  const audioRing2CylinderMat = useRef()
  const audioRing2Ball0Mat = useRef()
  const audioRing2Ball1Mat = useRef()

  useFrame((state, delta) => {
    if(props.animated) {
      const time = state.clock.getElapsedTime(); 
      // tilt icon up and down
      icon.current.rotation.x = Math.sin(time * 3) * 0.1 + 0.2
      icon.current.rotation.y = Math.sin(time * 3) * 0.05

      // make the rings pulse
      audioRings.current.scale.x = 1 + Math.sin(time * 3) * 0.05
      audioRings.current.scale.y = 1 + Math.sin(time * 3) * 0.05
      audioRings.current.scale.z = 1 + Math.sin(time * 3) * 0.05

      audioRing0CylinderMat.current.opacity = Math.sin(time * 2) * 0.5 + 0.5
      audioRing0Ball0Mat.current.opacity = Math.sin(time * 2) * 0.5 + 0.5
      audioRing0Ball1Mat.current.opacity = Math.sin(time * 2) * 0.5 + 0.5

      audioRing1CylinderMat.current.opacity = Math.sin((time - Math.PI/4) * 2) * 0.5 + 0.5
      audioRing1Ball0Mat.current.opacity = Math.sin((time - Math.PI/4) * 2) * 0.5 + 0.5
      audioRing1Ball1Mat.current.opacity = Math.sin((time - Math.PI/4) * 2) * 0.5 + 0.5
      
      audioRing2CylinderMat.current.opacity = Math.sin((time - Math.PI/4 * 2) * 2) * 0.5 + 0.5
      audioRing2Ball0Mat.current.opacity = Math.sin((time - Math.PI/4 * 2) * 2) * 0.5 + 0.5
      audioRing2Ball1Mat.current.opacity = Math.sin((time - Math.PI/4 * 2) * 2) * 0.5 + 0.5

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
      
      audioRing2CylinderMat.current.opacity = 0
      audioRing2Ball0Mat.current.opacity = 0
      audioRing2Ball1Mat.current.opacity = 0
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
    if (audioRing2Cylinder.current) {
      audioRing2Cylinder.current.renderOrder = 0
    }
    if (audioRing2Ball0.current) {
      audioRing2Ball0.current.renderOrder = 1
    }
    if (audioRing2Ball1.current) {
      audioRing2Ball1.current.renderOrder = 1
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
              geometry={nodes.Torus019.geometry}
              material={nodes.Torus019.material}
              position={[0, 0.033, -2.698]}
              rotation={[2.052, 0, -Math.PI / 2]}
              ref={audioRing0Cylinder}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing0CylinderMat}/>
            </mesh>
            <mesh
              name='audio-ring-0-ball-0'
              castShadow
              receiveShadow
              geometry={nodes.Sphere.geometry}
              material={nodes.Sphere.material}
              position={[0, 0.596, -2.905]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing0Ball0}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing0Ball0Mat}/>
            </mesh>
            <mesh
              name='audio-ring-0-ball-1'
              castShadow
              receiveShadow
              geometry={nodes.Sphere001.geometry}
              material={nodes.Sphere001.material}
              position={[0, -0.499, -2.976]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing0Ball1}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing0Ball1Mat}/>
            </mesh>
          </group>
          <group name='audio-ring-1' ref={audioRing1}>
            <mesh
              name='audio-ring-1-cylinder'
              castShadow
              receiveShadow
              geometry={nodes.Torus020.geometry}
              material={nodes.Torus020.material}
              position={[0, 0.05, -3.304]}
              rotation={[2.077, 0, -Math.PI / 2]}
              ref={audioRing1Cylinder}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing1CylinderMat}/>
            </mesh>
            <mesh
              name='audio-ring-1-ball-0'
              castShadow
              receiveShadow
              geometry={nodes.Sphere002.geometry}
              material={nodes.Sphere002.material}
              position={[0, 1.416, -3.924]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing1Ball0}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing1Ball0Mat}/>
            </mesh>
            <mesh
              name='audio-ring-1-ball-1'
              castShadow
              receiveShadow
              geometry={nodes.Sphere003.geometry}
              material={nodes.Sphere003.material}
              position={[0, -1.261, -4.032]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing1Ball1}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing1Ball1Mat}/>
            </mesh>
          </group>
          <group name='audio-ring-2' ref={audioRing2}>
            <mesh
              name='audio-ring-2-cylinder'
              castShadow
              receiveShadow
              geometry={nodes.Torus021.geometry}
              material={nodes.Torus021.material}
              position={[0, 0.068, -3.728]}
              rotation={[1.969, 0, -Math.PI / 2]}
              ref={audioRing2Cylinder}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing2CylinderMat}/>
            </mesh>
            <mesh
              name='audio-ring-2-ball-0'
              castShadow
              receiveShadow
              geometry={nodes.Sphere004.geometry}
              material={nodes.Sphere004.material}
              position={[0, 2.367, -4.941]}
              rotation={[-0.087, 0, 0]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing2Ball0}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing2Ball0Mat}/>
            </mesh>
            <mesh
              name='audio-ring-2-ball-1'
              castShadow
              receiveShadow
              geometry={nodes.Sphere005.geometry}
              material={nodes.Sphere005.material}
              position={[0, -2.277, -4.853]}
              rotation={[-0.087, 0, 0]}
              scale={[0.99, 0.99, 0.99]}
              ref={audioRing2Ball1}
            >
              <meshStandardMaterial color={props.colorRings} transparent ref={audioRing2Ball1Mat}/>
            </mesh>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/sound-icon.glb')