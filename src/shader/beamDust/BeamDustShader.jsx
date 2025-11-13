import beamDustVertexShader from './vertex.glsl';
import beamDustFragmentShader from './fragment.glsl';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

export function useBeamDustShader() {

    const { scene } = useThree();
    
    // Use shared sizes object - no resize listener needed
    const sizes = useWindowSize();
    
    // one particle
    // spawn via setInterval
    // randomize position and size
    function CreateBeamDust({ position, positionParticles, size, speed }) {
        const color = new THREE.Color();
        color.setHSL(0.5, 0.5, 0.6)
        const geometry = new THREE.BufferGeometry()
        const positionsArray = new Float32Array(3)
        positionsArray[0] = positionParticles.x
        positionsArray[1] = positionParticles.y
        positionsArray[2] = positionParticles.z
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
        const material = new THREE.ShaderMaterial({
            vertexShader: beamDustVertexShader,
            fragmentShader: beamDustFragmentShader,
            uniforms: {
                uSize: new THREE.Uniform(size), // needs the THREE.Uniform object
                uResolution: new THREE.Uniform(sizes.resolution),
                uProgress: new THREE.Uniform(0),
                uPosition: new THREE.Uniform(positionParticles),
                uColor: new THREE.Uniform(color),
                uSpeed: new THREE.Uniform(speed)
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })
        const points = new THREE.Points(geometry, material)
        points.position.copy(position)
        const destroy = () => { // may need to run on component unmount as well
            scene.remove(points)
            geometry.dispose()
            material.dispose()
        }

        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration: 1.8, ease: 'linear', onComplete: destroy }
        )

        scene.add(points)
    }

    return [CreateBeamDust];
}