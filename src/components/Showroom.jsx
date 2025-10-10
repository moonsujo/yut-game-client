import { Float, Text3D } from "@react-three/drei"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshDistortMaterial } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'
import { useControls } from "leva"

import DoAlert from "../alerts/DoAlert"
import GeAlert from "../alerts/GeAlert"
import GulAlert from "../alerts/GulAlert"
import YootAlert from "../alerts/YootAlert"
import MoAlert from "../alerts/MoAlert"
import BackdoAlert from "../alerts/BackdoAlert"
import OutAlert from "../alerts/OutAlert"
import useStarRoll from "../shader/starRoll/StarRoll"
import useMeteorsShader from "../shader/meteors/useMeteorsShader";
import useSoundEffectsPlayer from "../soundPlayers/useSoundEffectsPlayer"
import { pickRandomElement } from "../helpers/helpers.js";
import { meteorTexturesAtom } from "../GlobalState.jsx";
import { useAtomValue } from "jotai";
import TurnAlert from "../alerts/TurnAlert.jsx";
import CatchUfoEnergyAlert from "../alerts/CatchUfoEnergyAlert.jsx";
import CatchRocketMemeAlert from "../alerts/CatchRocketMemeAlert.jsx";
import PregameTieAlert from "../alerts/PregameTieAlert.jsx";
import PregameUfosWinAlert from "../alerts/PregameUfosWinAlert.jsx";
import PregameRocketsWinAlert from "../alerts/PregameRocketsWinAlert.jsx";
import Board from "../Board.jsx";
import Moon from "../meshes/Moon.jsx";
import Rocket from "../meshes/Rocket.jsx";
import Ufo from "../meshes/Ufo.jsx";
import Star from "../meshes/Star.jsx";
import Constellation from "../shader/constellation/Constellation.jsx";
import ScoreAlert from "../alerts/ScoreAlert.jsx";
import { useFireworksShader } from "../shader/fireworks/FireworksShader.jsx";
import Earth from "../meshes/Earth.jsx";

import FragmentShaderBeam2 from '../shader/beamShaderSimple/fragment.glsl'
import VertexShaderBeam2 from '../shader/beamShaderSimple/vertex.glsl'
import gsap from "gsap";
import Wolf from "../meshes/Wolf.jsx";
import CyberTruck from "../meshes/CyberTruck.jsx";
import Barn from "../meshes/Barn.jsx";
import { Llama } from "../meshes/Llama.jsx";
import Ruby from "../meshes/Ruby.jsx";
import RocketsWin2Preview from "../endScenes/RocketsWin2Preview.jsx";

