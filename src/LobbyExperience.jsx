import Lobby from "./Lobby";
import * as THREE from 'three'
import MilkyWayNew from "./shader/milkyway/MilkyWayNew";

export default function LobbyExperience() {
    return <>
        <Lobby/>
        <MilkyWayNew // will not show without a camera
            rotation={[-Math.PI/2, 0, -35.0]} 
            position={[0, -10, -4]}
            scale={5}
            brightness={0.5}
            colorTint1={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
            colorTint2={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
            colorTint3={new THREE.Vector4(0.0, 1.0, 1.0, 1.0)}
        />
    </>
}