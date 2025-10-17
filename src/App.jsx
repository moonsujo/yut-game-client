import { Suspense } from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { SocketManager } from './SocketManager';
import { Route } from "wouter"
import Home2Experience from './Home2Experience';
import { Loader } from '@react-three/drei';
import StarsPatterns2Shader from './shader/starsPatterns2/StarsPatterns2Shader';
import * as THREE from 'three';
import Alert from './Alert';
import AssetLoader from './AssetLoader';
import AudioController from './soundPlayers/AudioController';
import MusicController from './soundPlayers/MusicController';
import MilkyWayNew from './shader/milkyway/MilkyWayNew';

export default function App () {

  const created = ({ gl }) => {
    gl.setClearColor('#090f16', 1)

    // for shader
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    gl.setSize(sizes.width, sizes.height)
    gl.setPixelRatio(sizes.pixelRatio)
  }

  return (<>
    <Canvas
      className='r3f'
      onCreated={ created }
    >
      <Suspense fallback={null}>
        {/* <Perf/> */}
        <directionalLight castShadow position={ [ 1, 6, 3 ] } intensity={ 4 } />
        <ambientLight intensity={ 1.5 } />
        {/* <ParticleSystem/> */}
        <SocketManager/>
        <AssetLoader/>
        <Route path="/">
          <Home2Experience/>
        </Route>
        <Route path="/:id">
          <Experience/>
          <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/3.png'}/>
          <StarsPatterns2Shader count={10000} texturePath={'/textures/particles/6.png'} size={2}/>
          <Alert position={[0,2,0.5]} rotation={[0,0,0]}/>
        </Route>
      </Suspense>
      <AudioController/>
      <MusicController/>
    </Canvas>
    <Loader/>
  </>)
}