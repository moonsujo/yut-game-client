import { useMemo, useRef, useState } from "react";
import { animated } from "@react-spring/three";
import * as THREE from 'three';
import FragmentShader from '../shader/goldenMoon/fragment.glsl'
import VertexShader from '../shader/goldenMoon/vertex.glsl'
import AtmosphereFragmentShader from '../shader/goldenMoon/atmosphere/fragment.glsl'
import AtmosphereVertexShader from '../shader/goldenMoon/atmosphere/vertex.glsl'
import { useFrame } from "@react-three/fiber";

export default function GoldenMoon({ position=[0,0,0], rotation=[0,0,0], scale=1, rotationSpeed=0.1 }) {
  const textureLoader = new THREE.TextureLoader()
  const moonTexture = textureLoader.load("/textures/moon/moon-color.jpg") // must use absolute path - string starts with a slash
  moonTexture.colorSpace = THREE.SRGBColorSpace

  const moon = useRef();
  const shaderRef = useRef()
  
  // useFrame
  // lerp
  // uniform
  const uniforms = useMemo(() => ({
    uSunDirection: { value: new THREE.Vector3(0, 5, 0) }, // Sun directly facing the moon
    uMoonTexture: { value: moonTexture },
    uAtmosphereDayColor: { value: new THREE.Color('#ffffff') }, // Golden yellow
    uAtmosphereTwilightColor: { value: new THREE.Color('#fffeeb') }, // Orange-gold
    uAtmosphereColorFactor: { value: 1.0 } // Brighter atmosphere
  }), []);

  useFrame((state, delta) => {
    moon.current.rotation.y = -state.clock.elapsedTime * rotationSpeed;

    shaderRef.current.uniforms.uAtmosphereColorFactor.value = 1.0
  });

  return (
    <animated.group
      ref={moon}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <group scale={4}>
        {/* reduce brightness of this material to make it less bright */}
        {/* control light around moon to make it look like it's going through phases */}
        <mesh>
          <sphereGeometry args={[0.6, 64, 64]} />
          <shaderMaterial
            vertexShader={VertexShader}
            fragmentShader={FragmentShader}
            uniforms={uniforms}
            ref={shaderRef}
          />
        </mesh>
        <mesh scale={1.1}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <shaderMaterial 
          side={THREE.BackSide} 
          transparent 
          vertexShader={AtmosphereVertexShader}
          fragmentShader={AtmosphereFragmentShader}
          uniforms={{
            uSunDirection: new THREE.Uniform(new THREE.Vector3(0,5,0)),
            uAtmosphereDayColor: new THREE.Uniform(new THREE.Color('#fffef0')),
            uAtmosphereTwilightColor: new THREE.Uniform(new THREE.Color('#fffdf5')),
          }}
          blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </animated.group>
  );
}