export default function Showroom(props) {
    const [display, setDisplay] = useState('yutOutcomes')
    const [endScene, setEndScene] = useState(null)
    const setHomeDisplay = props.setHomeDisplay
    const [RollStar] = useStarRoll();
    const [CreateMeteor] = useMeteorsShader();
    const { playSoundEffect } = useSoundEffectsPlayer()
    const meteorTextures = useAtomValue(meteorTexturesAtom)

    // helper function
    function CreateMoMeteor() {
        const count = Math.round(400 + Math.random() * 1000);
        const position = new THREE.Vector3(
            (Math.random()-0.5) * 7 + 3, 
            8.0,
            (Math.random()-0.5) * 10 + 4.0, 
        )
        const size = 0.15 + Math.random() * 0.1
        const texture = meteorTextures[Math.floor(Math.random() * meteorTextures.length)]
        // color is determined in the fragment shader with the burn progress
        const color = new THREE.Color();
        const speedX = 4.0 + Math.random() * 1.0
        const speedY = 2.0 + Math.random() * 0.6
        color.setHSL(1.0, 1.0, 1.0)
        CreateMeteor({
            count,
            position,
            size,
            texture,
            color,
            speedX,
            speedY
        })
    }

    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
    const [curtainSprings, curtainSpringApi] = useSpring(() => ({        
        from: {
            opacity: 0, 
        }
    }))
    function YutOutcomesButton(props) {
        
        const [hover, setHover] = useState(false)
        function onPointerEnter(e) {
            e.stopPropagation()
            setHover(true)
            document.body.style.cursor = 'pointer';
        }
        function onPointerLeave(e) {
            e.stopPropagation()
            setHover(false)
            document.body.style.cursor = 'default';
        }
        function onPointerDown(e) {
            e.stopPropagation()
            setDisplay('yutOutcomes')
        }

        return <group {...props}>
            <mesh>
                <boxGeometry args={[3.2, 0.03, 0.55]}/>
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh>
                <boxGeometry args={[3.15, 0.04, 0.5]}/>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh 
                name='wrapper' 
                onPointerEnter={e => onPointerEnter(e)}
                onPointerLeave={e => onPointerLeave(e)}
                onPointerDown={e => onPointerDown(e)}
            >
                <boxGeometry args={[3.2, 0.04, 0.55]}/>
                <meshStandardMaterial transparent opacity={0}/>
            </mesh>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[-1.45, 0.02, 0.15]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                YUT OUTCOMES
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </Text3D>
        </group>
    }
    // enable adding a custom name
    // play animation with button
    function NewTurnButton(props) {
        const [hover, setHover] = useState(false)
        function onPointerEnter(e) {
            e.stopPropagation()
            setHover(true)
            document.body.style.cursor = 'pointer';
        }
        function onPointerLeave(e) {
            e.stopPropagation()
            setHover(false)
            document.body.style.cursor = 'default';
        }
        function onPointerDown(e) {
            e.stopPropagation()
            setDisplay('newTurn')
        }
        return <group {...props}>
            <mesh>
                <boxGeometry args={[2.3, 0.03, 0.55]}/>
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh>
                <boxGeometry args={[2.25, 0.04, 0.5]}/>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh 
                name='wrapper' 
                onPointerEnter={e => onPointerEnter(e)}
                onPointerLeave={e => onPointerLeave(e)}
                onPointerDown={e => onPointerDown(e)}
            >
                <boxGeometry args={[2.2, 0.04, 0.55]}/>
                <meshStandardMaterial transparent opacity={0}/>
            </mesh>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[-1.0, 0.02, 0.15]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                NEW TURN
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </Text3D>
        </group>
    }
    function CatchButton(props) {
        const [hover, setHover] = useState(false)
        function onPointerEnter(e) {
            e.stopPropagation()
            setHover(true)
            document.body.style.cursor = 'pointer';
        }
        function onPointerLeave(e) {
            e.stopPropagation()
            setHover(false)
            document.body.style.cursor = 'default';
        }
        function onPointerDown(e) {
            e.stopPropagation()
            setDisplay('catch')
        }
        return <group {...props}>
            <mesh>
                <boxGeometry args={[1.5, 0.03, 0.55]}/>
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh>
                <boxGeometry args={[1.45, 0.04, 0.5]}/>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh 
                name='wrapper' 
                onPointerEnter={e => onPointerEnter(e)}
                onPointerLeave={e => onPointerLeave(e)}
                onPointerDown={e => onPointerDown(e)}
            >
                <boxGeometry args={[1.5, 0.04, 0.55]}/>
                <meshStandardMaterial transparent opacity={0}/>
            </mesh>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[-0.6, 0.05, 0.15]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                CATCH
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </Text3D>
        </group>
    }
    function PregameButton(props) {
        const [hover, setHover] = useState(false)
        function onPointerEnter(e) {
            e.stopPropagation()
            setHover(true)
            document.body.style.cursor = 'pointer';
        }
        function onPointerLeave(e) {
            e.stopPropagation()
            setHover(false)
            document.body.style.cursor = 'default';
        }
        function onPointerDown(e) {
            e.stopPropagation()
            setDisplay('pregame')
        }
        return <group {...props}>
            <mesh>
                <boxGeometry args={[2.1, 0.03, 0.55]}/>
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh>
                <boxGeometry args={[2.05, 0.04, 0.5]}/>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh 
                name='wrapper' 
                onPointerEnter={e => onPointerEnter(e)}
                onPointerLeave={e => onPointerLeave(e)}
                onPointerDown={e => onPointerDown(e)}
            >
                <boxGeometry args={[2.1, 0.04, 0.55]}/>
                <meshStandardMaterial transparent opacity={0}/>
            </mesh>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[-0.9, 0.05, 0.15]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                PREGAME
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </Text3D>
        </group>
    }
    function ScoreButton(props) {
        const [hover, setHover] = useState(false)
        function onPointerEnter(e) {
            e.stopPropagation()
            setHover(true)
            document.body.style.cursor = 'pointer';
        }
        function onPointerLeave(e) {
            e.stopPropagation()
            setHover(false)
            document.body.style.cursor = 'default';
        }
        function onPointerDown(e) {
            e.stopPropagation()
            setDisplay('score')
        }
        return <group {...props}>
            <mesh>
                <boxGeometry args={[1.5, 0.03, 0.55]}/>
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh>
                <boxGeometry args={[1.45, 0.04, 0.5]}/>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh 
                name='wrapper' 
                onPointerEnter={e => onPointerEnter(e)}
                onPointerLeave={e => onPointerLeave(e)}
                onPointerDown={e => onPointerDown(e)}
            >
                <boxGeometry args={[2.1, 0.04, 0.55]}/>
                <meshStandardMaterial transparent opacity={0}/>
            </mesh>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[-0.6, 0.05, 0.15]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                SCORE
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </Text3D>
        </group>
    }
    // background dim
    // on 'effect' button click
    // fill opacity on curtain
    // pop out alert
    // play effects
    // withdraw curtain and alert
    // restore alert using "onStart" and "onRest" of react-spring
    // make default alert render conditionally based on state
    // add state
    function YutOutcomes(props) {
        function YutEffectButton(props) {
            const [hover, setHover] = useState(false)
            function onPointerEnter(e) {
                e.stopPropagation()
                setHover(true)
                document.body.style.cursor = 'pointer';
            }
            function onPointerLeave(e) {
                e.stopPropagation()
                setHover(false)
                document.body.style.cursor = 'default';
            }
            function onPointerDown(e) {
                e.stopPropagation()
                const count0 = 16
                // big stars
                for (let i = 0; i < count0; i++) {
                
                    // need a THREE.Vector3 for position
                    const position = new THREE.Vector3(
                        (Math.random() - 0.5) * 15 + 2, 
                        8,
                        (Math.random() - 0.5) * 15, 
                    )
                    
                    const rotation = new THREE.Vector3(
                        Math.PI/3, 
                        0,
                        0, 
                    )
                    
                    const omitFactor = 4
                    const size = 0.001 // particle size
                    const scale = 0.4 + Math.random() * 0.7 // star size
                    const color = new THREE.Color();
                    color.setHSL(0.5 + Math.random() * 0.05, 1, 0.5);
                    const duration = 2.0
                    const speedX = -(8 + Math.random() * 4)
                    const speedY = 4 + Math.random() * 2
                    setTimeout(() => {
                        RollStar({ position, rotation, duration, omitFactor, size, scale, color, speedX, speedY })
                    }, i * 50)
                }
                // small stars
                // reduced omit count to make them less brighter
                // delayed start
                const count1 = 16
                for (let i = 0; i < count1; i++) {
                
                    // need a THREE.Vector3 for position
                    const position = new THREE.Vector3(
                        (Math.random() - 0.5) * 15 + 2, 
                        8,
                        (Math.random() - 0.5) * 15, 
                    )
                    
                    const rotation = new THREE.Vector3(
                        Math.PI/3, 
                        0,
                        0, 
                    )
                    
                    const omitFactor = 6
                    const size = 0.0008 // particle size
                    const scale = 0.1 + Math.random() * 0.3 // star size
                    const color = new THREE.Color();
                    color.setHSL(0.5 + Math.random() * 0.05, 1, 0.5);
                    const duration = 2.0
                    const speedX = -(8 + Math.random() * 4)
                    const speedY = 4 + Math.random() * 2
                    setTimeout(() => {
                        RollStar({ position, rotation, duration, omitFactor, size, scale, color, speedX, speedY })
                    }, i * 50 + 200)
                }
                // play sound effect
                const yutSoundFilePaths = [
                    '/sounds/effects/yutThrows/produced/yut!.mp3',
                    '/sounds/effects/yutThrows/produced/yuuuuuuuut.mp3',
                ]
                playSoundEffect(pickRandomElement(yutSoundFilePaths), 1)
                // draw curtain
                curtainSpringApi.start({
                    from: {
                        opacity: 0
                    },
                    to: [
                        {
                            opacity: 0.5
                        },
                        { 
                            opacity: 0,
                            delay: 1500,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        }
                    ]
                })
            }
            return <group name='effect-button' {...props}>
                <mesh>
                    <boxGeometry args={[0.9, 0.03, 0.55]}/>
                    <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                </mesh>
                <mesh>
                    <boxGeometry args={[0.85, 0.04, 0.5]}/>
                    <meshStandardMaterial color='black'/>
                </mesh>
                <mesh 
                    name='wrapper' 
                    onPointerEnter={e => onPointerEnter(e)}
                    onPointerLeave={e => onPointerLeave(e)}
                    onPointerDown={e => onPointerDown(e)}
                >
                    <boxGeometry args={[1.5, 0.1, 0.55]}/>
                    <meshStandardMaterial transparent opacity={0}/>
                </mesh>
                <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                    <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                </mesh>
            </group>
        }
        function MoEffectButton(props) {
            // on click effect
            // add shooting stars to rolling stars
            const [hover, setHover] = useState(false)
            function onPointerEnter(e) {
                e.stopPropagation()
                setHover(true)
                document.body.style.cursor = 'pointer';
            }
            function onPointerLeave(e) {
                e.stopPropagation()
                setHover(false)
                document.body.style.cursor = 'default';
            }
            function onPointerDown(e) {
                e.stopPropagation()
                // visual effects
                // shiny shooting stars
                // meteors
                const count0 = 16
                // big stars
                for (let i = 0; i < count0; i++) {
                
                    // need a THREE.Vector3 for position
                    const position = new THREE.Vector3(
                        (Math.random() - 0.5) * 15 + 2, 
                        8.0,
                        (Math.random() - 0.5) * 15 + 2, 
                    )
                    
                    const rotation = new THREE.Vector3(
                        Math.PI/3, 
                        0,
                        0, 
                    )
                    
                    const omitFactor = 4
                    const size = 0.001 // particle size
                    const scale = 0.4 + Math.random() * 0.7 // star size
                    const color = new THREE.Color();
                    color.setHSL(0.5 + Math.random() * 0.05, 1, 0.5);
                    const duration = 2.0
                    const speedX = -(8 + Math.random() * 4)
                    const speedY = 4 + Math.random() * 2
                    setTimeout(() => {
                        RollStar({ position, rotation, duration, omitFactor, size, scale, color, speedX, speedY, shiny: true })
                    }, i * 50)
                }
                // small stars
                // reduced omit count to make them less brighter
                // delayed start
                const count1 = 16
                for (let i = 0; i < count1; i++) {
                
                    // need a THREE.Vector3 for position
                    const position = new THREE.Vector3(
                        (Math.random() - 0.5) * 15 + 2, 
                        8.0,
                        (Math.random() - 0.5) * 15 + 2, 
                    )
                    
                    const rotation = new THREE.Vector3(
                        Math.PI/3, 
                        0,
                        0, 
                    )
                    
                    const omitFactor = 6
                    const size = 0.0008 // particle size
                    const scale = 0.1 + Math.random() * 0.3 // star size
                    const color = new THREE.Color();
                    color.setHSL(0.5 + Math.random() * 0.05, 1, 0.5);
                    const duration = 2.0
                    const speedX = -(8 + Math.random() * 4)
                    const speedY = 4 + Math.random() * 2
                    setTimeout(() => {
                        RollStar({ position, rotation, duration, omitFactor, size, scale, color, speedX, speedY, shiny: true })
                    }, i * 50 + 200)
                }

                const meteorCount = 9
                for (let i = 0; i < meteorCount; i++) {
                    setTimeout(() => {
                        console.log('timeout')
                        CreateMoMeteor()
                    }, i * 50)
                }

                // play sound effect
                const moSoundFilePaths = [
                    '/sounds/effects/yutThrows/produced/mo!.mp3',
                    '/sounds/effects/yutThrows/produced/mooooooo.mp3',
                ]
                
                playSoundEffect(pickRandomElement(moSoundFilePaths), 1)

                // draw curtain
                curtainSpringApi.start({
                    from: {
                        opacity: 0
                    },
                    to: [
                        {
                            opacity: 0.5
                        },
                        { 
                            opacity: 0,
                            delay: 1500,
                            config: {
                                tension: 170,
                                friction: 26
                            }
                        }
                    ]
                })
            }
            return <group name='effect-button' {...props}>
                <mesh>
                    <boxGeometry args={[0.9, 0.03, 0.55]}/>
                    <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                </mesh>
                <mesh>
                    <boxGeometry args={[0.85, 0.04, 0.5]}/>
                    <meshStandardMaterial color='black'/>
                </mesh>
                <mesh 
                    name='wrapper' 
                    onPointerEnter={e => onPointerEnter(e)}
                    onPointerLeave={e => onPointerLeave(e)}
                    onPointerDown={e => onPointerDown(e)}
                >
                    <boxGeometry args={[1.5, 0.1, 0.55]}/>
                    <meshStandardMaterial transparent opacity={0}/>
                </mesh>
                <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                    <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                </mesh>
            </group>
        }
        return <group {...props}>
            <group name='do-alert' position={[-8, 0, -5]} scale={0.9}>
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.5}
                    height={0.01}
                >
                    DO
                    <meshStandardMaterial color='yellow'/>
                </Text3D>
                <DoAlert position={[1.5, 0, 1.5]} rotation={[0, Math.PI/2, 0]}/>
            </group>
            <group name='ge-alert' position={[-4, 0, -5]} scale={0.9}>
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.5}
                    height={0.01}
                >
                    GE
                    <meshStandardMaterial color='yellow'/>
                </Text3D>
                <GeAlert position={[1.5, 0, 1.5]} rotation={[0, Math.PI/2, 0]}/>
            </group>
            <group name='gul-alert' position={[0, 0, -5]} scale={0.9}>
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.5}
                    height={0.01}
                >
                    GUL
                    <meshStandardMaterial color='yellow'/>
                </Text3D>
                <GulAlert position={[1.5, 0, 1.5]} rotation={[0, Math.PI/2, 0]}/>
            </group>
            <group name='yut-alert' position={[-8, 0, -1.8]} >
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.5}
                    height={0.01}
                >
                    YUT
                    <meshStandardMaterial color='yellow'/>
                </Text3D>
                <YutEffectButton position={[2, 0, -0.21]}/>
                <YootAlert position={[2, 0, 2]} rotation={[0, Math.PI/2, 0]} scale={0.7}/>
            </group>
            <group name='mo-alert' position={[-2, 0, -1.8]}>
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.5}
                    height={0.01}
                >
                    MO
                    <meshStandardMaterial color='yellow'/>
                </Text3D>
                <MoEffectButton position={[1.7, 0, -0.21]}/>
                <MoAlert position={[2, 0, 2]} rotation={[0, Math.PI/2, 0]}  scale={0.7}/>
            </group>
            <group name='backdo-alert' position={[-8, 0, 3]} scale={0.9}>
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.5}
                    height={0.01}
                >
                    BACKDO
                    <meshStandardMaterial color='yellow'/>
                </Text3D>
                <BackdoAlert position={[1.5, 0, 1.5]} rotation={[0, Math.PI/2, 0]}/>
            </group>
            <group name='nak-alert' position={[-2, 0, 3]} scale={0.9}>
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.5}
                    height={0.01}
                >
                    NAK (OUT)
                    <meshStandardMaterial color='yellow'/>
                </Text3D>
                <OutAlert position={[3, 0, 1.5]} rotation={[0, Math.PI/2, 0]}/>
            </group>
        </group>
    }
    function NewTurn(props) {
        const [alertSprings, alertSpringApi] = useSpring(() => ({
            from: {
                scale: 0
            }
        }))
        const [playing, setPlaying] = useState(false)
        function PlayAnimationButton(props) {
            const [hover, setHover] = useState(false)
            function onPointerEnter(e) {
                e.stopPropagation()
                setHover(true)
                document.body.style.cursor = 'pointer';
            }
            function onPointerLeave(e) {
                e.stopPropagation()
                setHover(false)
                document.body.style.cursor = 'default';
            }
            function onPointerDown(e) {
                e.stopPropagation()
                // play spring api
                alertSpringApi.start({
                    from: {
                        scale: 0
                    },
                    to: [
                        {
                            scale: 1,
                            // if not set, animation plays quickly on the second time
                            config: {
                                tension: 170,
                                friction: 26,
                                clamp: true
                            },
                        },
                        {
                            scale: 0,
                            config: {
                                tension: 300,
                                friction: 26,
                                clamp: true
                            },
                            delay: 700
                        }
                    ],
                    onStart: () => { setPlaying(true) },
                    onRest: () => { 
                        // if not set, alert restores immediately
                        setTimeout(() => {
                            setPlaying(false) 
                        }, 500)
                    }
                })
            }
            return <group {...props}>
                <mesh>
                    <boxGeometry args={[1.2, 0.03, 0.75]}/>
                    <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                </mesh>
                <mesh>
                    <boxGeometry args={[1.15, 0.04, 0.7]}/>
                    <meshStandardMaterial color='black'/>
                </mesh>
                <mesh 
                    name='wrapper' 
                    onPointerEnter={e => onPointerEnter(e)}
                    onPointerLeave={e => onPointerLeave(e)}
                    onPointerDown={e => onPointerDown(e)}
                >
                    <boxGeometry args={[1.65, 0.04, 0.75]}/>
                    <meshStandardMaterial transparent opacity={0}/>
                </mesh>
                <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                    <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                </mesh>
            </group>
        }
        return <group {...props}>
            <animated.group scale={alertSprings.scale}><TurnAlert name='albert' rotation={[0, Math.PI/2, 0]}/></animated.group>
            { !playing && <TurnAlert name='albert' rotation={[0, Math.PI/2, 0]}/> }
            <PlayAnimationButton position={[0, 0, 3]}/>
        </group>
    }
    function Catch(props) {
        function RocketsCatchUfo() {
            const [ufoEnergyAlertSprings, ufoEnergyAlertSpringApi] = useSpring(() => ({
                from: {
                    scale: 0
                }
            }))
            const [ufoEnergyAlertPlaying, setUfoEnergyAlertPlaying] = useState(false)
            function PlayUfoEnergyAlertButton(props) {
                const [hover, setHover] = useState(false)
                function onPointerEnter(e) {
                    e.stopPropagation()
                    setHover(true)
                    document.body.style.cursor = 'pointer';
                }
                function onPointerLeave(e) {
                    e.stopPropagation()
                    setHover(false)
                    document.body.style.cursor = 'default';
                }
                function onPointerDown(e) {
                    e.stopPropagation()
                    // play sound effect
                    playSoundEffect('/sounds/effects/capture.mp3', 1)
                    ufoEnergyAlertSpringApi.start({
                        from: {
                            scale: 0
                        },
                        to: [
                            {
                                scale: 1,
                                // if not set, animation plays quickly on the second time
                                config: {
                                    tension: 170,
                                    friction: 26,
                                    clamp: true
                                },
                            },
                            {
                                scale: 0,
                                config: {
                                    tension: 300,
                                    friction: 26,
                                    clamp: true
                                },
                                delay: 700
                            }
                        ],
                        onStart: () => { setUfoEnergyAlertPlaying(true) },
                        onRest: () => { 
                            // if not set, alert restores immediately
                            setTimeout(() => {
                                setUfoEnergyAlertPlaying(false) 
                            }, 500)
                        }
                    })
                }
                return <group {...props}>
                    <mesh>
                        <boxGeometry args={[1.2, 0.03, 0.75]}/>
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                    <mesh>
                        <boxGeometry args={[1.15, 0.04, 0.7]}/>
                        <meshStandardMaterial color='black'/>
                    </mesh>
                    <mesh 
                        name='wrapper' 
                        onPointerEnter={e => onPointerEnter(e)}
                        onPointerLeave={e => onPointerLeave(e)}
                        onPointerDown={e => onPointerDown(e)}
                    >
                        <boxGeometry args={[1.65, 0.04, 0.75]}/>
                        <meshStandardMaterial transparent opacity={0}/>
                    </mesh>
                    <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                </group>
            }
            return <group>
                <animated.group position={[-5.5, 0, 0]} scale={ufoEnergyAlertSprings.scale}><CatchUfoEnergyAlert  rotation={[0, Math.PI/2, 0]} scale={1.1}/></animated.group>
                { !ufoEnergyAlertPlaying && <CatchUfoEnergyAlert position={[-5.5, 0, 0]} rotation={[0, Math.PI/2, 0]} scale={1.1}/> }
                <PlayUfoEnergyAlertButton position={[-5.5, 0, 3.5]}/>
            </group>
        }
        
        function UfosCatchRocket() {
            const [rocketMemeAlertSprings, rocketMemeAlertSpringApi] = useSpring(() => ({
                from: {
                    scale: 0
                }
            }))
            const [rocketMemeAlertPlaying, setRocketMemeAlertPlaying] = useState(false)
            function PlayRocketMemeAlertButton(props) {
                const [hover, setHover] = useState(false)
                function onPointerEnter(e) {
                    e.stopPropagation()
                    setHover(true)
                    document.body.style.cursor = 'pointer';
                }
                function onPointerLeave(e) {
                    e.stopPropagation()
                    setHover(false)
                    document.body.style.cursor = 'default';
                }
                function onPointerDown(e) {
                    e.stopPropagation()
                    // play sound effect
                    playSoundEffect('/sounds/effects/capture.mp3', 1)
                    rocketMemeAlertSpringApi.start({
                        from: {
                            scale: 0
                        },
                        to: [
                            {
                                scale: 1,
                                // if not set, animation plays quickly on the second time
                                config: {
                                    tension: 170,
                                    friction: 26,
                                    clamp: true
                                },
                            },
                            {
                                scale: 0,
                                config: {
                                    tension: 300,
                                    friction: 26,
                                    clamp: true
                                },
                                delay: 700
                            }
                        ],
                        onStart: () => { setRocketMemeAlertPlaying(true) },
                        onRest: () => { 
                            // if not set, alert restores immediately
                            setTimeout(() => {
                                setRocketMemeAlertPlaying(false) 
                            }, 500)
                        }
                    })
                }
                return <group {...props}>
                    <mesh>
                        <boxGeometry args={[1.2, 0.03, 0.75]}/>
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                    <mesh>
                        <boxGeometry args={[1.15, 0.04, 0.7]}/>
                        <meshStandardMaterial color='black'/>
                    </mesh>
                    <mesh 
                        name='wrapper' 
                        onPointerEnter={e => onPointerEnter(e)}
                        onPointerLeave={e => onPointerLeave(e)}
                        onPointerDown={e => onPointerDown(e)}
                    >
                        <boxGeometry args={[1.65, 0.04, 0.75]}/>
                        <meshStandardMaterial transparent opacity={0}/>
                    </mesh>
                    <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                </group>
            }

            return <group>
                <animated.group position={[1.5, 0, 0]} scale={rocketMemeAlertSprings.scale}><CatchRocketMemeAlert rotation={[0, Math.PI/2, 0]} scale={1.1}/></animated.group>
                { !rocketMemeAlertPlaying && <CatchRocketMemeAlert position={[1.5, 0, 0]} rotation={[0, Math.PI/2, 0]}/> }
                <PlayRocketMemeAlertButton position={[1.55, 0, 3.5]}/>
            </group>
        }

        return <group {...props}>
            <RocketsCatchUfo/>
            <UfosCatchRocket/>
        </group>
    }
    function Pregame(props) {
        function PregameTieSection(props) {
            const [alertSprings, alertSpringApi] = useSpring(() => ({
                from: {
                    scale: 0
                }
            }))
            const [playing, setPlaying] = useState(false)
            function PlayAnimationButton(props) {
                const [hover, setHover] = useState(false)
                function onPointerEnter(e) {
                    e.stopPropagation()
                    setHover(true)
                    document.body.style.cursor = 'pointer';
                }
                function onPointerLeave(e) {
                    e.stopPropagation()
                    setHover(false)
                    document.body.style.cursor = 'default';
                }
                function onPointerDown(e) {
                    e.stopPropagation()
                    // play spring api
                    alertSpringApi.start({
                        from: {
                            scale: 0
                        },
                        to: [
                            {
                                scale: 1,
                                // if not set, animation plays quickly on the second time
                                config: {
                                    tension: 170,
                                    friction: 26,
                                    clamp: true
                                },
                            },
                            {
                                scale: 0,
                                config: {
                                    tension: 300,
                                    friction: 26,
                                    clamp: true
                                },
                                delay: 700
                            }
                        ],
                        onStart: () => { setPlaying(true) },
                        onRest: () => { 
                            // if not set, alert restores immediately
                            setTimeout(() => {
                                setPlaying(false) 
                            }, 500)
                        }
                    })
                }
                return <group {...props}>
                    <mesh>
                        <boxGeometry args={[1.2, 0.03, 0.75]}/>
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                    <mesh>
                        <boxGeometry args={[1.15, 0.04, 0.7]}/>
                        <meshStandardMaterial color='black'/>
                    </mesh>
                    <mesh 
                        name='wrapper' 
                        onPointerEnter={e => onPointerEnter(e)}
                        onPointerLeave={e => onPointerLeave(e)}
                        onPointerDown={e => onPointerDown(e)}
                    >
                        <boxGeometry args={[1.2, 0.04, 0.75]}/>
                        <meshStandardMaterial transparent opacity={0}/>
                    </mesh>
                    <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                </group>
            }

            return <group {...props}>
                <animated.group scale={alertSprings.scale}><PregameTieAlert rotation={[0, Math.PI/2, 0]}/></animated.group>
                { !playing && <PregameTieAlert rotation={[0, Math.PI/2, 0]}/> }
                <PlayAnimationButton position={[0, 0, 3]}/>
            </group>
        }
        function PregameRocketsWinSection({ scale, position }) {
            const [alertSprings, alertSpringApi] = useSpring(() => ({
                from: {
                    scale: 0
                }
            }))
            const [playing, setPlaying] = useState(false)
            function PlayAnimationButton({ position }) {
                const [hover, setHover] = useState(false)
                function onPointerEnter(e) {
                    setHover(true)
                    document.body.style.cursor = 'pointer';
                }
                function onPointerLeave(e) {
                    setHover(false)
                    document.body.style.cursor = 'default';
                }
                function onPointerDown(e) {
                    console.log('pointer down')
                    // play spring api
                    alertSpringApi.start({
                        from: {
                            scale: 0
                        },
                        to: [
                            {
                                scale: 1,
                                // if not set, animation plays quickly on the second time
                                config: {
                                    tension: 170,
                                    friction: 26,
                                    clamp: true
                                },
                            },
                            {
                                scale: 0,
                                config: {
                                    tension: 300,
                                    friction: 26,
                                    clamp: true
                                },
                                delay: 700
                            }
                        ],
                        onStart: () => { setPlaying(true) },
                        onRest: () => { 
                            // if not set, alert restores immediately
                            setTimeout(() => {
                                setPlaying(false) 
                            }, 500)
                        }
                    })
                }
                return <group position={position}>
                    <mesh>
                        <boxGeometry args={[1.2, 0.03, 0.75]}/>
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                    <mesh>
                        <boxGeometry args={[1.15, 0.04, 0.7]}/>
                        <meshStandardMaterial color='black'/>
                    </mesh>
                    <mesh 
                        name='wrapper' 
                        onPointerEnter={e => onPointerEnter(e)}
                        onPointerLeave={e => onPointerLeave(e)}
                        onPointerDown={e => onPointerDown(e)}
                    >
                        <boxGeometry args={[1.2, 0.05, 0.75]}/>
                        <meshStandardMaterial transparent opacity={0}/>
                    </mesh>
                    <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                </group>
            }

            return <group scale={scale} position={position}>
                <animated.group scale={alertSprings.scale}><PregameRocketsWinAlert rotation={[0, Math.PI/2, 0]}/></animated.group>
                { !playing && <PregameRocketsWinAlert rotation={[0, Math.PI/2, 0]}/> }
                {/* need to raise y to 1. otherwise, clicks won't register consistently */}
                <PlayAnimationButton position={[0, 1, 3.5]}/>
            </group>
        }
        function PregameUfosWinSection({ scale, position }) {
            const [alertSprings, alertSpringApi] = useSpring(() => ({
                from: {
                    scale: 0
                }
            }))
            const [playing, setPlaying] = useState(false)
            function PlayAnimationButton({ position }) {

                const [hover, setHover] = useState(false)
                function onPointerEnter(e) {
                    e.stopPropagation()
                    setHover(true)
                    document.body.style.cursor = 'pointer';
                }
                function onPointerLeave(e) {
                    e.stopPropagation()
                    setHover(false)
                    document.body.style.cursor = 'default';
                }
                function onPointerDown(e) {
                    e.stopPropagation()
                    // play spring api
                    alertSpringApi.start({
                        from: {
                            scale: 0
                        },
                        to: [
                            {
                                scale: 1,
                                // if not set, animation plays quickly on the second time
                                config: {
                                    tension: 170,
                                    friction: 26,
                                    clamp: true
                                },
                            },
                            {
                                scale: 0,
                                config: {
                                    tension: 300,
                                    friction: 26,
                                    clamp: true
                                },
                                delay: 700
                            }
                        ],
                        onStart: () => { setPlaying(true) },
                        onRest: () => { 
                            // if not set, alert restores immediately
                            setTimeout(() => {
                                setPlaying(false) 
                            }, 500)
                        }
                    })
                }
                return <group position={position}>
                    <mesh>
                        <boxGeometry args={[1.2, 0.03, 0.75]}/>
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                    <mesh>
                        <boxGeometry args={[1.15, 0.04, 0.7]}/>
                        <meshStandardMaterial color='black'/>
                    </mesh>
                    <mesh 
                        name='wrapper' 
                        onPointerEnter={e => onPointerEnter(e)}
                        onPointerLeave={e => onPointerLeave(e)}
                        onPointerDown={e => onPointerDown(e)}
                    >
                        <boxGeometry args={[1.2, 0.05, 0.75]}/>
                        <meshStandardMaterial transparent opacity={0}/>
                    </mesh>
                    <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                        <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                    </mesh>
                </group>
            }

            return <group scale={scale} position={position}>
                <animated.group scale={alertSprings.scale}><PregameUfosWinAlert rotation={[0, Math.PI/2, 0]}/></animated.group>
                { !playing && <PregameUfosWinAlert rotation={[0, Math.PI/2, 0]}/> }
                {/* need to raise y by 1 to consistently click */}
                {/* wrapping with group with raised y and undoing it in component doesn't work */}
                <PlayAnimationButton position={[0, 1, 3.5]}/>
            </group>
        }
        return <group {...props}>
            <PregameTieSection scale={0.8} position={[-1, 0, 2]}/>
            <PregameRocketsWinSection scale={0.8} position={[-4, 0, -3]}/>
            <PregameUfosWinSection scale={0.8} position={[2, 0, -3]}/>
        </group>
    }

    function PlayAnimationButton({ position, scale, onPointerEnter, onPointerLeave, onPointerDown, hover }) {
        return <group position={position} scale={scale}>
            <mesh>
                <boxGeometry args={[1.2, 0.03, 0.75]}/>
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh>
                <boxGeometry args={[1.15, 0.04, 0.7]}/>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh onPointerEnter={e=>onPointerEnter(e)} onPointerLeave={e=>onPointerLeave(e)} onPointerDown={e=>onPointerDown(e)}>
                <boxGeometry args={[1.2, 0.04, 0.75]}/>
                <meshStandardMaterial color='black' transparent opacity={0}/>
            </mesh>
            <mesh rotation={[0, Math.PI*2/4, 0]} scale={[0.2, 0.01, 0.2]} position={[0, 0.05, 0]}>
                <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
        </group>
    }
    function Score(props) {

        const [CreateFirework] = useFireworksShader();
        function shootFireworks(center, team) {
            
            const hue = team === 0 ? 0.01 : 0.5

            // firework 1 - left
            const count = Math.round(700 + Math.random() * 400);
            const position = new THREE.Vector3(
                center[0] + Math.random()*0.1, 
                center[1],
                center[2]-0.9 + Math.random()*0.2, 
            )
    
            const size = 0.25 + Math.random() * 0.1
            const radius = 1.0 + Math.random() * 0.2
            const color = new THREE.Color();
            color.setHSL(hue, 0.7, 0.5)
    
            CreateFirework({ count, position, size, radius, color });
    
            // firework 2 - right
            setTimeout(() => {
                // setting 2
                const count = Math.round(700 + Math.random() * 300);
                const position = new THREE.Vector3(
                    center[0] + 4 + Math.random()*0.1, 
                    center[1],
                    center[2] - 0.9 + Math.random()*0.2, 
                )
                const size = 0.3 + Math.random() * 0.09
                const radius = 1.0 + Math.random() * 0.2
                const color = new THREE.Color();
                color.setHSL(hue, 0.7, 0.5)
                CreateFirework({ count, position, size, radius, color });
            }, 220)
    
            // firework 3 - middle
            setTimeout(() => {
                const count = Math.round(600 + Math.random() * 400);
                const position = new THREE.Vector3(
                    center[0], 
                    center[1],
                    center[2]-1.9 + Math.random() * 0.1, 
                )
                const size = 0.25 + Math.random() * 0.08
                const radius = 1.2 + Math.random() * 0.4
                const color = new THREE.Color();
                color.setHSL(hue, 0.7, 0.5)
                CreateFirework({ count, position, size, radius, color });
            }, 500)
    
            // firework 4 - upper left
            setTimeout(() => {
                const count = Math.round(600 + Math.random() * 400);
                const position = new THREE.Vector3(
                    center[0] - 2.3 + Math.random() * 0.1, 
                    center[1],
                    center[2] - 3 + Math.random() * 0.1, 
                )
                const size = 0.3 + Math.random() * 0.1
                const radius = 1.3 + Math.random() * 0.2
                const color = new THREE.Color();
                color.setHSL(hue, 0.7, 0.5)
                CreateFirework({ count, position, size, radius, color });
            }, 900)
    
            // firework 5 - upper right
            setTimeout(() => {
                const count = Math.round(600 + Math.random() * 400);
                const position = new THREE.Vector3(
                    center[0]+3 + Math.random() * 0.1, 
                    center[1],
                    center[2]-2.7 + Math.random() * 0.1, 
                )
                const size = 0.2 + Math.random() * 0.08
                const radius = 0.8 + Math.random() * 0.2
                const color = new THREE.Color();
                color.setHSL(hue, 0.7, 0.5)
                CreateFirework({ count, position, size, radius, color });
            }, 1000)
            
            // firework 6 - upper upper left
            setTimeout(() => {
                const count = Math.round(600 + Math.random() * 400);
                const position = new THREE.Vector3(
                    center[0]-4 + Math.random() * 0.3, 
                    center[1],
                    center[2] + Math.random() * 0.3, 
                )
                const size = 0.2 + Math.random() * 0.04
                const radius = 1.0 + Math.random() * 0.2
                const color = new THREE.Color();
                color.setHSL(hue, 0.7, 0.5)
                CreateFirework({ count, position, size, radius, color });
            }, 1210)
        }

        function RocketButton({ scale, position }) {
            
            // animation button props
            const [scoreSprings, scoreSpringApi] = useSpring(() => ({
                from: {
                    rocketScale: 0,
                    rocketPosition: [0,0,0]
                }
            }))
            const [alertSprings, alertSpringApi] = useSpring(() => ({
                from: {
                    alertScale: 0,
                }
            }))
            
            const [hover, setHover] = useState(false)
            const [animationPlaying, setAnimationPlaying] = useState(null)
            useEffect(() => {
                if (animationPlaying === false) {
                    alertSpringApi.start({
                        from: {
                            alertScale: 0
                        },
                        to: [
                            {
                                alertScale: 1.1,
                                config: {
                                    tension: 170,
                                    friction: 26,
                                    clamp: true
                                },
                            },
                            {
                                alertScale: 0,
                                config: {
                                    tension: 300,
                                    friction: 26,
                                    clamp: true
                                },
                                delay: 1000
                            },
                        ],
                        onStart: () => {},
                        onRest: () => {}
                    })
                    shootFireworks([-3, 2, 0], 0)
                }

                return () => {
                    setAnimationPlaying(null)
                }
            }, [animationPlaying])
            function onPointerEnter(e) {
                e.stopPropagation()
                setHover(true)
                document.body.style.cursor = 'pointer';
            }
            function onPointerLeave(e) {
                e.stopPropagation()
                setHover(false)
                document.body.style.cursor = 'default';
            }
            function onPointerDown(e) {
                e.stopPropagation()
                scoreSpringApi.start({
                    from: {
                        rocketScale: 0,
                        rocketPosition: [-7.1, 0, -4.5],
                    },
                    to: [
                        {
                            rocketScale: 1.5,
                            rocketPosition: [-7.1, 2, -3],
                            // if not set, animation plays quickly on the second time
                        },
                        {
                            rocketPosition: [-7.15, 2, -1.1],
                        },
                        {
                            rocketPosition: [-7.15, 2, 0.4],
                        },
                        // score
                        {
                            rocketScale: 2.75,
                            rocketPosition: [-7.15, 5, 0.1],
                        },
                        {
                            rocketScale: 0,
                            rocketPosition: [-7.15, 2, 0.9],
                            delay: 500
                        }
                    ],
                    config: {
                        tension: 170,
                        friction: 26
                    },
                    onStart: () => { setAnimationPlaying(true) },
                    onRest: () => { setAnimationPlaying(false) }
                })
            }
            
            return <group scale={scale} position={position}>
                <Rocket scale={1.6}/>
                <PlayAnimationButton 
                    position={[2, 0, 0]} 
                    onPointerEnter={e => onPointerEnter(e)}
                    onPointerLeave={e => onPointerLeave(e)}
                    onPointerDown={e => onPointerDown(e)}
                    hover={hover}
                />
                <group name='animation-parts' position={[0, 0, 1.5]}>
                    {/* had to put the springs as a parent */}
                    <animated.group scale={scoreSprings.rocketScale} position={scoreSprings.rocketPosition}>
                        <Rocket onBoard/>
                    </animated.group>
                    <animated.group scale={alertSprings.alertScale} position={[-7.1, 3, -4.5]}>
                        <ScoreAlert scale={alertSprings.alertScale} scoringTeam={0}/>
                    </animated.group>
                </group>
            </group>
        }
        function UfoButton({ scale, position }) {
            
            // animation button props
            const [scoreSprings, scoreSpringApi] = useSpring(() => ({
                from: {
                    ufoScale: 0,
                    ufoPosition: [0,0,0],
                    star0Scale: 0,
                    star0Position: [0,0,0]
                }
            }))
            const [alertSprings, alertSpringApi] = useSpring(() => ({
                from: {
                    alertScale: 0,
                }
            }))
            
            const [hover, setHover] = useState(false)
            const [animationPlaying, setAnimationPlaying] = useState(null)
            useEffect(() => {
                if (animationPlaying === false) {
                    alertSpringApi.start({
                        from: {
                            alertScale: 0
                        },
                        to: [
                            {
                                alertScale: 1.1,
                                config: {
                                    tension: 170,
                                    friction: 26,
                                    clamp: true
                                },
                            },
                            {
                                alertScale: 0,
                                config: {
                                    tension: 300,
                                    friction: 26,
                                    clamp: true
                                },
                                delay: 1000
                            },
                        ],
                        onStart: () => {},
                        onRest: () => {}
                    })
                    shootFireworks([-3, 2, 0], 1)
                }

                return () => {
                    setAnimationPlaying(null)
                }
            }, [animationPlaying])

            function onPointerEnter(e) {
                e.stopPropagation()
                setHover(true)
                document.body.style.cursor = 'pointer';
            }
            function onPointerLeave(e) {
                e.stopPropagation()
                setHover(false)
                document.body.style.cursor = 'default';
            }
            function onPointerDown(e) {
                e.stopPropagation()
                // play spring api
                scoreSpringApi.start({
                    from: {
                        ufoScale: 0,
                        ufoPosition: [-7.1, 0, -4.5],
                    },
                    to: [
                        {
                            ufoScale: 1.5,
                            ufoPosition: [-7.1, 2, -3.1],
                            // if not set, animation plays quickly on the second time
                        },
                        {
                            ufoPosition: [-7.15, 2, -1.5],
                        },
                        {
                            ufoPosition: [-7.15, 2, 0.1],
                        },
                        // score
                        {
                            ufoScale: 2.75,
                            ufoPosition: [-7.15, 5, 0.1],
                        },
                        {
                            ufoScale: 0,
                            ufoPosition: [-7.15, 2, 0.1],
                            delay: 500
                        }
                    ],
                    config: {
                        tension: 170,
                        friction: 26
                    },
                    onStart: () => { setAnimationPlaying(true) },
                    onRest: () => { setAnimationPlaying(false) }
                })
            }
        
            return <group scale={scale} position={position}>
                <Ufo scale={1.6}/>
                <PlayAnimationButton 
                    position={[2, 0, 0]} 
                    onPointerEnter={e => onPointerEnter(e)}
                    onPointerLeave={e => onPointerLeave(e)}
                    onPointerDown={e => onPointerDown(e)}
                    hover={hover}
                />
                <group name='animation-parts'>
                    {/* had to put the springs as a parent */}
                    <animated.group scale={scoreSprings.ufoScale} position={scoreSprings.ufoPosition}>
                        <Ufo onBoard/>
                    </animated.group>
                    <animated.group scale={alertSprings.alertScale} position={[-7.1, 3, -4.5]}>
                        <ScoreAlert scale={alertSprings.alertScale} scoringTeam={1}/>
                    </animated.group>
                </group>
            </group>
        }
        return <group {...props}>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[-8, 0.02, -5]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                SCORE ANIMATION
                <meshStandardMaterial color='yellow'/>
            </Text3D>
            <Board scale={0.8} position={[-3, 0, 0]}/>
            <RocketButton scale={0.7} position={[2, 0, 2.5]}/>
            <UfoButton scale={0.7} position={[2, 0, 4]}/>
        </group>
    }
    const positionStart = [-15, 0, 3]
    const positionEnd = [0, 0, 0]
    const {
        yutOutcomesScale, 
        yutOutcomesPosition, 
        newTurnScale, 
        newTurnPosition, 
        catchScale, 
        catchPosition,
        pregameScale,
        pregamePosition,
        scoreScale,
        scorePosition,
        endScenesScale,
        endScenesPosition
    } = useSpring({
        yutOutcomesScale: display === 'yutOutcomes' ? 1 : 0,
        yutOutcomesPosition: display === 'yutOutcomes' ? positionEnd : positionStart,
        newTurnScale: display === 'newTurn' ? 1 : 0,
        newTurnPosition: display === 'newTurn' ? positionEnd : positionStart,
        catchScale: display === 'catch' ? 1 : 0,
        catchPosition: display === 'catch' ? positionEnd : positionStart,
        pregameScale: display === 'pregame' ? 1 : 0,
        pregamePosition: display === 'pregame' ? positionEnd : positionStart,
        scoreScale: display === 'score' ? 1 : 0,
        scorePosition: display === 'score' ? positionEnd : positionStart,
        endScenesScale: display === 'endScenes' ? 1 : 0,
        endScenesPosition: display === 'endScenes' ? positionEnd : positionStart,
    })
    function MainMenuButton(props) {
        const [hover, setHover] = useState(false)
        function onPointerEnter(e) {
            e.stopPropagation()
            setHover(true)
            document.body.style.cursor = 'pointer';
        }
        function onPointerLeave(e) {
            e.stopPropagation()
            setHover(false)
            document.body.style.cursor = 'default';
        }
        function onPointerDown(e) {
            e.stopPropagation()
            setHomeDisplay('title')
        }
        return <group name='main-menu-button' {...props}>
            <mesh>
                <boxGeometry args={[0.9, 0.03, 0.55]}/>
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh>
                <boxGeometry args={[0.85, 0.04, 0.5]}/>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh 
                name='wrapper'
                onPointerEnter={e => onPointerEnter(e)}
                onPointerLeave={e => onPointerLeave(e)}
                onPointerDown={e => onPointerDown(e)}
            >
                <boxGeometry args={[0.9, 0.04, 0.55]}/>
                <meshStandardMaterial transparent opacity={0}/>
            </mesh>
            <mesh name='arrow-icon' rotation={[0, -Math.PI*2/4, 0]} scale={[0.15, 0.01, 0.15]} position={[-0.15, 0.05, 0]}>
                <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh name='arrow-icon' rotation={[0, -Math.PI*2/4, 0]} scale={[0.15, 0.01, 0.15]} position={[0.15, 0.05, 0]}>
                <cylinderGeometry args={[1, 1, 1, 3, 1]} />
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
        </group>
    }
    
    // show four buttons, one for each scenario
    // on click, draw a curtain
    // put on the scene
    // add back button to go back
    const { rocketsWinScale, endSceneCurtainOpacity } = useSpring({
        rocketsWinScale: endScene === 'rocketsWin' ? 1 : 0,
        endSceneCurtainOpacity: endScene ? 1 : 0
    })

    console.log('endSceneCurtainOpacity', endSceneCurtainOpacity)
    function EndScenes(props) {
        
          const progressRef2 = useRef({ value: 0 })

          const shaderMaterialBeam2 = new THREE.ShaderMaterial({
            vertexShader: VertexShaderBeam2,
            fragmentShader: FragmentShaderBeam2,
            transparent: true,
            uniforms:
            {
              uOpacity: { value: 0 }
            }
          })

        const beamBrightness = 0.2
        useFrame((state, delta) => {
            const time = state.clock.elapsedTime
            shaderMaterialBeam2.uniforms.uOpacity.value = Math.sin(time * 3) * 0.05 + beamBrightness
        })
            
        const pWolfRise = 0.0
        const pWolfAbsorbed = 0.2
        const pCybertruckRise = 0.2
        const pCybertruckAbsorbed = 0.4
        const pBarnRise = 0.4
        const pBarnAbsorbed = 0.6
        const pLlamaRise = 0.6
        const pLlamaAbsorbed = 0.8
        const pGemRise = 0.8
        const pGemAbsorbed = 1.0

        const [{ wolfScale, wolfPosition, cybertruckPosition, cybertruckScale, barnPosition, barnScale, llamaPosition, llamaScale, gemPosition, gemScale }, api2] = useSpring(() => ({
        wolfPosition: [0, -2, 2],
        wolfScale: [0, 0, 0],
        cybertruckPosition: [0, -2, 2],
        cybertruckScale: [0, 0, 0],
        barnPosition: [0, -2, 2],
        barnScale: [0, 0, 0],
        llamaPosition: [0, -2, 2],
        llamaScale: [0, 0, 0],
        gemPosition: [0, -2, 2],
        gemScale: [0, 0, 0],
        config: { tension: 70, friction: 20 },
        }))

        gsap.to(progressRef2.current, {
                value: 1,
                duration: 7,
                ease: 'linear',
                repeat: -1,
                onUpdate: () => {
                const p = progressRef2.current.value
        
                // Interpolate position and scale manually
                let wolfPosition,
                wolfScale,
                cybertruckPosition,
                cybertruckScale,
                barnPosition,
                barnScale,
                llamaPosition,
                llamaScale,
                gemPosition,
                gemScale
        
                function calculateProgress(value, start, finish) {
                    return (value - start) / (finish - start)
                }
                // Wolf
                if (p < pWolfAbsorbed) { // 0.0 - 0.2
                    let progress = calculateProgress(p, 0, pWolfAbsorbed)
                    wolfPosition = [0, -2, 5 - progress * 6]
                    wolfScale = 1 - progress
                }
        
                // Cybertruck
                if (p > pCybertruckRise && p < pCybertruckAbsorbed) { // 0.0 - 0.2
                    let progress = calculateProgress(p, pCybertruckRise, pCybertruckAbsorbed)
                    cybertruckPosition = [0, -4, 4 - progress * 6]
                    cybertruckScale = 1 - progress
                }
        
                // Barn
                if (p > pBarnRise && p < pBarnAbsorbed) { // 0.0 - 0.2
                    let progress = calculateProgress(p, pBarnRise, pBarnAbsorbed)
                    barnPosition = [0, -4, 4 - progress * 6]
                    barnScale = 1 - progress
                }
                
                // Llama
                if (p > pLlamaRise && p < pLlamaAbsorbed) { // 0.0 - 0.2
                    let progress = calculateProgress(p, pLlamaRise, pLlamaAbsorbed)
                    llamaPosition = [0, -4, 4 - progress * 6]
                    llamaScale = 1 - progress
                }
        
                // Gem
                if (p > pGemRise && p < pGemAbsorbed) { // 0.0 - 0.2
                    let progress = calculateProgress(p, pGemRise, pGemAbsorbed)
                    gemPosition = [0, -4, 4 - progress * 6]
                    gemScale = 1 - progress
                }
        
                api2.set({
                    wolfPosition,
                    wolfScale,
                    cybertruckPosition,
                    cybertruckScale,
                    barnPosition,
                    barnScale,
                    llamaPosition,
                    llamaScale,
                    gemPosition,
                    gemScale
                })
                }
        })

        function RocketsWin() {
            const [hover, setHover] = useState(false)
            function onPointerEnter(e) {
                e.stopPropagation()
                setHover(true)
                document.body.style.cursor = 'pointer';
            }
            function onPointerLeave(e) {
                e.stopPropagation()
                setHover(false)
                document.body.style.cursor = 'default';
            }
            function onPointerDown(e) {
                e.stopPropagation()
                setEndScene('rocketsWin')
            }
            return <group name='rockets-win' position={[-4, 0, -3]}>
                <group name='picture' position={[0, 0, 0.5]}>
                    <Rocket position={[-0.6, 2, -0.6]} scale={1.2} onBoard/>
                    <Rocket position={[0.6, 2, -0.6]} scale={1.2} onBoard/>
                    <Rocket position={[0.6, 2, 0.6]} scale={1.2} onBoard/>
                    <Rocket position={[-0.6, 2, 0.6]} scale={1.2} onBoard/>
                    <Earth position={[0, 0, -0.3]} rotation={[-Math.PI/2, 0, 0]} scale={0.9} showParticles={false}/>
                </group>
                <PlayAnimationButton 
                    position={[0, 0, 2.5]} 
                    scale={0.8} 
                    onPointerEnter={e=>onPointerEnter(e)}
                    onPointerLeave={e=>onPointerLeave(e)}
                    onPointerDown={e=>onPointerDown(e)}
                    hover={hover}
                />
            </group>
        }
        function RocketsLose() {
            return <group name='rockets-lose' position={[1, 0, -2.5]}>
                <group name='picture'>
                    <Rocket position={[-0.1, 0, -0.3]} rotation={[Math.PI/8, -Math.PI/4, 0]}/>
                    <Star color='grey' position={[0, -1, -0.5]} scale={0.9}/>
                </group>
                <PlayAnimationButton position={[0, 0, 1.5]} scale={0.8}/>
            </group>
        }
        function UfosWin() {
            return <group name='ufos-win' position={[-4, 0, 2.5]}>
                <group name='picture'>
                    <Ufo position={[0, 2, 0]} scale={2.5} onBoard/>
                    <mesh name='beam' rotation={[-Math.PI/2 + Math.PI/9, Math.PI, 0]} position={[0, -2.2, 2.0]} scale={0.45} material={shaderMaterialBeam2}>
                        <cylinderGeometry args={[1, 3, 13, 32]}/>
                    </mesh>
                        <animated.group name='wolf' position={wolfPosition} scale={wolfScale}>
                            <Wolf rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.5}/>
                        </animated.group>
                        <animated.group name='cybertruck' position={cybertruckPosition} scale={cybertruckScale}>
                            <CyberTruck rotation={[0, Math.PI/2, -Math.PI/2]} scale={0.4}/>
                        </animated.group>
                        <animated.group name='barn' position={barnPosition} scale={barnScale}>
                            <Barn rotation={[-Math.PI/8, Math.PI/4, -Math.PI/4]} scale={0.5}/>
                        </animated.group>
                        <animated.group name='llama' position={llamaPosition} scale={llamaScale}>
                            <Llama rotation={[-Math.PI/4, Math.PI/2, 0]} scale={0.5}/>
                        </animated.group>
                        <animated.group name='gem' position={gemPosition} scale={gemScale} rotation={[-Math.PI/16, 0, 0]}>
                            <Ruby rotation={[-Math.PI/4, Math.PI/2, 0]} scale={1}/>
                            <Ruby position={[1, 0, 0.5]} rotation={[-Math.PI/6, Math.PI, 0]} scale={0.5} color='#0055FF'/>
                            <Ruby position={[-0.7, 0, 0.5]} rotation={[Math.PI/3, Math.PI, Math.PI/6]} scale={0.3} color='green'/>
                        </animated.group>
                </group>
                <PlayAnimationButton position={[2, 0, 1.5]} scale={0.8}/>
            </group>
        }
        function UfosLose() {
            return <group name='ufos-lose' position={[2, 0, 2]}>
                <group name='picture'>
                    <Ufo rotation={[Math.PI/4, Math.PI, 0]} scale={1}/>
                    <Star color='grey' position={[0, -1, -0.3]} scale={0.9}/>
                </group>
                <PlayAnimationButton position={[0, 0, 1.5]} scale={0.8}/>
            </group>
        }
        return <group {...props}>
            <RocketsWin/>
            <RocketsLose/>
            <UfosWin/>
            <UfosLose/>
        </group>
    }
    function EndScenesButton(props) {
        const [hover, setHover] = useState(false)
        function onPointerEnter(e) {
            e.stopPropagation()
            setHover(true)
            document.body.style.cursor = 'pointer';
        }
        function onPointerLeave(e) {
            e.stopPropagation()
            setHover(false)
            document.body.style.cursor = 'default';
        }
        function onPointerDown(e) {
            e.stopPropagation()
            setDisplay('endScenes')
        }
        return <group {...props}>
            <mesh>
                <boxGeometry args={[2.5, 0.03, 0.55]}/>
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </mesh>
            <mesh>
                <boxGeometry args={[2.45, 0.04, 0.5]}/>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh 
                name='wrapper' 
                onPointerEnter={e => onPointerEnter(e)}
                onPointerLeave={e => onPointerLeave(e)}
                onPointerDown={e => onPointerDown(e)}
            >
                <boxGeometry args={[2.5, 0.04, 0.55]}/>
                <meshStandardMaterial transparent opacity={0}/>
            </mesh>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[-1.1, 0.04, 0.15]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                END SCENES
                <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
            </Text3D>
        </group>
    }
    return <group {...props}>
        <group name='tab'>
            {/* <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[5.4, 0.02, -5]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                ALERTS
                <meshStandardMaterial color='yellow'/>
            </Text3D> */}
            <YutOutcomesButton position={[7.2, 0.02, -4.5]}/>
            <NewTurnButton position={[6.75, 0.02, -3.8]}/>
            <CatchButton position={[6.35, 0.02, -3.1]}/>
            <PregameButton position={[6.65, 0.02, -2.4]}/>
            <ScoreButton position={[6.35, 0.02, -1.7]}/>
            <EndScenesButton position={[6.85, 0.02, -1.0]}/>
        </group>
        <animated.group position={yutOutcomesPosition} scale={yutOutcomesScale}><YutOutcomes/></animated.group>
        <animated.group position={newTurnPosition} scale={newTurnScale}><NewTurn/></animated.group>
        <animated.group position={catchPosition} scale={catchScale}><Catch/></animated.group>
        <animated.group position={pregamePosition} scale={pregameScale}><Pregame/></animated.group>
        <animated.group position={scorePosition} scale={scoreScale}><Score/></animated.group>
        <animated.group position={endScenesPosition} scale={endScenesScale}><EndScenes/></animated.group>
        <animated.group scale={rocketsWinScale}><RocketsWin2Preview position={[0, 15, 6.5]}/></animated.group>
        <mesh name='background-curtain' rotation={[-Math.PI/2, 0, 0]} position={[0, 3, 0]} scale={10}>
            <boxGeometry args={[20, 10, 0.1]}/>
            <AnimatedMeshDistortMaterial color='black' transparent opacity={ endSceneCurtainOpacity ? endSceneCurtainOpacity : curtainSprings.opacity}/>
        </mesh>
        {/* back button */}
        <MainMenuButton position={[-10.5, 0, 2]}/>
    </group>
}