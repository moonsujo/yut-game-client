import { useAtomValue } from "jotai";
import { audioLoaderAtom, listenerAtom } from "../GlobalState";
import { Audio } from "three";

export default function useSoundEffectsPlayer() {
  const audioLoader = useAtomValue(audioLoaderAtom)
  const listener = useAtomValue(listenerAtom)

  function playSoundEffect(filePath) {
    try {
      const soundEffect = new Audio(listener)
      audioLoader.load(filePath, (buffer) => {
        soundEffect.setBuffer(buffer);
        soundEffect.setLoop(false);
        soundEffect.setVolume(0.2);
        soundEffect.play()
      });
    } catch (err) {
      console.log('error playing sound effect', err)
    }
  }

  return { playSoundEffect }
}