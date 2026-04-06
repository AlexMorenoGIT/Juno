"use client";

import { useState, useEffect } from "react";
import type {} from "@/types/pwa";

const DISMISSED_KEY = "juno-install-dismissed";

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      sessionStorage.getItem(DISMISSED_KEY)
    ) return;

    if (window.__deferredInstallPrompt) {
      setPromptEvent(window.__deferredInstallPrompt);
      setVisible(true);
      window.__deferredInstallPrompt = null;
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (outcome === "accepted") setVisible(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 rounded-2xl p-4 flex items-center gap-3 animate-slide-up"
      style={{
        background: "#272727",
        border: "1px solid rgba(255,140,0,0.25)",
        boxShadow: "0 0 24px rgba(255,140,0,0.08)",
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(255,140,0,0.12)", border: "1px solid rgba(255,140,0,0.2)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-poetsen text-sm text-white">Installer JUNO</p>
        <p className="font-poppins text-xs text-slate-500 mt-0.5">Accès rapide depuis ton écran d'accueil</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleInstall}
          className="px-3 py-1.5 rounded-lg text-xs font-poppins font-semibold"
          style={{ background: "rgba(255,140,0,0.15)", border: "1px solid rgba(255,140,0,0.3)", color: "#FF8C00" }}
        >
          Installer
        </button>
        <button
          onClick={handleDismiss}
          aria-label="Fermer"
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "#1a1a1a", border: "1px solid #404040" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#727272" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
