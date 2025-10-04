import { Text3D } from "@react-three/drei"
import { useState } from "react"
import * as THREE from "three"
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MeshDistortMaterial } from '@react-three/drei'
import { animated, useSpring } from '@react-spring/three'

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

export default function Showroom(props) {
    const [display, setDisplay] = useState('yutOutcomes')
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
                position={[-1.4, 0.02, 0.1]}
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
                position={[-1.0, 0.02, 0.1]}
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
        return <group {...props}>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                PREGAME
                <meshStandardMaterial color='yellow'/>
            </Text3D>
        </group>
    }
    function ScoreButton(props) {
        return <group {...props}>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                SCORE
                <meshStandardMaterial color='yellow'/>
            </Text3D>
        </group>
    }
    function GameStartButton(props) {
        return <group {...props}>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                GAME START
                <meshStandardMaterial color='yellow'/>
            </Text3D>
        </group>
    }
    function EndScenesButton(props) {
        return <group {...props}>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                END SCENES
                <meshStandardMaterial color='yellow'/>
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
    const positionStart = [-15, 0, 3]
    const positionEnd = [0, 0, 0]
    const {yutOutcomesScale, yutOutcomesPosition, newTurnScale, newTurnPosition, catchScale, catchPosition} = useSpring({
        yutOutcomesScale: display === 'yutOutcomes' ? 1 : 0,
        yutOutcomesPosition: display === 'yutOutcomes' ? positionEnd : positionStart,
        newTurnScale: display === 'newTurn' ? 1 : 0,
        newTurnPosition: display === 'newTurn' ? positionEnd : positionStart,
        catchScale: display === 'catch' ? 1 : 0,
        catchPosition: display === 'catch' ? positionEnd : positionStart,
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
            console.log('click')
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
    return <group {...props}>
        <group name='tab'>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[5.4, 0.02, -5]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                ALERTS
                <meshStandardMaterial color='yellow'/>
            </Text3D>
            <YutOutcomesButton position={[7.2, 0.02, -4.5]}/>
            <NewTurnButton position={[6.75, 0.02, -3.8]}/>
            <CatchButton position={[6.35, 0.02, -3.1]}/>
            <PregameButton position={[5.7, 0.02, -2.5]}/>
            <ScoreButton position={[5.7, 0.02, -2]}/>
            <GameStartButton position={[5.4, 0.02, -1.4]}/>
            <EndScenesButton position={[5.4, 0.02, -0.8]}/>
        </group>
        <animated.group position={yutOutcomesPosition} scale={yutOutcomesScale}><YutOutcomes/></animated.group>
        <animated.group position={newTurnPosition} scale={newTurnScale}><NewTurn/></animated.group>
        <animated.group position={catchPosition} scale={catchScale}><Catch/></animated.group>
        <mesh name='background-curtain' rotation={[-Math.PI/2, 0, 0]} position={[0, 3, 0]} scale={10}>
            <boxGeometry args={[20, 10, 0.1]}/>
            <AnimatedMeshDistortMaterial color='black' transparent opacity={curtainSprings.opacity}/>
        </mesh>
        <MainMenuButton position={[-10.5, 0, 2]}/>
    </group>
}