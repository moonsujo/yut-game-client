import { Text3D } from "@react-three/drei"
import { useState } from "react"
import DoAlert from "../alerts/DoAlert"
import GeAlert from "../alerts/GeAlert"
import GulAlert from "../alerts/GulAlert"
import YootAlert from "../alerts/YootAlert"

export default function Showroom(props) {
    const [display, setDisplay] = useState('yutOutcomes')
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
        return <group {...props}>
            <group name='do-alert' position={[-3.5, 0, -5]} scale={0.9}>
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
            <group name='ge-alert' position={[0.5, 0, -5]} scale={0.9}>
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
            <group name='gul-alert' position={[-3.5, 0, -1.3]} scale={0.9}>
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
            <group name='yut-alert' position={[0.5, 0, -1.4]} scale={0.9}>
                <Text3D
                    font="fonts/Luckiest Guy_Regular.json"
                    rotation={[-Math.PI/2, 0, 0]}
                    size={0.5}
                    height={0.01}
                >
                    YUT
                    <meshStandardMaterial color='yellow'/>
                </Text3D>
                <YootAlert position={[3, 0, 3]} rotation={[0, Math.PI/2, 0]}/>
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