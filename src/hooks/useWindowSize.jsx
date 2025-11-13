import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Shared sizes object - single source of truth
const sharedSizes = {
  width: typeof window !== 'undefined' ? window.innerWidth : 1920,
  height: typeof window !== 'undefined' ? window.innerHeight : 1080,
  pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
  resolution: new THREE.Vector2(
    typeof window !== 'undefined' ? window.innerWidth * Math.min(window.devicePixelRatio, 2) : 1920,
    typeof window !== 'undefined' ? window.innerHeight * Math.min(window.devicePixelRatio, 2) : 1080
  )
};

// Single resize handler - only one listener for the entire app
let isListenerAttached = false;
const callbacks = new Set();

function handleResize() {
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  sharedSizes.width = window.innerWidth;
  sharedSizes.height = window.innerHeight;
  sharedSizes.pixelRatio = pixelRatio;
  sharedSizes.resolution.set(
    window.innerWidth * pixelRatio,
    window.innerHeight * pixelRatio
  );
  
  // Notify all subscribers
  callbacks.forEach(cb => cb(sharedSizes));
}

/**
 * Hook that provides window size without creating multiple resize listeners
 * @param {Function} [onResize] - Optional callback when window resizes
 * @returns {Object} sizes object with width, height, pixelRatio, and resolution
 */
export function useWindowSize(onResize) {
  const sizesRef = useRef(sharedSizes);

  useEffect(() => {
    // Attach the single listener if not already attached
    if (!isListenerAttached && typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      isListenerAttached = true;
    }

    // Add this component's callback
    if (onResize) {
      callbacks.add(onResize);
    }

    return () => {
      // Remove this component's callback
      if (onResize) {
        callbacks.delete(onResize);
      }
      
      // If no more callbacks, remove the listener
      if (callbacks.size === 0 && isListenerAttached && typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        isListenerAttached = false;
      }
    };
  }, [onResize]);

  return sizesRef.current;
}

// Direct access for shaders that need it immediately
export function getWindowSizes() {
  return sharedSizes;
}

/**
 * Subscribe to window resize events
 * @param {Function} callback - Function to call on resize
 */
export function subscribeToResize(callback) {
  if (!isListenerAttached && typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
    isListenerAttached = true;
  }
  callbacks.add(callback);
}

/**
 * Unsubscribe from window resize events
 * @param {Function} callback - Function to remove
 */
export function unsubscribeFromResize(callback) {
  callbacks.delete(callback);
  
  // If no more callbacks, remove the listener
  if (callbacks.size === 0 && isListenerAttached && typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
    isListenerAttached = false;
  }
}
