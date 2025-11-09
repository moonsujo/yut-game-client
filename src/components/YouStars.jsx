import Star from "../meshes/Stars/Star";

export default function YouStars({ position, rotation, scale, team }) {
    return <group position={position} rotation={rotation} scale={scale}>
        <Star scale={0.3} position={[0, 0, 0]} color={team === 0 ? 'red' : 'turquoise'} />
        <Star scale={0.2} position={[0.25, 0, -0.2]} color={team === 0 ? 'red' : 'turquoise'} />
        <Star scale={0.15} position={[0.5, 0, -0.3]} color={team === 0 ? 'red' : 'turquoise'} />
    </group>
}