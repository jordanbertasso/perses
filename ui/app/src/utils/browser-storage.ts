import { useState, useCallback, useEffect } from 'react';

type StorageTuple<T> = [T, (next: T) => void];

/**
 * Just like useState but gets/sets the value in the browser's local storage.
 * 'key' should be a constant string. 'initialValue' is returned when local
 * storage does not have any data yet.
 */
export function useLocalStorage<T>(key: string, initialValue: T): StorageTuple<T> {
  const { value, setValueAndStore } = useStorage(global.localStorage, key, initialValue);
  return [value, setValueAndStore];
}

/**
 * Just like useState, but gets/sets the value in the browser's session storage.
 * 'key' should be a constant string. 'initialValue' is returned when session
 * storage does not have any data yet.
 */
export function useSessionStorage<T>(key: string, initialValue: T): StorageTuple<T> {
  const { value, setValueAndStore } = useStorage(global.sessionStorage, key, initialValue);
  return [value, setValueAndStore];
}

/**
 * Just like useLocalStorage, but syncs values across browser tabs.
 */
export function useLocalStorageSynced<T>(key: string, initialValue: T): StorageTuple<T> {
  const { value, setValue, setValueAndStore } = useStorage<T>(global.localStorage, key, initialValue);

  useEffect(() => {
    // When local storage changes due to some other tab updating it, just
    // update our local state value
    const sync = (e: StorageEvent) => {
      if (e.key !== key || e.newValue === null) {
        return;
      }
      setValue(JSON.parse(e.newValue));
    };

    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('storage', sync);
    };
  }, [key, setValue]);

  return [value, setValueAndStore];
}

// Common functionality used by all storage hooks
function useStorage<T>(storage: Storage, key: string, initialValue: T) {
  // Use state so that changes cause the page to re-render
  const [value, setValue] = useState<T>(() => {
    try {
      const json = storage.getItem(key);
      if (json !== null) {
        return JSON.parse(json);
      }
    } catch {}

    // Either the value isn't in storage yet or JSON parsing failed, so
    // set to the initial value in both places
    storage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  });

  // Set in both places
  const setValueAndStore = useCallback(
    (val: T) => {
      setValue(val);
      storage.setItem(key, JSON.stringify(val));
    },
    [setValue, storage, key]
  );

  return { value, setValue, setValueAndStore };
}
