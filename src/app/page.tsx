"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

/* ─── Types ──────────────────────────────────────────────────────────── */

type Platform = "ios" | "android" | "desktop" | "loading";

import type {} from "@/types/pwa";

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function GatePage() {
  const router   = useRouter();
  const [platform,   setPlatform]   = useState<Platform>("loading");
  const [installing, setInstalling] = useState(false);
  const [installed,  setInstalled]  = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as { standalone?: boolean }).standalone === true);

    if (isStandalone) { router.replace("/formation"); return; }

    if (/iPhone|iPad|iPod/.test(ua)) setPlatform("ios");
    else if (/Android/.test(ua))     setPlatform("android");
    else                             setPlatform("desktop");
  }, [router]);

  const handleInstall = async () => {
    const prompt = window.__deferredInstallPrompt;
    if (!prompt) return;
    setInstalling(true);
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setTimeout(() => router.replace("/formation"), 1200);
    }
    setInstalling(false);
  };

  if (platform === "loading") return null;

  return (
    <div className="relative min-h-dvh bg-slate-950 overflow-hidden flex flex-col items-center select-none">

      {/* ── Lueur ambiante orange depuis le haut ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 120% 55% at 50% -8%, rgba(255,140,0,0.22) 0%, transparent 65%)"
      }} />

      {/* ── Texture grain ── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" aria-hidden>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)"/>
      </svg>

      {/* ── Grand cône de lumière ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <GrandCone />
      </div>

      {/* ── Contenu principal ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-7 pt-0 pb-12 min-h-dvh">

        {/* Logo flottant */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0, filter: "drop-shadow(0 0 40px rgba(255,140,0,0.55)) drop-shadow(0 0 90px rgba(255,140,0,0.2))" }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Logo variant="monogramme" color="blanc" height={92} />
        </motion.div>

        {/* Titre */}
        <motion.h1
          className="font-poetsen text-white mt-5 tracking-[0.18em]"
          style={{ fontSize: "2.75rem", lineHeight: 1 }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          JUNO
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-museo text-slate-400 text-center mt-3 text-[0.82rem] leading-relaxed tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Construis. Apprends. Entreprends.
        </motion.p>

        {/* Séparateur */}
        <motion.div
          className="mt-8 h-px w-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,140,0,0.45), transparent)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        />

        {/* CTA */}
        <div className="mt-8 w-full">
          <AnimatePresence mode="wait">
            {platform === "android" && !installed && (
              <AndroidCTA key="android" onInstall={handleInstall} installing={installing} />
            )}
            {platform === "android" && installed && (
              <InstalledConfirm key="done" />
            )}
            {platform === "ios" && (
              <IosCTA key="ios" />
            )}
            {platform === "desktop" && (
              <DesktopCTA key="desktop" />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.p
          className="font-poppins text-[0.65rem] text-slate-800 mt-auto pt-10 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Projet de Master · JUNO 2026
        </motion.p>
      </div>
    </div>
  );
}

/* ─── Grand cône de lumière ─────────────────────────────────────────── */

function GrandCone() {
  return (
    <svg width="360" height="560" viewBox="0 0 360 560" fill="none" aria-hidden>
      <defs>
        <linearGradient id="gc-cone" x1="180" y1="0" x2="180" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="white" stopOpacity="0.13"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="gc-streak" x1="180" y1="0" x2="180" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="white" stopOpacity="0.09"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <filter id="gc-blur">
          <feGaussianBlur stdDeviation="5"/>
        </filter>
      </defs>
      {/* Barre du haut */}
      <rect x="90" y="3" width="180" height="8" rx="4" fill="white" opacity="0.9" filter="url(#gc-blur)"/>
      <rect x="110" y="4" width="140" height="5" rx="2.5" fill="white" opacity="0.95"/>
      {/* Cône principal */}
      <path d="M180 11 L360 560 L0 560 Z" fill="url(#gc-cone)"/>
      {/* Strie centrale plus lumineuse */}
      <path d="M172 11 L188 11 L215 560 L145 560 Z" fill="url(#gc-streak)"/>
    </svg>
  );
}

/* ─── CTA Android ────────────────────────────────────────────────────── */

function AndroidCTA({ onInstall, installing }: { onInstall: () => void; installing: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="flex flex-col items-center gap-5"
    >
      <p className="font-poppins text-sm text-slate-500 text-center leading-relaxed">
        Installe l'application pour débloquer<br/>ton parcours entrepreneurial.
      </p>

      <motion.button
        onClick={onInstall}
        disabled={installing}
        className="w-full h-[58px] rounded-2xl font-poetsen text-white text-lg tracking-widest relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FF8C00 0%, #cc6702 100%)",
          boxShadow: "0 0 50px rgba(255,140,0,0.35), 0 6px 24px rgba(0,0,0,0.5)",
        }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)" }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
        {installing ? "Installation…" : "Installer JUNO"}
      </motion.button>

      <p className="font-poppins text-[0.7rem] text-slate-700 tracking-wide">
        Gratuit · Aucune donnée requise
      </p>
    </motion.div>
  );
}

