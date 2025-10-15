import React, {useRef, useMemo} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'
import Portal from "./Portal";
import { useAtomValue } from 'jotai';
import { showBlackholeAtom, showRedGalaxyAtom } from './GlobalState';
import MilkyWayNew from './shader/milkyway/MilkyWayNew';

export default function RedGalaxy() {
    const showRedGalaxy = useAtomValue(showRedGalaxyAtom)

    return showRedGalaxy && <MilkyWayNew // will not show without a camera
        rotation={[-Math.PI/2, 0, 0]} 
        position={[0, -2, -1]}
        scale={4}
        brightness={0.7}

        // set 0
        colorTint1={new THREE.Vector4(0.80, 0.49, 0.19, 1.0)} // small
        colorTint3={new THREE.Vector4(0.7, 0.5, 0.7, 0.7)} // medium
        colorTint2={new THREE.Vector4(1.0, 1.0, 1.0, 0.5)} // large
    />
}