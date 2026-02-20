import { useState, useEffect, useCallback } from 'react';
import { subscribe, getSampradayas, getSaints, getBooks, getVanis } from '@/lib/dataStore';

export function useDataStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = subscribe(() => setTick(t => t + 1));
    return () => { unsub(); };
  }, []);

  return {
    sampradayas: getSampradayas(),
    saints: getSaints(),
    books: getBooks(),
    vanis: getVanis(),
  };
}
