import { useLayoutEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', updateSize);
    // updateSize();
    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};
