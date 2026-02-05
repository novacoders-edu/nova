import { useState, useEffect } from "react";

/**
 * A hook that works like useState but persists the value to localStorage.
 * 
 * @param {any} defaultValue - The initial value if no value is found in storage
 * @param {string} key - The localStorage key
 * @returns {[any, Function]} - State and setter
 */
const usePersistedState = (defaultValue, key) => {
  const [state, setState] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};

export default usePersistedState;
