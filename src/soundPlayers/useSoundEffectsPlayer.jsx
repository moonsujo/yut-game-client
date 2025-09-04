import { useAtom, useAtomValue } from "jotai";
import { audioLoaderAtom, audioVolumeAtom, listenerAtom, soundEffectAtom } from "../GlobalState";
import { Audio } from "three";

export default function useSoundEffectsPlayer() {
  const audioLoader = useAtomValue(audioLoaderAtom)
  const listener = useAtomValue(listenerAtom)
  const [soundEffect, setSoundEffect] = useAtom(soundEffectAtom)
  const audioVolume = useAtomValue(audioVolumeAtom)

  function playSoundEffect(filePath) {
    try {
      const newSoundEffect = new Audio(listener)
      setSoundEffect(newSoundEffect)
      audioLoader.load(filePath, (buffer) => {
        newSoundEffect.setBuffer(buffer);
        newSoundEffect.setLoop(false);
        newSoundEffect.setVolume(audioVolume);
        newSoundEffect.play()
      });
    } catch (err) {
      console.log('error playing sound effect', err)
    }
  }

  return { playSoundEffect }
}