import { useEffect, useRef, useState } from 'react';
import mediaValues from '../dictionaries/mediaValues';
import { CameraControls, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { subscribeToResize, unsubscribeFromResize } from '../hooks/useWindowSize';

function calcZoom() {
  if (window.innerWidth < mediaValues.landscapeCutoff) {
    const zoomMax = 42;
    const newZoom = zoomMax * (window.innerWidth / mediaValues.landscapeCutoff)
    return newZoom
  } else {
    const zoomMin = 20;
    const newZoom = zoomMin * (window.innerWidth / mediaValues.landscapeCutoff)
    return newZoom
  }
}

export default function GameCamera({ position=[0, 17, 7], lookAt=[0,0,0], controlsEnabled=false }) {
  
  const [zoom, setZoom] = useState(calcZoom());
  
  function handleResize() {
    setZoom(calcZoom())
  }

  // Subscribe to centralized resize handler
  useEffect(() => {
    subscribeToResize(handleResize);
    
    return () => {
      unsubscribeFromResize(handleResize);
    };
  }, []);

  const camera = useRef();
  useFrame(() => {
    const lookAtVector3 = new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2])
    camera.current.lookAt(lookAtVector3)
  })

  return <>
    <CameraControls enabled={controlsEnabled}/>
    <OrthographicCamera
      makeDefault
      zoom={zoom}
      position={position}
      ref={camera}
    />
  </>
}