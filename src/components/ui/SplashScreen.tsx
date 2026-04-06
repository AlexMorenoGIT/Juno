"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";

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
      <Logo variant="monogramme" color="blanc" height={96} />
    </div>
  );
}
