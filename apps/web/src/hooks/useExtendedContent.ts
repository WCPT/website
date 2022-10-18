import { useRef, useState, useCallback } from 'react';

export const useExtendedContent = () => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  const toggle = useCallback(() => {
    setVisible((isVisible) => !isVisible);
    // @ts-ignore
    if (isVisible && ref.current) {
      // @ts-ignore
      ref.current.scrollIntoView();
    }
  }, [isVisible]);

  return {
    ref,
    isVisible,
    toggle,
  };
};

export default useExtendedContent;
