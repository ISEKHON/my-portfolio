"use client";

import { useEffect } from "react";

export default function GlowCursor() {
  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let lastTime = 0;
    const minInterval = 30;

    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < minInterval) return;
      lastTime = now;

      const dot = document.createElement("div");
      dot.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 8px;
        height: 8px;
        background: rgba(139, 92, 246, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.4s ease;
      `;
      document.body.appendChild(dot);
      setTimeout(() => (dot.style.opacity = "0"), 50);
      setTimeout(() => dot.remove(), 500);
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return null;
}
