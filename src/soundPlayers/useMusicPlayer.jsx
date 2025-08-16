import { useAtomValue } from "jotai";
import { musicListenerAtom, musicLoaderAtom } from "../GlobalState";
import { Audio } from "three";

export default function useMusicPlayer() {
  const musicLoader = useAtomValue(musicLoaderAtom)
  const musicListener = useAtomValue(musicListenerAtom)

  function playSoundEffect(filePath) {
    try {
      const soundEffect = new Audio(musicListener)
      musicLoader.load(filePath, (buffer) => {
        soundEffect.setBuffer(buffer);
        soundEffect.setLoop(false);
        soundEffect.setVolume(0.5);
        soundEffect.play()
      });
    } catch (err) {
      console.log('error playing sound', err)
    }
  }

  return { playMusic }
}