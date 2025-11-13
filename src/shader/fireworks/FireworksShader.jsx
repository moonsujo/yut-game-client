import fireworkVertexShader from './vertex.glsl';
import fireworkFragmentShader from './fragment.glsl';
import shapeVertexShader from '../fireworksShape/vertex.glsl'
import shapeFragmentShader from '../fireworksShape/fragment.glsl'
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useGLTF } from '@react-three/drei';
import { generateRandomNumberInRange } from '../../logicHelpers/helpers';
import { getWindowSizes } from '../../hooks/useWindowSize';
import { useMemo } from 'react';

// Cache for textures and models
const fireworkTextureCache = new Map();
const fireworkModelCache = new Map();

function loadFireworkTexture(path) {
  if (!fireworkTextureCache.has(path)) {
    const loader = new TextureLoader();
    fireworkTextureCache.set(path, loader.load(path));
  }
  return fireworkTextureCache.get(path);
}

function loadFireworkModel(path, preload = true) {
  if (!fireworkModelCache.has(path)) {
    const { nodes } = useGLTF(path, preload);
    fireworkModelCache.set(path, nodes);
  }
  return fireworkModelCache.get(path);
}

// radius: how far the particles spread
export function useFireworksShader() {

    const { scene } = useThree();
    
    // Use shared sizes object - no resize listener needed
    const sizes = getWindowSizes();
    
    // Cache textures
    const fireworkTextures = useMemo(() => [
        loadFireworkTexture('/textures/particles/3.png'),
        loadFireworkTexture('/textures/particles/5.png'),
        loadFireworkTexture('/textures/particles/6.png'),
        loadFireworkTexture('/textures/particles/8.png'),
    ], []);
    
    // Cache models
    const ariesModel = useMemo(() => ({ nodes: loadFireworkModel('/models/aries-constellation-thin.glb', false) }), []);
    const bullModel = useMemo(() => ({ nodes: loadFireworkModel('/models/bull-constellation-thin.glb') }), []);
    const rhinoModel = useMemo(() => ({ nodes: loadFireworkModel('/models/rhino-constellation-thin.glb') }), []);
    const wolfModel = useMemo(() => ({ nodes: loadFireworkModel('/models/wolf-constellation-thin-3.glb') }), []);
    const planetModel = useMemo(() => ({ nodes: loadFireworkModel('/models/planet-joined.glb') }), []);

    function CreateFirework({count, position, size, radius, color, type='regular'}) {

        let geometry
        let material
        let texture

        if (type==='regular') {
            geometry = new THREE.BufferGeometry()
            const texture = fireworkTextures[Math.floor(Math.random() * fireworkTextures.length)]
            const positionsArray = new Float32Array(count * 3)
            const sizesArray = new Float32Array(count)
            const timeMultipliersArray = new Float32Array(count)

            // set positions randomly in a sphere
            for (let i = 0; i < count; i++) {
                const i3 = i * 3

                const spherical = new THREE.Spherical(
                    radius * (0.8 + Math.random() * 0.2),
                    Math.random() * Math.PI,
                    Math.random() * Math.PI * 2
                )
                const position = new THREE.Vector3()
                position.setFromSpherical(spherical)

                positionsArray[i3] = position.x
                positionsArray[i3+1] = position.y
                positionsArray[i3+2] = position.z

                sizesArray[i] = 0.5
                // sizesArray[i] = Math.random()

                timeMultipliersArray[i] = 1 + Math.random()
            }

            texture.flipY = false;

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
            geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
            geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1));
            material = new THREE.ShaderMaterial({
                vertexShader: fireworkVertexShader,
                fragmentShader: fireworkFragmentShader,
                uniforms: {
                    uSize: new THREE.Uniform(size), // needs the THREE.Uniform object
                    uResolution: new THREE.Uniform(sizes.resolution),
                    uTexture: new THREE.Uniform(texture),
                    uColor: new THREE.Uniform(color),
                    uProgress: new THREE.Uniform(0)
                },
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                depthTest: true
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
                { value: 1, duration: 3, ease: 'linear', onComplete: destroy }
            )

            scene.add(points)

        } else if (type==='constellation') {
            let nodes, geometry
            let shape = Math.random()
            // restore original models
            // background stars
            if (shape < 0.25) {
                nodes = ariesModel.nodes
                geometry = nodes.BezierCurve001.geometry
            } else if (shape < 0.5) {
                nodes = bullModel.nodes
                geometry = nodes.BezierCurve001.geometry
            } else if (shape < 0.75) {
                nodes = rhinoModel.nodes
                geometry = nodes.rhino.geometry
            } else {
                nodes = wolfModel.nodes
                geometry = nodes.wolf.geometry
            }
            
            texture = fireworkTextures[0]
            texture.flipY = false;
            let colorConstellation = new THREE.Color(color.r * 0.1, color.g * 0.15, color.b * 0.15)
            material = new THREE.ShaderMaterial({
                vertexShader: shapeVertexShader,
                fragmentShader: shapeFragmentShader,
                uniforms: {
                    uSize: new THREE.Uniform(size * 0.5), // needs the THREE.Uniform object
                    uResolution: new THREE.Uniform(sizes.resolution),
                    uTexture: new THREE.Uniform(texture),
                    uColor: new THREE.Uniform(colorConstellation),
                    uProgress: new THREE.Uniform(0)
                },
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            })

            const points = new THREE.Points(geometry, material)
            points.position.copy(position)
            
            let randomRotation = generateRandomNumberInRange(0, Math.PI/16)
            points.rotation.copy(new THREE.Euler(0, randomRotation, randomRotation))
            let scale = radius * 0.3 + 0.4
            // let scale = Math.random() * 0.4 + 0.4
            points.scale.copy(new THREE.Vector3(scale, scale, scale))
            const destroy = () => { // may need to run on component unmount as well
                scene.remove(points)
                geometry.dispose()
                material.dispose()
            }

            gsap.to(
                material.uniforms.uProgress,
                { value: 1, duration: 3, ease: 'linear', onComplete: destroy }
            )

            scene.add(points)
        } else if (type === 'planet') { // refactor to use the constellation shader
            let nodes, geometry;
            nodes = planetModel.nodes;
            geometry = nodes.Sphere002.geometry
            texture = fireworkTextures[0]
            texture.flipY = false;
            let colorPlanet = new THREE.Color(color.r * 0.15, color.g * 0.15, color.b * 0.15)
            material = new THREE.ShaderMaterial({
                vertexShader: shapeVertexShader,
                fragmentShader: shapeFragmentShader,
                uniforms: {
                    uSize: new THREE.Uniform(size * 0.3), // needs the THREE.Uniform object
                    uResolution: new THREE.Uniform(sizes.resolution),
                    uTexture: new THREE.Uniform(texture),
                    uColor: new THREE.Uniform(colorPlanet),
                    uProgress: new THREE.Uniform(0)
                },
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            })

            const points = new THREE.Points(geometry, material)
            points.position.copy(position)
            
            let randomRotation = generateRandomNumberInRange(Math.PI/16, Math.PI/32)
            points.rotation.copy(new THREE.Euler(
                randomRotation - Math.PI/2, 
                0, 
                randomRotation
            ))
            let scale = radius * 0.3 + 0.4
            points.scale.copy(new THREE.Vector3(scale, scale, scale))
            const destroy = () => { // may need to run on component unmount as well
                scene.remove(points)
                geometry.dispose()
                material.dispose()
            }

            gsap.to(
                material.uniforms.uProgress,
                { value: 1, duration: 3, ease: 'linear', onComplete: destroy }
            )

            scene.add(points)
        }
    }

    return [CreateFirework];
}