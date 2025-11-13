import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function useWindowSize(callback) {
  const sizesRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
    resolution: new THREE.Vector2(
      window.innerWidth * Math.min(window.devicePixelRatio, 2),
      window.innerHeight * Math.min(window.devicePixelRatio, 2)
    )
  });

  useEffect(() => {
    const handleResize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      sizesRef.current.width = window.innerWidth;
      sizesRef.current.height = window.innerHeight;
      sizesRef.current.pixelRatio = pixelRatio;
      sizesRef.current.resolution.set(
        window.innerWidth * pixelRatio,
        window.innerHeight * pixelRatio
      );
      
      if (callback) {
        callback(sizesRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback]);

  return sizesRef.current;
}
