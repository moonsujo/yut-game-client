import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Shared sizes object
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: window.devicePixelRatio,
  resolution: new THREE.Vector2(
    window.innerWidth * window.devicePixelRatio,
    window.innerHeight * window.devicePixelRatio
  )
};

// Centralized resize handlers
const resizeHandlers = new Set();

// Single global resize handler
const handleResize = () => {
  const pixelRatio = Math.min(window.devicePixelRatio, 2)
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
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!callback) return;

    // Create a stable wrapper that uses the ref
    const stableHandler = (sizes) => {
      if (callbackRef.current) {
        callbackRef.current(sizes);
      }
    };

    resizeHandlers.add(stableHandler);
    
    return () => {
      resizeHandlers.delete(stableHandler);
    };
  }, []); // Empty dependency array - only run once

  return sizesRef.current;
}
