// AudioController.tsx
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { AudioListener, AudioLoader } from "three";
import { musicListenerAtom, musicLoaderAtom } from "../GlobalState";
import { useAtom, useSetAtom } from "jotai";

export default function MusicController() {
  const { camera } = useThree();

  // keep these across renders
  const [musicListener, setMusicListener] = useAtom(musicListenerAtom);
  const setMusicLoader = useSetAtom(musicLoaderAtom);

  useEffect(() => {
    setMusicListener(new AudioListener())
    setMusicLoader(new AudioLoader())
    return () => {
      camera.remove(musicListener)
    };
  }, [camera]);
}
