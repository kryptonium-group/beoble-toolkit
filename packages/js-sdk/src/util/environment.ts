export const isBrowser = new Function(
  'try {return this===window;}catch(e){ return false;}'
);

export const isNode = new Function(
  'try {return this===global;}catch(e){return false;}'
);

export const getEnv = () => {
  // Check if the environment is Node.js
  if (typeof process === 'object' && typeof require === 'function') {
    return false;
  }

  // Check if the environment is a
  // Service worker
  /*
  if (typeof importScripts === 'function') {
    return false;
  }*/

  // Check if the environment is a Browser
  if (typeof window === 'object') {
    return true;
  }

  return false;
};
