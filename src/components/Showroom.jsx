import { Text3D } from "@react-three/drei"
import { useState } from "react"
import * as THREE from "three"

import DoAlert from "../alerts/DoAlert"
import GeAlert from "../alerts/GeAlert"
import GulAlert from "../alerts/GulAlert"
import YootAlert from "../alerts/YootAlert"
import MoAlert from "../alerts/MoAlert"
import BackdoAlert from "../alerts/BackdoAlert"
import OutAlert from "../alerts/OutAlert"
import useStarRoll from "../shader/starRoll/StarRoll"
import useSoundEffectsPlayer from "../soundPlayers/useSoundEffectsPlayer"
import { pickRandomElement } from "../helpers/helpers.js";



export default function Showroom(props) {
    const [display, setDisplay] = useState('yutOutcomes')
    const [RollStar] = useStarRoll();
    const { playSoundEffect } = useSoundEffectsPlayer()

    function YutOutcomesButton(props) {
        // pointer in
        // pointer out
        // pointer down
    }
    function YutOutcomesButton(props) {
        return <group {...props}>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                position={[0,0,0]}
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                YUT OUTCOMES
                <meshStandardMaterial color='yellow'/>
            </Text3D>
        </group>
    }
    function NewTurnButton(props) {
        return <group {...props}>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                NEW TURN
                <meshStandardMaterial color='yellow'/>
            </Text3D>
        </group>
    }
    function CatchButton(props) {
        return <group {...props}>
            <Text3D
                font="fonts/Luckiest Guy_Regular.json"
                rotation={[-Math.PI/2, 0, 0]}
                size={0.3}
                height={0.01}
            >
                CATCH
                <meshStandardMaterial color='yellow'/>
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
                // play visual effect
                for (let i = 0; i < 13; i++) {
                
                    // need a THREE.Vector3 for position
                    const position = new THREE.Vector3(
                        (Math.random() - 0.5) * 10, 
                        5.0,
                        (Math.random() - 0.5) * 10, 
                    )
                    
                    const rotation = new THREE.Vector3(
                        Math.PI/3, 
                        0,
                        0, 
                    )
                    
                    const omitFactor = 4
                    const size = 0.001
                    const scale = 0.8 + Math.random() * 0.5
                    const color = new THREE.Color();
                    color.setHSL(0.5 + Math.random() * 0.05, 1, 0.5);
                    setTimeout(() => {
                        RollStar({ position, rotation, omitFactor, size, scale, color })
                    }, i * 50)
                }
                // play sound effect
                const yutSoundFilePaths = [
                    '/sounds/effects/yutThrows/produced/yut!.mp3',
                    '/sounds/effects/yutThrows/produced/yuuuuuuuut.mp3',
                ]
                
                playSoundEffect(pickRandomElement(yutSoundFilePaths), 1)
            }
            return <group name='effect-button' {...props}>
                <mesh>
                    <boxGeometry args={[1.65, 0.03, 0.55]}/>
                    <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                </mesh>
                <mesh>
                    <boxGeometry args={[1.6, 0.04, 0.5]}/>
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
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    position={[-0.625, 0.025, 0.15]}
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.3}
                    height={0.01}
                >
                    EFFECT
                    <meshStandardMaterial color={ hover ? 'green': 'yellow' }/>
                </Text3D>
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
                <YutEffectButton position={[2.5, 0, -0.21]}/>
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
            <YutOutcomesButton position={[5.7, 0.02, -4.5]}/>
            <NewTurnButton position={[5.7, 0.02, -4]}/>
            <CatchButton position={[5.7, 0.02, -3.5]}/>
            <PregameButton position={[5.7, 0.02, -3]}/>
            <ScoreButton position={[5.7, 0.02, -2.5]}/>
            <GameStartButton position={[5.4, 0.02, -2]}/>
            <EndScenesButton position={[5.4, 0.02, -1.5]}/>
        </group>
        { display === 'yutOutcomes' && <YutOutcomes/> }
    </group>
}