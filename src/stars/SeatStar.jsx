import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import * as THREE from 'three';

export default function SeatStar({ scale = 1, position = [0,0,0], rotation = [0,0,0], team = 0, colorStart = '#ffff00', colorFinish = '#ffffff' }) {
  const { scene } = useGLTF(
    "/models/star.glb"
  );

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const material = useRef()
  const star = useRef()

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    if (star.current) {
        star.current.rotation.y += delta
        star.current.scale.x = (Math.sin(time * 2) * 0.2 + 0.8) * scale
    }
    if (material.current) {
        const current = new THREE.Color(material.current.color)
        const yellow = new THREE.Color(colorStart)
        const orange = new THREE.Color(colorFinish)

        // oscillate t between 0 and 1 using sine
        const t = (Math.sin(time * 2) + 1) / 2

        // interpolate between yellow and orange
        current.lerpColors(yellow, orange, t)
        material.current.color = current
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale} ref={star}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.star.geometry}
        rotation={[0, Math.PI, 0]} // Upside down by default
      >
        <meshStandardMaterial ref={material}/>
      </mesh>
    </group>
  );
}