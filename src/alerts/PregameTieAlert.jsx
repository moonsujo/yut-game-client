import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { animated } from "@react-spring/three";
import { Text3D } from "@react-three/drei";
import Star from "../meshes/Stars/Star";

export default function PregameTieAlert({ scale=1, rotation}) {
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
  useFrame((state, delta) => {
    for (let i = 0; i < borderMeshRefs.length; i++) {      
      if (borderMeshRefs[i].current) {
        borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2
        borderMeshRefs[i].current.position.y = 0.1
        borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * 2.7
      }
    }
  })

  return <animated.group scale={scale} rotation={rotation}>
    <mesh
      castShadow
      receiveShadow
      scale={[2, 0.055, 2.6]}
    >
      <cylinderGeometry args={[1, 1, 1, 64]}/>
      <meshStandardMaterial color='black' opacity={0.8} transparent/>
    </mesh>
    <group>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-0.1,0,-1.35]}
        size={1.2}
        height={0.1}
        lineHeight={0.8}
      >
        {`TIE!`}
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        rotation={[Math.PI/2, Math.PI, Math.PI/2]}
        position={[-1,0,-1.5]}
        size={0.5}
        height={0.1}
        lineHeight={0.8}
      >
        {`go again`}
        <meshStandardMaterial color='limegreen'/>
      </Text3D>
    </group>
    <group ref={borderMesh0Ref}>
      <Star 
        scale={0.2}
      />
    </group>
    <group ref={borderMesh1Ref}>
      <Star 
        scale={0.2}
      />
    </group>
    <group ref={borderMesh2Ref}>
      <Star 
        scale={0.2}
      />
    </group>
    <group ref={borderMesh3Ref}>
      <Star 
        scale={0.2}
      />
    </group>
    <group ref={borderMesh4Ref}>
      <Star 
        scale={0.2}
      />
    </group>
    <group ref={borderMesh5Ref}>
      <Star 
        scale={0.2}
      />
    </group>
    <group ref={borderMesh6Ref}>
      <Star 
        scale={0.2}
      />
    </group>
  </animated.group>
}