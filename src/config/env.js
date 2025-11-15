// Environment configuration
// This file determines which endpoint to use based on the build environment

// Check if running on localhost
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// import.meta.env.VITE_MODE is set in vite.config.js
// Override to 'development' if on localhost
const ENV = isLocalhost ? 'development' : (import.meta.env.VITE_MODE || 'production');

const config = {
  development: {
    SOCKET_ENDPOINT: 'https://yut-game-server-dev-6734615ef53a.herokuapp.com/',
    // SOCKET_ENDPOINT: 'http://localhost:5000',
    ENABLE_LOGGING: false
  },
  production: {
    SOCKET_ENDPOINT: 'https://yoot-game-6c96a9884664.herokuapp.com/',
    ENABLE_LOGGING: true
  }
};

// Export the configuration for the current environment
export const SOCKET_ENDPOINT = config[ENV]?.SOCKET_ENDPOINT || config.development.SOCKET_ENDPOINT;
export const ENABLE_LOGGING = config[ENV]?.ENABLE_LOGGING || config.development.ENABLE_LOGGING;
export const IS_PRODUCTION = ENV === 'production';
export const IS_DEV = ENV === 'development';