// AudioController.tsx
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { AudioListener, AudioLoader } from "three";
import { audioContextAtom, audioLoaderAtom, listenerAtom } from "../GlobalState";
import { useAtom, useSetAtom } from "jotai";

export default function AudioController() {
  const { camera } = useThree();

  // keep these across renders
  const [listener, setListener] = useAtom(listenerAtom);
  const setAudioLoader = useSetAtom(audioLoaderAtom);
  const [audioContext, setAudioContext] = useAtom(audioContextAtom)

  useEffect(() => {
    const newListener = new AudioListener()
    setListener(newListener)
    setAudioLoader(new AudioLoader())
    
    const audioContext = newListener.context;
    setAudioContext(audioContext)

    return () => {
      camera.remove(listener)
    };
  }, [camera]);

  useEffect(() => {
    const resume = () => {
      if (audioContext && audioContext.state === "suspended") {
        audioContext.resume();
      }
    };

    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);

    return () => {
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
    }
  }, [audioContext])
}
