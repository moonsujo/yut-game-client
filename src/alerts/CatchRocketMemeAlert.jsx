import { useGLTF, Text3D } from "@react-three/drei"
import { useEffect, useRef, useState } from "react";
import Star from "../meshes/Stars/Star"
import Ufo from "../meshes/Ufo"
import Rocket from "../meshes/Rocket"
import { useFrame } from "@react-three/fiber";
import YootMesh from "../meshes/YootMesh";
import { animated, useSpring } from "@react-spring/three";
import { Alien } from "../meshes/Alien";
import UfoBossShip from "../meshes/UfoBossShip";
import { RocketNoAstronaut } from "../meshes/RocketNoAstronaut";
import { AstronautHandsUp } from "../meshes/AstronautHandsUp";

export default function CatchRocketMemeAlert({ position, rotation }) {

  const borderMesh0Ref = useRef();
  const borderMesh1Ref = useRef();
  const borderMesh2Ref = useRef();
  const borderMesh3Ref = useRef();
  const borderMesh4Ref = useRef();
  const borderMesh5Ref = useRef();
  const borderMesh6Ref = useRef();
  const borderMeshRefs = [
    borderMesh0Ref,
    borderMesh1Ref,
    borderMesh2Ref,
    borderMesh3Ref,
    borderMesh4Ref,
    borderMesh5Ref,
    borderMesh6Ref
  ]
  let [animationStartTime, setAnimationStartTime] = useState(0)

  const height = 2.4
  const width = 2.9
  useFrame((state, delta) => {
    // Meshes circle alert on the edge
    for (let i = 0; i < borderMeshRefs.length; i++) {      
      borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
      borderMeshRefs[i].current.position.y = 0.1
      borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
    }
    // Alien ref
    const newAnimationStartTime = animationStartTime - delta
    alienRef.current.rotation.y = -newAnimationStartTime - Math.PI/2 - Math.PI/3
    setAnimationStartTime(newAnimationStartTime)
  })

  function YootEmoji() {
    return <group name='yoot-emoji'>
      <YootMesh position={[0, 0, -0.15]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <YootMesh position={[0, 0, -0.05]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <YootMesh position={[0, 0, 0.05]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
      <YootMesh position={[0, 0, 0.15]} rotation={[0, Math.PI, -Math.PI/2]} scale={0.05}/>
    </group>
  }

  function handleAlertClick(e) {
    e.stopPropagation();
  }

    const alienRef = useRef()

    // alien position in circle; X and Z
    const alienPosRadius = 2
    const alienPosRadians = Math.PI * 2 / 3
    const alien0X = alienPosRadius * Math.cos(alienPosRadians * 0)
    const alien0Z = alienPosRadius * Math.sin(alienPosRadians * 0)
    const alien1X = alienPosRadius * Math.cos(alienPosRadians * 1)
    const alien1Z = alienPosRadius * Math.sin(alienPosRadians * 1)
    const alien2X = alienPosRadius * Math.cos(alienPosRadians * 2)
    const alien2Z = alienPosRadius * Math.sin(alienPosRadians * 2)
    const alienRotationConstant = -Math.PI/2

  return <animated.group position={position} rotation={rotation} onPointerDown={(e) => handleAlertClick(e)}>
    <mesh
      castShadow
      receiveShadow
      scale={[2.4, 0.055, 2.9]}
    >
      <cylinderGeometry args={[1, 1, 1, 64]}/>
      <meshStandardMaterial color='black' opacity={0.7} transparent/>
    </mesh>
    <group rotation={[0, 0, -Math.PI/3]} position={[1.2, 1, 0]}>
    <group name='scene' ref={alienRef} scale={0.7}>
        <Alien position={[alien0X, 0, alien0Z]} rotation={[0, alienRotationConstant - alienPosRadians * 0, 0]}/>
        <Alien position={[alien1X, 0, alien1Z]} rotation={[0, alienRotationConstant - alienPosRadians * 1, 0]}/>
        <Alien position={[alien2X, 0, alien2Z]} rotation={[0, alienRotationConstant - alienPosRadians * 2, 0]}/>
        <UfoBossShip scale={4} position={[0, -0.5, 0]}/>
        <RocketNoAstronaut scale={0.5} position={[0, -0.2, -0.3]} rotation={[0, 0, Math.PI/2]}/>
        <AstronautHandsUp scale={0.7}/>
    </group>
    </group>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI/2]}
      position={[-0.5, 0, -1.7]}
      size={0.8}
      height={0.1}
    >
      CATCH!
      <meshStandardMaterial color='turquoise'/>
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI/2]}
      position={[-1.2, 0, -1.8]}
      size={0.4}
      height={0.1}
    >
      BONUS THROW
      <meshStandardMaterial color='turquoise'/>
    </Text3D>
    <group ref={borderMesh0Ref}>
      <YootEmoji/>
    </group>
    <group ref={borderMesh1Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh2Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh3Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh4Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh5Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
    <group ref={borderMesh6Ref}>
      <Star scale={0.2} color='turquoise'/>
    </group>
  </animated.group>
}
