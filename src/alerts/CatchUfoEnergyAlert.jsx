import { Float, Text3D } from "@react-three/drei"
import { useEffect, useRef } from "react";
import Star from "../meshes/Star"
import { useFrame } from "@react-three/fiber";
import YootMesh from "../meshes/YootMesh";
import { animated } from "@react-spring/three";
import Ufo from "../meshes/Ufo";
import Rocket from "../meshes/Rocket";

export default function CatchUfoEnergyAlert({ position, rotation, scale }) {

  // Border
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

  const height = 2.2
  const width = 2.9
  useFrame((state, delta) => {
    for (let i = 0; i < borderMeshRefs.length; i++) {      
      borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
      borderMeshRefs[i].current.position.y = 0.1
      borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
    }
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

  // Scene
  const numBalls = 8
  const ballsInside = []
  const ballMatsInside = []
  const ballsOutside = []
  const ballMatsOutside = []
  for (let i = 0; i < numBalls; i++) {
      ballsInside.push(useRef())
      ballMatsInside.push(useRef())
      ballsOutside.push(useRef())
      ballMatsOutside.push(useRef())
  }
  const ufo = useRef()
  const rocket = useRef()

  const explodeAnimationLoopTime = 3.2
  const ballExplodeLoopTime = 0.8
  const ballInsideTimeShift = 1.6
  const explodeSpeed = 2 // 2 is good
  const explodeScale = 0.1
  const ufoScale = 1.3
  const explodeRadius = 0.5
  let time = 0
  useFrame((state, delta) => {
      time += delta
      for (let i = 0; i < numBalls; i++) {
          if (ballsOutside[i].current) {
              ballsOutside[i].current.position.x = explodeRadius * (time % explodeAnimationLoopTime) * (Math.cos(Math.PI * 2 * i / numBalls))
              ballsOutside[i].current.position.z = explodeRadius * (time % explodeAnimationLoopTime) * (Math.sin(Math.PI * 2 * i / numBalls))
              // spiral
              const x = ballsOutside[i].current.position.x
              const z = ballsOutside[i].current.position.z
              ballsOutside[i].current.position.x = x * Math.cos(time % explodeAnimationLoopTime) - z * Math.sin(time % explodeAnimationLoopTime)
              ballsOutside[i].current.position.z = x * Math.sin(time % explodeAnimationLoopTime) + z * Math.cos(time % explodeAnimationLoopTime)

              // scale out
              ballsOutside[i].current.scale.x = Math.min(explodeScale, time % ballExplodeLoopTime)
              ballsOutside[i].current.scale.y = Math.min(explodeScale, time % ballExplodeLoopTime)
              ballsOutside[i].current.scale.z = Math.min(explodeScale, time % ballExplodeLoopTime)
          }
          if (ballMatsOutside[i].current) {
              const t = (time % ballExplodeLoopTime);
              // fade
              ballMatsOutside[i].current.opacity = (1 - t) / (time % explodeAnimationLoopTime)
              // color fade from turquoise to white
              const turquoise = { r: 64 / 255, g: 224 / 255, b: 208 / 255 };
              const red = { r: 1, g: 0, b: 0 };
              ballMatsOutside[i].current.color.r = turquoise.r + (red.r - turquoise.r) * t;
              ballMatsOutside[i].current.color.g = turquoise.g + (red.g - turquoise.g) * t;
              ballMatsOutside[i].current.color.b = turquoise.b + (red.b - turquoise.b) * t;
          }
          // if (ballsInside[i].current) {
          //     ballsInside[i].current.position.x = explodeRadius * (time % explodeAnimationLoopTime) * (Math.cos(Math.PI * 2 * i / numBalls)) * explodeSpeed
          //     ballsInside[i].current.position.z = explodeRadius * (time % explodeAnimationLoopTime) * (Math.sin(Math.PI * 2 * i / numBalls)) * explodeSpeed
          //     // spiral
          //     const x = ballsInside[i].current.position.x
          //     const z = ballsInside[i].current.position.z
          //     ballsInside[i].current.position.x = x * Math.cos((time) % explodeAnimationLoopTime) - z * Math.sin((time) % explodeAnimationLoopTime)
          //     ballsInside[i].current.position.z = x * Math.sin((time) % explodeAnimationLoopTime) + z * Math.cos((time) % explodeAnimationLoopTime)
          //     // scale out
          //     ballsInside[i].current.scale.x = Math.min(explodeScale, (time) % ballExplodeLoopTime)
          //     ballsInside[i].current.scale.y = Math.min(explodeScale, (time) % ballExplodeLoopTime)
          //     ballsInside[i].current.scale.z = Math.min(explodeScale, (time) % ballExplodeLoopTime)
          // }
          // if (ballMatsInside[i].current) {
          //   const t = ((time) % ballExplodeLoopTime);
          //   // fade
          //   ballMatsInside[i].current.opacity = (1 - 0.5 - t) / (time % explodeAnimationLoopTime)
          //   // color fade from turquoise to white
          //   const turquoise = { r: 64 / 255, g: 224 / 255, b: 208 / 255 };
          //   const red = { r: 1, g: 0, b: 0 };
          //   ballMatsInside[i].current.color.r = turquoise.r + (red.r - turquoise.r) * t;
          //   ballMatsInside[i].current.color.g = turquoise.g + (red.g - turquoise.g) * t;
          //   ballMatsInside[i].current.color.b = turquoise.b + (red.b - turquoise.b) * t;
          // }
      }
      ufo.current.scale.x = Math.max(ufoScale - (time % explodeAnimationLoopTime), 0)
      ufo.current.scale.y = Math.max(ufoScale - (time % explodeAnimationLoopTime), 0)
      ufo.current.scale.z = Math.max(ufoScale - (time % explodeAnimationLoopTime), 0)

      rocket.current.position.z = Math.sin(time) * 0.5
  })

  return <animated.group position={position} rotation={rotation} scale={scale} onPointerDown={(e) => handleAlertClick(e)}>
    <mesh
      castShadow
      receiveShadow
      scale={[2.2, 0.055, 2.9]}
    >
      <cylinderGeometry args={[1, 1, 1, 64]}/>
      <meshStandardMaterial color='black' opacity={0.7} transparent/>
    </mesh>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI/2]}
      position={[-0.6, 0.5, -1.5]}
      size={0.7}
      height={0.1}
    >
      CATCH!
      <meshStandardMaterial color='red'/>
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      rotation={[Math.PI/2, Math.PI, Math.PI/2]}
      position={[-1.2, 0, -1.6]}
      size={0.35}
      height={0.1}
    >
      BONUS THROW
      <meshStandardMaterial color='red'/>
    </Text3D>
    <group ref={borderMesh0Ref} scale={0.7}>
      <YootEmoji/>
    </group>
    <group ref={borderMesh1Ref}>
      <Star scale={0.2} color='red'/>
    </group>
    <group ref={borderMesh2Ref}>
      <Star scale={0.2} color='red'/>
    </group>
    <group ref={borderMesh3Ref}>
      <Star scale={0.2} color='red'/>
    </group>
    <group ref={borderMesh4Ref}>
      <Star scale={0.2} color='red'/>
    </group>
    <group ref={borderMesh5Ref}>
      <Star scale={0.2} color='red'/>
    </group>
    <group ref={borderMesh6Ref}>
      <Star scale={0.2} color='red'/>
    </group>
    <group name='animation' rotation={[0, -Math.PI/2, 0]}>
      <group name='ufo-section' position={[1, 1, -0.7]}>
        <group name='balls' rotation={[-Math.PI/8, 0, 0]}>
          { [...Array(numBalls)].map((_, i) => {
              return <group name={`ball-${i}`} key={i}>
                  <mesh name={`ball-${i}-outside`} ref={ballsOutside[i]} scale={[0.3, 0.3, 0.3]}>
                      <sphereGeometry args={[1, 32, 32]}/>
                      <meshStandardMaterial ref={ballMatsOutside[i]} transparent color='turquoise'/>
                  </mesh>
              </group>
          })}
        </group>
        {/* <group name='balls-inside' rotation={[-Math.PI/8, 0, 0]}>
          { [...Array(numBalls)].map((_, i) => {
              return <group name={`ball-${i}`} key={i}>
                  <mesh name={`ball-${i}-inside`} ref={ballsInside[i]} scale={[0.1, 0.3, 0.3]}>
                      <sphereGeometry args={[1, 32, 32]}/>
                      <meshStandardMaterial ref={ballMatsInside[i]} transparent color='turquoise'/>
                  </mesh>
              </group>
          })}
        </group> */}
        <group ref={ufo}>
          <Ufo/>
        </group>
      </group>
      <group ref={rocket}>
        <Rocket onBoard position={[-1, 0.5, -1.3]} /> 
        <Rocket onBoard position={[-1.3, 0.5, -1.7]} /> 
      </group>
    </group>
  </animated.group>
}