import { useMemo, useRef, useState } from "react";
import { animated } from "@react-spring/three";
import * as THREE from 'three';
import FragmentShader from '../shader/blueMoon/fragment.glsl'
import VertexShader from '../shader/blueMoon/vertex.glsl'
import { useFrame } from "@react-three/fiber";
import { useAtom, useSetAtom } from "jotai";
import { blueMoonBrightnessAtom } from "../GlobalState";
import { lerp } from "three/src/math/MathUtils.js";

export default function BlueMoon({ position=[0,0,0], rotation=[0,0,0], scale=1, rotationSpeed=0.1 }) {
  const textureLoader = new THREE.TextureLoader()
  const moonTexture = textureLoader.load("/textures/moon/moon-color.jpg") // must use absolute path - string starts with a slash
  moonTexture.colorSpace = THREE.SRGBColorSpace

  const moon = useRef();
  const shaderRef = useRef()
  
  // useFrame
  // lerp
  // uniform
  const [brightness, setBrightness] = useAtom(blueMoonBrightnessAtom)
  const uniforms = useMemo(() => ({
    uSunDirection: { value: new THREE.Vector3(0,0,0) },
    uMoonTexture: { value: moonTexture },
    uAtmosphereDayColor: { value: new THREE.Color('#23A9F1') },
    uAtmosphereTwilightColor: { value: new THREE.Color('#000000') },
    uAtmosphereColorFactor: { value: 0.1 }
  }), []);
  useFrame((state, delta) => {
    moon.current.rotation.y = -state.clock.elapsedTime * rotationSpeed;
    if (brightness) {
      const newBrightness = brightness - delta/1.4
      shaderRef.current.uniforms.uAtmosphereColorFactor.value = newBrightness
      setBrightness(newBrightness)
    } else {
      shaderRef.current.uniforms.uAtmosphereColorFactor.value = 0.1
    }
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
      </group>
    </animated.group>
  );
}