"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Preloader from "@/components/ui/Preloader";

const IntroContext = createContext(false);

const SESSION_KEY = "portfolio-intro-seen";

/** Shows the preloader once per session and tells the page when it's safe to animate in. */
export default function IntroProvider({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    if (!seen) return;
    const id = requestAnimationFrame(() => {
      setShowLoader(false);
      setDone(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setDone(true);
  }, []);

  const handleExit = useCallback(() => setShowLoader(false), []);

  return (
    <IntroContext.Provider value={done}>
      {showLoader && <Preloader onComplete={handleComplete} onExit={handleExit} />}
      {children}
    </IntroContext.Provider>
  );
}

export function useIntroDone() {
  return useContext(IntroContext);
}
