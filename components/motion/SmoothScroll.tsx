"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

function RouteReset() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Jump to top on navigation so Lenis doesn't animate from the old offset
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 1,
        smoothWheel: true,
        anchors: { offset: -80 },
      }}
    >
      <RouteReset />
      {children}
    </ReactLenis>
  );
}
