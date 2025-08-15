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
    setListener(new AudioListener())
    setAudioLoader(new AudioLoader())
    return () => {
      camera.remove(listener)
    };
  }, [camera]);
}
