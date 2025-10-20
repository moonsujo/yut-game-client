import { Text3D } from '@react-three/drei';
import { useState } from 'react';
import useSoundEffectsPlayer from './soundPlayers/useSoundEffectsPlayer';

export default function Title({ position, rotation, scale, setDisplay }) {

  const [hover, setHover] = useState(false);
  const { playSoundEffect } = useSoundEffectsPlayer()
  function handlePointerEnter() {
      setHover(true)
  }
  function handlePointerLeave() {
      setHover(false)
  }
  function handlePointerDown(e) {
    e.stopPropagation()
    setDisplay('title')
    playSoundEffect('/sounds/effects/button-click.mp3', 1)
  }

  return <group scale={scale} position={position} rotation={rotation}>
    {/* line 1 */}
    {/* line 2 */}
    {/* wrapper */}
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      size={0.4}
      height={0.01}
      position={[0, -0.5, 0]}
      letterSpacing={0.04}
    >
      YUT
      <meshStandardMaterial color={hover ? "green": [0.8, 0.8, 0]} />
    </Text3D>
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      size={0.4}
      height={0.01}
      position={[0, -1, 0]}
      letterSpacing={0.03}
    >
      NORI
      <meshStandardMaterial color={hover ? "green": [0.8, 0.8, 0]} />
    </Text3D>
    <mesh 
      position={[0.7, -0.5, 0]} 
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={e=>handlePointerDown(e)}
    >
      <boxGeometry args={[1.5, 1, 0.1]}/>
      <meshStandardMaterial color="grey" transparent opacity={0}/>
    </mesh>
  </group>
}