import { useState, useEffect, useCallback } from 'react';

// Hook
export function useGetVPHeight() {
  const isClient = typeof window === 'object';
  const getVpHeight = useCallback(() => {
    return isClient ? window.innerHeight : undefined;
  }, [isClient]);

  const [vpHeight, setVpHeight] = useState(getVpHeight);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    function handleResize() {
      setVpHeight(getVpHeight());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVpHeight, isClient]); // Empty array ensures that effect is only run on mount and unmount

  return vpHeight;
}
