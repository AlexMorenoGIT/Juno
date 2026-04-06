"use client";

import { useState, useEffect } from "react";
export function SplashScreen() {
  const [visible, setVisible]   = useState(true);
  const [fadeOut, setFadeOut]   = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true),  600);
    const t2 = setTimeout(() => setVisible(false), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-screen${fadeOut ? " splash-out" : ""}`}>
      {/* Mark blanc pur sur fond june-600 */}
      <svg width="96" height="96" viewBox="0 0 84 84" fill="none" className="splash-logo" aria-label="JUNO">
        <path d="M42.2609 51.7602C32.4501 51.7056 24.8389 43.6097 25.0025 34.0776C25.1722 24.4849 33.1227 16.7343 42.8548 17.007C52.5869 17.2797 59.8345 25.1878 59.7193 34.5866C59.6042 44.0096 51.9506 51.8208 42.2609 51.7602ZM41.6731 27.739C37.8494 28.145 35.2921 31.5809 35.7406 35.1926C36.189 38.8042 39.4492 41.4282 43.1033 41.0343C46.7573 40.6404 49.4418 37.3256 48.9995 33.6049C48.5814 30.1023 45.4605 27.339 41.6731 27.739Z" fill="white"/>
        <path d="M54.4109 67.5157L30.317 67.5218L30.3351 57.7594L54.4048 57.7655L54.4109 67.5157Z" fill="white"/>
      </svg>
    </div>
  );
}
