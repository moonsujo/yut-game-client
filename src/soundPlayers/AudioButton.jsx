import { useState } from "react"
import useMusicPlayer from "./useMusicPlayer"
import useSoundEffectsPlayer from "./useSoundEffectsPlayer"
import { useAtom, useAtomValue } from "jotai"
import { audioVolumeAtom, musicAtom } from "../GlobalState"
import { SoundIcon } from "../meshes/SoundIcon"

export default function AudioButton({ position, scale }) {
  const [hover, setHover] = useState(false)
  const [audioVolume, setAudioVolume] = useAtom(audioVolumeAtom) // default sound off
  const music = useAtomValue(musicAtom)
  const { loopMusic } = useMusicPlayer()

  function getSoundIconColors() {
    if (hover) {
      if (audioVolume) {
        return { colorMegaphone: '#dddddd', colorRings: '#dddddd' }
      } else {
        return { colorMegaphone: '#ffff00', colorRings: '#dddddd' }
      }
    } else {
      if (audioVolume) {
        return { colorMegaphone: '#ffff00', colorRings: '#ffff00' }
      } else {
        return { colorMegaphone: '#dddddd', colorRings: '#ffff00' }
      }
    }
  }
  function handleSoundPointerEnter(e) {
    e.stopPropagation()
    setHover(true)
    document.body.style.cursor = 'pointer'
  }
  function handleSoundPointerLeave(e) {
    e.stopPropagation()
    setHover(false)
    document.body.style.cursor = 'default'
  }
  function handleSoundPointerDown(e) {
    e.stopPropagation()
    if (audioVolume) {
      console.log('turn sound off')
      setAudioVolume(0) // use this in the next music play
      if (music) music.setVolume(0)
    } else {
      console.log('turn sound on')
      setAudioVolume(1)
      if (music) music.setVolume(1)
      else loopMusic(1, true)
    }
  }
  return <group name='menu-buttons' position={position} scale={scale}>
    <group
      name='sound-button'
      position={[0, 0.02, -0.3]}
      scale={0.9}>
      <SoundIcon
        rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
        scale={0.2}
        colorMegaphone={getSoundIconColors().colorMegaphone}
        colorRings={getSoundIconColors().colorRings}
        animated={audioVolume}
      />
      {!audioVolume && <group name='background'>
        <mesh name='background-outer' position={[0.05, -0.5, -0.2]} scale={[1.3, 0.01, 1.3]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='grey' />
        </mesh>
        <mesh name='background-inner' position={[0.05, -0.5, -0.2]} scale={[1.25, 0.02, 1.25]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color='black' />
        </mesh>
      </group>}
      <mesh name='wrapper'
        position={[0, -0.5, -0.2]}
        scale={[1.3, 0.01, 1.3]}
        onPointerEnter={e => handleSoundPointerEnter(e)}
        onPointerLeave={e => handleSoundPointerLeave(e)}
        onPointerDown={e => handleSoundPointerDown(e)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color='black' transparent opacity={0} />
      </mesh>
    </group>
  </group>
}