/* ─── CTA iOS ────────────────────────────────────────────────────────── */

function IosCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="flex flex-col gap-3"
    >
      <p className="font-poppins text-sm text-slate-500 text-center mb-1 leading-relaxed">
        Ajoute JUNO à ton écran d'accueil<br/>pour accéder à l'application.
      </p>

      {/* Étape 1 */}
      <div className="flex items-center gap-4 rounded-2xl px-4 py-3.5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,140,0,0.12)", border: "1px solid rgba(255,140,0,0.2)" }}
        >
          <span className="font-museo text-june-500 text-sm font-bold">1</span>
        </div>
        <div className="flex-1">
          <p className="font-poppins text-white text-sm">Appuie sur</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <ShareIcon />
            <p className="font-poppins text-slate-400 text-xs">dans la barre Safari</p>
          </div>
        </div>
      </div>

      {/* Étape 2 */}
      <div className="flex items-center gap-4 rounded-2xl px-4 py-3.5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,140,0,0.12)", border: "1px solid rgba(255,140,0,0.2)" }}
        >
          <span className="font-museo text-june-500 text-sm font-bold">2</span>
        </div>
        <div className="flex-1">
          <p className="font-poppins text-white text-sm">Sélectionne</p>
          <p className="font-poppins text-slate-400 text-xs mt-0.5">
            «&nbsp;Sur l'écran d'accueil&nbsp;»
          </p>
        </div>
        <AddIcon />
      </div>

      {/* Étape 3 */}
      <div className="flex items-center gap-4 rounded-2xl px-4 py-3.5"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255,140,0,0.12)", border: "1px solid rgba(255,140,0,0.2)" }}
        >
          <span className="font-museo text-june-500 text-sm font-bold">3</span>
        </div>
        <p className="font-poppins text-slate-300 text-sm flex-1">
          Appuie sur <span className="text-white font-medium">«&nbsp;Ajouter&nbsp;»</span>
        </p>
      </div>
    </motion.div>
  );
}

/* ─── CTA Desktop ────────────────────────────────────────────────────── */

function DesktopCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="rounded-2xl px-6 py-5 text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <p className="font-museo text-slate-300 text-sm tracking-wide mb-2">Application mobile</p>
      <p className="font-poppins text-slate-500 text-xs leading-relaxed">
        JUNO est conçue pour mobile.<br/>
        Ouvre ce lien sur ton iPhone ou Android<br/>pour installer l'application.
      </p>
    </motion.div>
  );
}

/* ─── Confirmation installation ─────────────────────────────────────── */

function InstalledConfirm() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-3 py-4"
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "rgba(37,226,173,0.12)", border: "1px solid rgba(37,226,173,0.25)" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25e2ad" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <p className="font-poetsen text-white tracking-wide">Installation réussie</p>
      <p className="font-poppins text-xs text-slate-500">Ouverture de JUNO…</p>
    </motion.div>
  );
}

/* ─── Icônes iOS ─────────────────────────────────────────────────────── */

function ShareIcon() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="#FF8C00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 13V3M9 3L5.5 6.5M9 3L12.5 6.5"/>
      <path d="M1 13v4a2 2 0 002 2h12a2 2 0 002-2v-4"/>
    </svg>
  );
}

function AddIcon() {
  return (
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#a3a3a3" strokeWidth="1.8" strokeLinecap="round">
        <line x1="7" y1="1" x2="7" y2="13"/><line x1="1" y1="7" x2="13" y2="7"/>
      </svg>
    </div>
  );
}
