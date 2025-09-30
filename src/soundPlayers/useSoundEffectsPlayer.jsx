import { useAtomValue } from "jotai";
import { audioLoaderAtom, listenerAtom } from "../GlobalState";
import { Audio } from "three";

export default function useSoundEffectsPlayer() {
  const audioLoader = useAtomValue(audioLoaderAtom)
  const listener = useAtomValue(listenerAtom)

  function playSoundEffect(filePath, volume) {
    try {
      const newSoundEffect = new Audio(listener)
      audioLoader.load(filePath, (buffer) => {
        newSoundEffect.setBuffer(buffer);
        newSoundEffect.setLoop(false);
        newSoundEffect.setVolume(volume)
        newSoundEffect.play()
      });
    } catch (err) {
      console.log('error playing sound effect', err)
    }
  }

  return { playSoundEffect }
}