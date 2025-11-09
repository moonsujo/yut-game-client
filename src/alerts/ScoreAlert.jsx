import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { animated } from "@react-spring/three";
import { Center, Text3D } from "@react-three/drei";
import Star from "../meshes/Stars/Star";

export default function ScoreAlert({ scale, rotation, scoringTeam }) {
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

  const height = 1.7
  const width = 2.5
  useFrame((state, delta) => {
    for (let i = 0; i < borderMeshRefs.length; i++) {      
      borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
      borderMeshRefs[i].current.position.y = 0.05
      borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
    }
  })

  return <animated.group scale={scale} rotation={rotation}>
      <mesh scale={[width, 1,height]}>
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
        <meshStandardMaterial color='black' transparent opacity={0.9}/>
      </mesh>
      <Center position={[0, 0.1, 0]}>
        <Text3D
            font="/fonts/Luckiest Guy_Regular.json" 
            position={[-1.4, 0.1, -0.1]}
            rotation={[-Math.PI/2, 0, 0]}
            height={0.01}
            lineHeight={0.9} 
            size={0.46}
        >
            { scoringTeam === 0 ? `Welcome\n     Back!` : `     ALIEN\nINVASION!`}
            <meshStandardMaterial color='yellow'/>
        </Text3D>
      </Center>
      <group ref={borderMesh0Ref}>
          <Star scale={0.15} color='yellow' />
      </group>
      <group ref={borderMesh1Ref}>
          <Star scale={0.15} color='yellow' />
      </group>
      <group ref={borderMesh2Ref}>
          <Star scale={0.15} color='yellow'/>
      </group>
      <group ref={borderMesh3Ref}>
          <Star scale={0.15} color='yellow' />
      </group>
      <group ref={borderMesh4Ref}>
          <Star scale={0.15} color='yellow' />
      </group>
      <group ref={borderMesh5Ref}>
          <Star scale={0.15} color='yellow' />
      </group>
      <group ref={borderMesh6Ref}>
          <Star scale={0.15} color='yellow' />
      </group>
  </animated.group>
}