export default function JoinAlertPreview({ position, team }) {      

    const borderMesh0Ref = useRef();
    const borderMesh1Ref = useRef();
    const borderMesh2Ref = useRef();
    const borderMesh3Ref = useRef();
    const borderMesh4Ref = useRef();
    const borderMesh5Ref = useRef();
    const borderMesh6Ref = useRef();
    const borderMeshRefs = [
        borderMesh0Ref,
        borderMesh1Ref,
        borderMesh2Ref,
        borderMesh3Ref,
        borderMesh4Ref,
        borderMesh5Ref,
        borderMesh6Ref
    ]

    const height = 0.7
    const width = 1.8
    const starScale = 0.08
    useFrame((state, delta) => {
    for (let i = 0; i < borderMeshRefs.length; i++) {      
        borderMeshRefs[i].current.position.x = Math.cos(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * width
        borderMeshRefs[i].current.position.y = 0.05
        borderMeshRefs[i].current.position.z = Math.sin(state.clock.elapsedTime / 2 + 2 * Math.PI/borderMeshRefs.length * i) * height
    }
    })

    return <animated.group position={position} scale={springs.joinAlertScale} rotation={[0,0,0]}>
        <mesh scale={[width, 1,height]}>
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
        <meshStandardMaterial color='black' transparent opacity={0.9}/>
        </mesh>
        <Text3D
            font="/fonts/Luckiest Guy_Regular.json" 
            position={[-1.27, 0.1, 0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            height={0.01}
            lineHeight={0.9} 
            size={0.35}
        >
        {`piggyback!`}
        <meshStandardMaterial color={team === 0 ? 'red': 'turquoise'}/>
        </Text3D>
        <group ref={borderMesh0Ref}>
        <Star scale={starScale} color={team === 0 ? 'red': 'turquoise'} />
        </group>
        <group ref={borderMesh1Ref}>
        <Star scale={starScale} color={team === 0 ? 'red': 'turquoise'} />
        </group>
        <group ref={borderMesh2Ref}>
        <Star scale={starScale} color={team === 0 ? 'red': 'turquoise'}/>
        </group>
        <group ref={borderMesh3Ref}>
        <Star scale={starScale} color={team === 0 ? 'red': 'turquoise'} />
        </group>
        <group ref={borderMesh4Ref}>
        <Star scale={starScale} color={team === 0 ? 'red': 'turquoise'} />
        </group>
        <group ref={borderMesh5Ref}>
        <Star scale={starScale} color={team === 0 ? 'red': 'turquoise'} />
        </group>
        <group ref={borderMesh6Ref}>
        <Star scale={starScale} color={team === 0 ? 'red': 'turquoise'} />
        </group>
    </animated.group>
}