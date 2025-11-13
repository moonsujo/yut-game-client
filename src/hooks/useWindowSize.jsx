import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Shared sizes object
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
  resolution: new THREE.Vector2(
    window.innerWidth * Math.min(window.devicePixelRatio, 2),
    window.innerHeight * Math.min(window.devicePixelRatio, 2)
  )
};

// Centralized resize handlers
const resizeHandlers = new Set();

// Single global resize handler
const handleResize = () => {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = pixelRatio;
  sizes.resolution.set(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  
  // Notify all subscribers
  resizeHandlers.forEach(handler => handler(sizes));
};

// Set up single global resize listener
window.addEventListener('resize', handleResize);

// React hook
export function useWindowSize(callback) {
  const sizesRef = useRef(sizes);

  useEffect(() => {
    if (callback) {
      resizeHandlers.add(callback);
      
      return () => {
        resizeHandlers.delete(callback);
      };
    }
  }, [callback]);

  return sizesRef.current;
}
