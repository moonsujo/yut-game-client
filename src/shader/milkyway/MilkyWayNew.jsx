import React, {useRef, useMemo} from 'react'
import {useFrame, useThree, useLoader} from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import { useAtomValue } from 'jotai'
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

export default function MilkyWayNew(props) {
    const meshRef = useRef();
    const secondMeshRef = useRef();
    const thirdMeshRef = useRef();
    
        // Load textures with react-three-fiber's loader so they're cached across renders
        const sky = useLoader(THREE.TextureLoader, '/textures/star.jpg');
        const sky2 = useLoader(THREE.TextureLoader, '/textures/Marbles.jpg');
        const sky3 = useLoader(THREE.TextureLoader, '/textures/Marbles.jpg');

        // Setup wrapping/repeat once (textures are stable thanks to useLoader)
        useMemo(() => {
            sky.wrapS = THREE.RepeatWrapping;
            sky.wrapT = THREE.RepeatWrapping;
            sky2.wrapS = THREE.RepeatWrapping;
            sky2.wrapT = THREE.RepeatWrapping;
            sky3.wrapS = THREE.RepeatWrapping;
            sky3.wrapT = THREE.RepeatWrapping;
            sky3.repeat.set(4, 4);
            return null;
        }, [sky, sky2, sky3]);

    const milkyWayUniform = useMemo(
        () => ({
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            texture1: { type: "t", value: sky2 },
            colorTint: { value: new THREE.Vector4(props.colorTint1.x * props.brightness, props.colorTint1.y * props.brightness, props.colorTint1.z * props.brightness, props.colorTint1.w * props.brightness) }
        }), [props.brightness, sky2, props.colorTint1]);

    const milkyWayUniformSecondLayer = useMemo(
        () => ({
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            texture1: { type: "t", value: sky3 },
            colorTint: { value: new THREE.Vector4(props.colorTint2.x * props.brightness, props.colorTint2.y * props.brightness, props.colorTint2.z * props.brightness, props.colorTint2.w * props.brightness) }
        }), [props.brightness, sky3, props.colorTint2]);

    const milkyWayUniformThirdLayer = useMemo(
        () => ({
            time: { value: 0 },
            resolution: { value: new THREE.Vector4() },
            texture1: { type: "t", value: sky },
            colorTint: { value: new THREE.Vector4(props.colorTint3.x * props.brightness, props.colorTint3.y * props.brightness, props.colorTint3.z * props.brightness, props.colorTint3.w * props.brightness) }
        }), [props.brightness, sky, props.colorTint3]);

        // Memoize materials so they are not recreated on every render — this keeps
        // animation refs stable across rerenders.
        const MaterialMilkyWay = useMemo(() => {
            return new THREE.ShaderMaterial({
                extensions: {
                    derivatives: "extension GL_OES_standard_derivatives : enable"
                },
                side: THREE.DoubleSide,
                transparent: true,
                uniforms: milkyWayUniform,
                vertexShader,
                fragmentShader,
            })
        }, [milkyWayUniform, vertexShader, fragmentShader]);

        const MaterialMilkyWaySecondLayer = useMemo(() => {
            return new THREE.ShaderMaterial({
                extensions: {
                    derivatives: "extension GL_OES_standard_derivatives : enable"
                },
                side: THREE.DoubleSide,
                transparent: true,
                uniforms: milkyWayUniformSecondLayer,
                vertexShader,
                fragmentShader,
            })
        }, [milkyWayUniformSecondLayer, vertexShader, fragmentShader]);

        const MaterialMilkyWayThirdLayer = useMemo(() => {
            return new THREE.ShaderMaterial({
                extensions: {
                    derivatives: "extension GL_OES_standard_derivatives : enable"
                },
                side: THREE.DoubleSide,
                transparent: true,
                uniforms: milkyWayUniformThirdLayer,
                vertexShader,
                fragmentShader,
            })
        }, [milkyWayUniformThirdLayer, vertexShader, fragmentShader]);


        // Update the uniform time each frame. Guard refs in case the mesh is not
        // mounted yet; materials are memoized so uniforms remain valid across
        // rerenders.
        useFrame((state) => {
            const t = state.clock.getElapsedTime() / 0.5;
            if (meshRef.current && meshRef.current.material && meshRef.current.material.uniforms) {
                meshRef.current.material.uniforms.time.value = t;
            }
            if (secondMeshRef.current && secondMeshRef.current.material && secondMeshRef.current.material.uniforms) {
                secondMeshRef.current.material.uniforms.time.value = t;
            }
            if (thirdMeshRef.current && thirdMeshRef.current.material && thirdMeshRef.current.material.uniforms) {
                thirdMeshRef.current.material.uniforms.time.value = t;
            }
        });
   
    return <>
        <mesh 
            {...props}
            ref={meshRef}
        >
            <planeGeometry args={[5.5,5.5,32]}/>
            <primitive object={MaterialMilkyWay} attach="material" ref={undefined} depthWrite={false} />
                <mesh
                    ref={secondMeshRef}
                    scale={[3.0, 2.5, 2.5]}
                    position={[0.0, 0.0, -0.3 ]}
                >
                    <planeGeometry args={[5.5, 5.5, 32]} />
                    <primitive object={MaterialMilkyWaySecondLayer} attach="material" depthWrite={false} />
                </mesh>
                <mesh
                    ref={thirdMeshRef}
                    scale={[3.0,2.0,3.0]}
                    position={[0.0, 0.0, -0.1 ]}
                >
                    <planeGeometry args={[5.5, 5.5, 32]} />
                    <primitive object={MaterialMilkyWayThirdLayer} attach="material" depthWrite={false} />
                </mesh>
        </mesh>
    </>
}