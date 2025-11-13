import fireworkVertexShader from './vertex.glsl';
import fireworkFragmentShader from './fragment.glsl';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useLoader, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect } from 'react';
import { getWindowSizes } from '../../hooks/useWindowSize';

export function useShootingStarShader() {

    const { scene } = useThree();
    
    // Use shared sizes object - no resize listener needed
    const sizes = getWindowSizes();

    const textures = [
        useLoader(TextureLoader, '/textures/particles/1.png'),
        useLoader(TextureLoader, '/textures/particles/2.png'),
        useLoader(TextureLoader, '/textures/particles/3.png'),
        useLoader(TextureLoader, '/textures/particles/4.png'),
        useLoader(TextureLoader, '/textures/particles/5.png'),
        useLoader(TextureLoader, '/textures/particles/6.png'),
        useLoader(TextureLoader, '/textures/particles/7.png'),
        useLoader(TextureLoader, '/textures/particles/8.png'),
    ]

    function generateRandomNumberInRange(num, plusMinus) {
        return num + Math.random() * plusMinus * (Math.random() > 0.5 ? 1 : -1);
    };

    function CreateShootingStar({
        count, 
        position, 
        fallDirection, size, texture, radius, color, duration, 
        cutOff=1,
        trailXRange=[-1, 1],
        trailZRange=[-1, 1],
    }) {
        const positionsArray = new Float32Array(count * 3)
        const sizesArray = new Float32Array(count)
        const directionsArray = new Float32Array(count*3);
        const timingsArray = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3

            positionsArray[i3] = position.x + i * fallDirection.x + 2;
            positionsArray[i3+1] = position.y
            positionsArray[i3+2] = position.z + i * fallDirection.z + 2

            sizesArray[i] = Math.random()

            directionsArray[i*3] = generateRandomNumberInRange(trailXRange[0], trailXRange[1])
            directionsArray[i*3+1] = 0
            directionsArray[i*3+2] = generateRandomNumberInRange(trailZRange[0], trailZRange[1])

            timingsArray[i] = (i*cutOff)/count;
        }

        texture.flipY = false;

        // const firework = useRef();
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
        geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
        geometry.setAttribute('aDirection', new THREE.Float32BufferAttribute(directionsArray, 3));
        geometry.setAttribute('aTiming', new THREE.Float32BufferAttribute(timingsArray, 1));
        const material = new THREE.ShaderMaterial({
            vertexShader: fireworkVertexShader,
            fragmentShader: fireworkFragmentShader,
            uniforms: {
                uSize: new THREE.Uniform(500), // needs the THREE.Uniform object
                uResolution: new THREE.Uniform(sizes.resolution),
                uTexture: new THREE.Uniform(texture),
                uColor: new THREE.Uniform(color),
                uProgress: new THREE.Uniform(0),
                uSparkDuration: new THREE.Uniform(0.5)
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        const points = new THREE.Points(geometry, material)
        points.position.copy(new THREE.Vector3(0,0,0))
        const destroy = () => { // may need to run on component unmount as well
            scene.remove(points)
            geometry.dispose()
            material.dispose()
        }

        gsap.to(
            material.uniforms.uProgress,
            { value: 1, duration, ease: 'linear', onComplete: destroy }
        )

        scene.add(points)
    }
    
    return [CreateShootingStar]
}