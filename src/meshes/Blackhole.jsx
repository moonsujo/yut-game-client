import * as THREE from 'three'
import Portal from "../shader/portal/Portal";
import MilkyWayNew from '../shader/milkyway/MilkyWayNew';

export default function Blackhole({scale, position}) {

    return <group scale={scale} position={position}>
        <MilkyWayNew // will not show without a camera
            rotation={[-Math.PI/2, 0, 0]} 
            position={[0, -2, 0]}
            scale={2}
            brightness={0.7}
            colorTint1={new THREE.Vector4(0.80, 0.49, 0.19, 1.0)} // small
            colorTint3={new THREE.Vector4(1.0, 1.0, 1.0, 0.7)} // medium
            colorTint2={new THREE.Vector4(1.0, 1.0, 1.0, 0.5)} // large
        />
        <Portal position={[0, 0.3, -3]} scale={1} rotation={[-Math.PI/2, 0, 0]}/>
    </group>
}