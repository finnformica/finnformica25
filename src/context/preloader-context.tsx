"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type PreloaderContextValue = {
  /** True once the preloader has handed off to the page. */
  isReady: boolean;
  /** Called by the Preloader when it's safe to start page-level animations. */
  setReady: () => void;
};

const PreloaderContext = createContext<PreloaderContextValue>({
  isReady: false,
  setReady: () => {},
});

export const usePreloader = () => useContext(PreloaderContext);

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const setReady = useCallback(() => setIsReady(true), []);
  const value = useMemo(() => ({ isReady, setReady }), [isReady, setReady]);

  return (
    <PreloaderContext.Provider value={value}>
      {children}
    </PreloaderContext.Provider>
  );
};
