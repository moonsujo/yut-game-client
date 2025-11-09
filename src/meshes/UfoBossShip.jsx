import { MeshDistortMaterial, useGLTF } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { animated } from "@react-spring/three";
import * as THREE from 'three';
import Star from "./Stars/Star";

const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

export default function UfoBossShip({
  //tile,
  position=[0,0,0],
  rotation=[0,0,0],
  scale=1,
  glassOpacity=0.1,
  animate=false,
  smiling=true,
  glassColor='grey',
  rightEyeScale=[1, 1, 1],
  enlightened=true
}) {
  const { scene, materials } = useGLTF("/models/ufo-eyes-separate.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const ufoGlassRef = useRef();
  const ballsRef = useRef();
  const ballsRef2 = useRef();

  useEffect(() => {
    // ufoGlassRef.current.material.opacity = glassOpacity;
  }, []);

  useFrame((state, delta) => {
    if (animate) {
      ballsRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      ballsRef.current.position.y = 0.3
      ballsRef2.current.rotation.y = state.clock.elapsedTime * 0.5;
      ballsRef2.current.position.y = 0.55
    }
  });

  const ballSpaceFactor = 1.5
  const ballSpaceFactor2 = 2.6 // hide balls
  const ballScaleFactor = 0.9
  const ballScaleFactor2 = 0.1  // hide balls
  return (
    <animated.group position={position} rotation={rotation} scale={scale}>
      <group
        dispose={null}
        scale={0.5}
      >
        <group rotation={[0,0,0]}>
          <mesh
            name='underbelly' // contains top plate side cover
            castShadow
            receiveShadow
            geometry={nodes.Circle024_1.geometry}
            material={materials.White}
            scale={[1, 0.7, 1]}
            position={[0, -0.02, 0]} // side and underneath put together
          >
            <meshStandardMaterial color='#C1E3CB' side={THREE.DoubleSide}/>
          </mesh>
          <mesh name='side-plate'
            castShadow
            receiveShadow
            geometry={nodes.Circle024_2.geometry}
            material={materials.Blue}
          />
          {/* <mesh
            name='hole-cover'
            material={materials.Blue}
            scale={[1, 0.05, 1]}
            position={[0, -0.05, 0]}
          >
            <cylinderGeometry args={[1, 1, 1, 32]}/>
          </mesh> */}
          <mesh name='top'
            castShadow
            receiveShadow
            geometry={nodes.Circle024_3.geometry}
            material={materials.Grey}
            position={[0, -0.02, 0]}
          />
          {/* <mesh
            name='belly-inner-black-plate'
            castShadow
            receiveShadow
            geometry={nodes.Circle024_4.geometry}
            material={materials["Alien Black"]}
          /> */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024_5.geometry}
            material={materials["Inside Grey"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle002.geometry}
            material={materials.Blue}
            position={[0, 0, 0.765]}
            scale={0.087}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle013.geometry}
            material={materials["Inside Grey"]}
            position={[0, -0.051, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle024.geometry}
            material={materials.Blue}
            position={[0.765, 0, 0]}
            rotation={[0, 1.571, 0]}
            scale={0.087}
          />
          <group position={[0, -0.051, 0]} rotation={[0, -0.365, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038.geometry}
              material={materials["Panel Grey"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038_1.geometry}
              material={materials.red}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Circle038_2.geometry}
              material={materials.Green}
            />
          </group>
          <group ref={ballsRef} position={[0, 0.35, 0]} scale={1}>
            {/* ball front right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.252 * ballSpaceFactor, -0.592, 0.252 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.356 * ballSpaceFactor, -0.592, 0]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball back right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[0.252 * ballSpaceFactor, -0.592, -0.252 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball back */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[0, -0.592, -0.356 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball back left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[-0.252 * ballSpaceFactor, -0.592, -0.252 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube030.geometry}
              material={materials.Blue}
              position={[-0.356 * ballSpaceFactor, -0.592, 0]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball front left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[-0.252 * ballSpaceFactor, -0.592, 0.252 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
            {/* ball front */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[0, -0.592, 0.356 * ballSpaceFactor]}
              scale={0.128 * ballScaleFactor}
            />
          </group>
          <group ref={ballsRef2} position={[0, 0.54, 0]} scale={1}>
            {/* ball front right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.252 * ballSpaceFactor2, -0.592, 0.252 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube001.geometry}
              material={materials.Blue}
              position={[0.356 * ballSpaceFactor2, -0.592, 0]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball back right */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[0.252 * ballSpaceFactor2, -0.592, -0.252 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball back */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[0, -0.592, -0.356 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball back left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube029.geometry}
              material={materials.Blue}
              position={[-0.252 * ballSpaceFactor2, -0.592, -0.252 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube030.geometry}
              material={materials.Blue}
              position={[-0.356 * ballSpaceFactor2, -0.592, 0]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball front left */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[-0.252 * ballSpaceFactor2, -0.592, 0.252 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
            {/* ball front */}
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Roundcube028.geometry}
              material={materials.Blue}
              position={[0, -0.592, 0.356 * ballSpaceFactor2]}
              scale={0.128 * ballScaleFactor2}
            />
          </group>
        </group>
      </group>
    </animated.group>
  );
}

useGLTF.preload("/models/ufo.glb");
