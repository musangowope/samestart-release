import { useState, useEffect, useCallback } from 'react';
import theme from '../constants/theme';

const isVpMobile = (vpWidth = 0) =>
  vpWidth < theme.breakpointValues.sm;

// Hook
export default function useIsMobile() {
  const isClient = typeof window === 'object';

  const getVpWidth = useCallback(() => {
    return isClient ? window.innerWidth : undefined;
  }, [isClient]);

  const [vpWidth, setVpWidth] = useState(getVpWidth);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setVpWidth(getVpWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVpWidth, isClient]); // Empty array ensures that effect is only run on mount and unmount

  return isVpMobile(vpWidth);
}
