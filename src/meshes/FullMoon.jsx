import { useRef } from "react";
import { animated } from "@react-spring/three";
import * as THREE from 'three';
import AtmosphereFragmentShader from '../shader/fullMoon/atmosphere/fragment.glsl'
import AtmosphereVertexShader from '../shader/fullMoon/atmosphere/vertex.glsl'
import FragmentShader from '../shader/fullMoon/fragment.glsl'
import VertexShader from '../shader/fullMoon/vertex.glsl'
import { useFrame } from "@react-three/fiber";
import { useAtomValue } from "jotai";
import { moonTextureAtom } from "../GlobalState";

export default function FullMoon({ position=[0,0,0], rotation=[0,0,0], scale=1, shiny=true }) {
  const moonTexture = useAtomValue(moonTextureAtom);

  const moon = useRef();
  useFrame((state) => {
    moon.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <animated.group
      ref={moon}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group scale={3.4}>
        <mesh>
          <sphereGeometry args={[0.6, 32, 32]} />
          <shaderMaterial
            vertexShader={VertexShader}
            fragmentShader={FragmentShader}
            uniforms={{
              uSunDirection: new THREE.Uniform(new THREE.Vector3(0,0,0)),
              uMoonTexture: new THREE.Uniform(moonTexture),
              uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#D0D0D0')),
              uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#D0D0D0'))
            }}
          />
        </mesh>
      </group>
    </animated.group>
  );
}