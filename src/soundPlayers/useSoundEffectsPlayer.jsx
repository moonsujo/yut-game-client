import { useAtomValue } from "jotai";
import { audioLoaderAtom, listenerAtom } from "../GlobalState";

export default function useSoundEffectsPlayer() {
  const audioLoader = useAtomValue(audioLoaderAtom)
  const listener = useAtomValue(listenerAtom)

  function playSoundEffect(filePath) {
    console.log('filePath', filePath)
    try {
      const soundEffect = new Audio(listener)
      audioLoader.load(filePath, (buffer) => {
        console.log('loading')
        soundEffect.setBuffer(buffer);
        soundEffect.setLoop(false);
        soundEffect.setVolume(0.5);
      });
        console.log('loaded')
      soundEffect.play()
    } catch (err) {
      console.log('error playing sound', err)
    }
  }

  return { playSoundEffect }
}