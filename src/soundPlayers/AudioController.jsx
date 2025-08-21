// AudioController.tsx
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { AudioListener, AudioLoader } from "three";
import { audioLoaderAtom, listenerAtom } from "../GlobalState";
import { useAtom, useSetAtom } from "jotai";

export default function AudioController() {
  const { camera } = useThree();

  // keep these across renders
  const [listener, setListener] = useAtom(listenerAtom);
  const setAudioLoader = useSetAtom(audioLoaderAtom);

  useEffect(() => {
    const newListener = new AudioListener()
    setListener(newListener)
    setAudioLoader(new AudioLoader())
    
    const audioContext = newListener.context;
    const resume = () => {
      if (audioContext && audioContext.state === "suspended") {
        audioContext.resume();
      }
    };

    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);

    return () => {
      camera.remove(listener)
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
    };
  }, [camera]);
}
