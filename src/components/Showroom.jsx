import { Text3D } from "@react-three/drei"
import { useState } from "react"

export default function Showroom(props) {
    const [display, setDisplay] = useState('yutOutcomes')
    function YutOutcomesButton(props) {
        // pointer in
        // pointer out
        // pointer down
    }
    return <group {...props}>
        <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.15, 0.02, 0.13]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.3}
            height={0.01}
        >
            ALERTS
            <meshStandardMaterial color='yellow'/>
        </Text3D>
    </group>
}