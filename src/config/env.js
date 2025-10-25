// Environment configuration
// This file determines which endpoint to use based on the build environment

const ENV = import.meta.env.VITE_MODE || import.meta.env.MODE || 'development';

const config = {
  development: {
    SOCKET_ENDPOINT: 'https://yut-game-server-dev-6734615ef53a.herokuapp.com/',
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

console.log(`[ENV] Mode: ${ENV}`);
console.log(`[ENV] Socket: ${SOCKET_ENDPOINT}`);
console.log(`[ENV] Logging: ${ENABLE_LOGGING ? 'enabled' : 'disabled'}`);