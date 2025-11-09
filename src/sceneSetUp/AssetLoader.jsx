import { useLoader } from "@react-three/fiber"
import { useGLTF } from '@react-three/drei';
import { useSetAtom } from "jotai"
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { fireworkTexturesAtom, meteorTexturesAtom } from "../GlobalState"

export default function AssetLoader() {
  const fireworkTextures = [
    useLoader(TextureLoader, '/textures/particles/3.png'),
    useLoader(TextureLoader, '/textures/particles/5.png'),
    useLoader(TextureLoader, '/textures/particles/6.png'),
    useLoader(TextureLoader, '/textures/particles/8.png'),
  ]
  const setFireworkTextures = useSetAtom(fireworkTexturesAtom)
  setFireworkTextures(fireworkTextures)
  
  const meteorTextures = [
    useLoader(TextureLoader, 'textures/particles/3.png'),
  ]
  const setMeteorTextures = useSetAtom(meteorTexturesAtom)
  setMeteorTextures(meteorTextures)

  return
}

useGLTF.preload("/models/rounded-rectangle.glb")
useGLTF.preload("/models/yoot-for-button.glb")
useGLTF.preload("/models/star.glb");
useGLTF.preload("/models/earth-round.glb");
useGLTF.preload("/models/Mars 4.glb");
useGLTF.preload("/models/neptune.glb");
useGLTF.preload("/models/Saturn 3.glb");
useGLTF.preload('/models/wolf-constellation-dhazele-2-new-mat.glb')
useGLTF.preload('/models/rhino-constellation-dhazele-2.glb')
useGLTF.preload('/models/taurus-constellation-dhazele-2.glb')
useGLTF.preload("/models/rocket.glb")
useGLTF.preload("/models/ufo.glb")
useGLTF.preload("/models/cursor.glb");
useGLTF.preload('/models/bam-emoji.glb')
useGLTF.preload("/models/yoot-animation-2-korean-darker-more.glb")
useGLTF.preload("/models/yut-v3-regular-darker-more.glb")
useGLTF.preload("/models/yut-v3-backdo-darker-more.glb")
useGLTF.preload("/models/bull-constellation-thin.glb")
useGLTF.preload("/models/rhino-constellation-thin.glb")
useGLTF.preload("/models/planet-joined.glb")
useGLTF.preload("/models/sound-icon-less-details.glb")
useGLTF.preload("/models/alien.glb")
useGLTF.preload("/models/ufo-eyes-separate.glb")
useGLTF.preload("/models/rocket-no-astronaut.glb")
useGLTF.preload("/models/astronaut-hands-up.glb")
useGLTF.preload("/models/wolf.gltf")
useGLTF.preload("/models/cybertruck.gltf")
useGLTF.preload("/models/barn.gltf")
useGLTF.preload("/models/llama.glb")
useGLTF.preload("/models/ruby.gltf")
useGLTF.preload("/models/aries-constellation-thin.glb")
useGLTF.preload("/models/wolf-constellation-thin-3.glb")
