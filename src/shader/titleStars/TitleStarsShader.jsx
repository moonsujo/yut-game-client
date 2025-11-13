import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import titleStarsVertexShader from './vertex.glsl'
import titleStarsFragmentShader from './fragment.glsl'
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

// Cache for star data to avoid recreating Float32Arrays on every render
const starDataCache = new Map();
const textureCache = new Map();

function generateStarData() {
  const count = 20;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const delays = new Float32Array(count);

  // Set particle attributes
  positions[0] = 1.0; positions[1] = 0.0; positions[2] = 0.5;
  colors[0] = 1.0; colors[1] = 1.0; colors[2] = 0.7;
  scales[0] = 1.0; delays[0] = 0.0;

  positions[3] = 0.4; positions[4] = 0.0; positions[5] = 0.3;
  colors[3] = 1.0; colors[4] = 1.0; colors[5] = 0.7;
  scales[1] = 1.0; delays[1] = 0.3;

  positions[6] = -0.2; positions[7] = 0.0; positions[8] = -0.6;
  colors[6] = 1.0; colors[7] = 1.0; colors[8] = 0.7;
  scales[2] = 1.0; delays[2] = 0.5;
  
  positions[9] = 0.0; positions[10] = 0.0; positions[11] = -1.0;
  colors[9] = 1.0; colors[10] = 1.0; colors[11] = 0.7;
  scales[3] = 1.0; delays[3] = 0.7;

  positions[12] = -0.1; positions[13] = 0.0; positions[14] = -2.2;
  colors[12] = 1.0; colors[13] = 1.0; colors[14] = 0.7;
  scales[4] = 1.0; delays[4] = 0.9;

  positions[15] = 1.0; positions[16] = 2.0; positions[17] = -6.0;
  colors[15] = 1.0; colors[16] = 1.0; colors[17] = 0.7;
  scales[5] = 1.0; delays[5] = 1.1;

  positions[18] = 1.0; positions[19] = 2.0; positions[20] = -7.9;
  colors[18] = 1.0; colors[19] = 1.0; colors[20] = 0.7;
  scales[6] = 1.0; delays[6] = 1.3;

  positions[21] = 1.5; positions[22] = 2.0; positions[23] = -7.0;
  colors[21] = 1.0; colors[22] = 1.0; colors[23] = 0.7;
  scales[7] = 1.0; delays[7] = 1.5;

  return { count, positions, colors, scales, delays };
}

// sparkle around the title
export default function TitleStarsShader({ position=[0,0,0], size=1.0, texturePath }) {
  
  // Cache star data
  const starData = useMemo(() => {
    if (!starDataCache.has('default')) {
      starDataCache.set('default', generateStarData());
    }
    return starDataCache.get('default');
  }, []);

  const { count, positions, colors, scales, delays } = starData;

  // Cache texture loading
  const texture = useMemo(() => {
    if (!textureCache.has(texturePath)) {
      const loader = new TextureLoader();
      textureCache.set(texturePath, loader.load(texturePath));
    }
    return textureCache.get(texturePath);
  }, [texturePath]);

  const { gl } = useThree();
  
  // Move pixel ratio setting to useEffect to run only once
  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  }, [gl]);

  const uniforms = useMemo(() => ({
    uSize: { value: 400 * Math.min(window.devicePixelRatio, 1) },
    uTime: { value: 0 },
    uTexture: { value: texture }
  }), [texture]);
  
  const shaderRef = useRef();
  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  })

  return (
    <group position={position}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
            normalized
          />
          <bufferAttribute
            attach="attributes-aScale" // must prepend with 'attributes'
            count={scales.length}
            array={scales}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aDelay" // must prepend with 'attributes'
            count={delays.length}
            array={delays}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexColors={true}
          vertexShader={titleStarsVertexShader}
          fragmentShader={titleStarsFragmentShader}
          ref={shaderRef}
          uniforms={uniforms}
        />
      </points>
    </group>
  );
}
