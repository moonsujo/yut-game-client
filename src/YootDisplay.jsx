import { animated, useSpring } from "@react-spring/three";
import { Float } from "@react-three/drei";
import YootMesh from "./meshes/YootMesh";
import YootRhino from "./meshes/YootRhino";
import { folder, Leva, useControls } from 'leva'
import { useState } from "react";

export default function YootDisplay({position, rotation, scale}) {
  // Leva controls for debugging
  // const { yut0RotX, yut0RotY, yut0RotZ,
  //   yut0PosX, yut0PosY, yut0PosZ, yut0Scale,
  //   yut1RotX, yut1RotY, yut1RotZ,
  //   yut1PosX, yut1PosY, yut1PosZ, yut1Scale,
  //   yut2RotX, yut2RotY, yut2RotZ,
  //   yut2PosX, yut2PosY, yut2PosZ, yut2Scale,
  //   yut3PosX, yut3PosY, yut3PosZ, yut3Scale,
  //   yut3RotX, yut3RotY, yut3RotZ,
  // } = useControls({ 
  //   yut0: folder({
  //     yut0RotX: {
  //       value: 0.49,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut0RotY: {
  //       value: 0.29,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut0RotZ: {
  //       value: 1.57,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut0PosX: {
  //       value: -0.1,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut0PosY: {
  //       value: -0.5,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut0PosZ: {
  //       value: -1.4,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut0Scale: {
  //       value: 1,
  //       min: 0.1,
  //       max: 5,
  //       step: 0.1
  //     }
  //   }),
  //   yut1: folder({
  //     yut1RotX: {
  //       value: 0.68,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut1RotY: {
  //       value: 0.20,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut1RotZ: {
  //       value: 1.66,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut1PosX: {
  //       value: 0.4,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut1PosY: {
  //       value: 1.3,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut1PosZ: {
  //       value: -0.1,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut1Scale: {
  //       value: 1,
  //       min: 0.1,
  //       max: 5,
  //       step: 0.1
  //     }
  //   }),
  //   yut2: folder({
  //     yut2RotX: {
  //       value: 5.60,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut2RotY: {
  //       value: 2.95,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut2RotZ: {
  //       value: 1.48,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut2PosX: {
  //       value: 0.5,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut2PosY: {
  //       value: 0.0,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut2PosZ: {
  //       value: 1.9,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut2Scale: {
  //       value: 1,
  //       min: 0.1,
  //       max: 5,
  //       step: 0.1
  //     }
  //   }),
  //   yut3: folder({
  //     yut3RotX: {
  //       value: 5.59,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut3RotY: {
  //       value: 2.75,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut3RotZ: {
  //       value: 1.57,
  //       min: 0,
  //       max: Math.PI * 2,
  //       step: Math.PI/32
  //     },
  //     yut3PosX: {
  //       value: -1.2,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut3PosY: {
  //       value: 2.1,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut3PosZ: {
  //       value: 3.4,
  //       min: -5,
  //       max: 5,
  //       step: 0.1
  //     },
  //     yut3Scale: {
  //       value: 1,
  //       min: 0.1,
  //       max: 5,
  //       step: 0.1
  //     }
  //   })
  // })

  const [hover, setHover] = useState(false)

  const { yut0Rot, yut0Pos, yut0Scale,
    yut1Rot, yut1Pos, yut1Scale,
    yut2Rot, yut2Pos, yut2Scale,
    yut3Rot, yut3Pos, yut3Scale,
  } = useSpring({
    yut0Rot: hover ? [0.78, 0.39, 1.57] : [0.49, 0.29, 1.57],
    yut0Pos: hover ? [2.1, 0.5, -3.0] : [-0.1, -0.5, -1.4],
    yut0Scale: hover ? 1.05 : 0.9,
    yut1Rot: hover ? [2.05, 0.3, 1.37] : [0.68, 0.20, 1.66],
    yut1Pos: hover ? [1.7, 3.0, -0.4] : [0.4, 1.3, -0.1],
    yut1Scale: hover ? 1.05 : 0.9,
    yut2Rot: hover ? [5.6, 3.15, 1.58] : [5.60, 2.95, 1.48],
    yut2Pos: hover ? [2.6, 3.0, 1.9] : [0.5, 0.0, 1.9],
    yut2Scale: hover ? 1.05 : 0.9,
    yut3Rot: hover ? [5.1, 2.65, 1.57] : [5.59, 2.75, 1.57],
    yut3Pos: hover ? [2.2, 1.8, 4.2] : [-1.2, 2.1, 3.4],
    yut3Scale: hover ? 1.05 : 0.9,
  })

  const handlePointerEnter = (e) => {
    // Handle pointer enter event
    document.body.style.cursor = "grab";
    e.stopPropagation();
    setHover(true);
  }
  const handlePointerLeave = (e) => {
    // Handle pointer leave event
    document.body.style.cursor = "default";
    e.stopPropagation();
    setHover(false);
  }
  

  return <animated.group
    position={position}
    rotation={rotation}
    scale={scale}
  >
    <mesh 
    scale={[12, 0.2, 8]} 
    position={[0, 0, 0.5]}
    onPointerEnter={e => handlePointerEnter(e)}
    onPointerLeave={e => handlePointerLeave(e)}
    >
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial transparent opacity={0} />
    </mesh>
    <Float floatIntensity={0.5} floatingRange={[0.1, 0.1]} speed={2} rotationIntensity={1}>
      {/* for Leva debugging */}
      {/* <YootMesh scale={yut0Scale} position={[yut0PosX, yut0PosY, yut0PosZ]} rotation={[yut0RotX, yut0RotY, yut0RotZ]}/>
      <YootMesh scale={yut1Scale} position={[yut1PosX, yut1PosY, yut1PosZ]} rotation={[yut1RotX, yut1RotY, yut1RotZ]} />
      <YootMesh scale={yut2Scale} position={[yut2PosX, yut2PosY, yut2PosZ]} rotation={[yut2RotX, yut2RotY, yut2RotZ]} />
      <YootRhino scale={yut3Scale} position={[yut3PosX, yut3PosY, yut3PosZ]} rotation={[yut3RotX, yut3RotY, yut3RotZ]} /> */}
      <animated.group scale={yut0Scale} position={yut0Pos} rotation={yut0Rot}>
        <YootMesh />
      </animated.group>
      <animated.group scale={yut1Scale} position={yut1Pos} rotation={yut1Rot}>
        <YootMesh />
      </animated.group>
      <animated.group scale={yut2Scale} position={yut2Pos} rotation={yut2Rot}>
        <YootMesh />
      </animated.group>
      <animated.group scale={yut3Scale} position={yut3Pos} rotation={yut3Rot}>
        <YootRhino />
      </animated.group>
    </Float>
    {/* <Leva/> */}
  </animated.group>
}