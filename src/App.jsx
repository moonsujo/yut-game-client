import { Suspense } from 'react';
import Experience from './Experience';
import { Canvas } from '@react-three/fiber';
import { Route } from "wouter"
import { Loader } from '@react-three/drei';
import StarsPatterns2Shader from './shader/starsPatterns2/StarsPatterns2Shader';
import * as THREE from 'three';
import Alert from './components/Alert';
import AssetLoader from './sceneSetUp/AssetLoader';
import AudioController from './soundPlayers/AudioController';
import MusicController from './soundPlayers/MusicController';
import Home2 from './Home2';
import RulebookText from './text/RulebookText';
import Showroom from './components/Showroom';

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
        <AssetLoader/>
        <Route path="/">
          <Home2/>
        </Route>
        <Route path="/how-to-play">
          <Home2 showRulebookDefault={true}/>
        </Route>
        <Route path='/showroom'>
          <Showroom/>
        </Route>
        <Route path="/about">
          <Home2 showAboutDefault={true}/>
        </Route>
        <Route path="/:id">
          <Experience/>
          <Alert position={[0, 3, 0.5]} rotation={[0,0,0]}/>
        </Route>
      </Suspense>
      <AudioController/>
      <MusicController/>
    </Canvas>
    <Loader/>
    <RulebookText/>
  </>)
}