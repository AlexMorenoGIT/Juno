"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { illustrations } from "@/lib/illustrations";
import type {} from "@/types/pwa";

type Platform = "ios" | "android" | "desktop" | "loading";

const ease = [0.22, 1, 0.36, 1] as const;

export default function GatePage() {
  const router = useRouter();
  const [platform,     setPlatform]    = useState<Platform>("loading");
  const [installing,   setInstalling]  = useState(false);
  const [installed,    setInstalled]   = useState(false);
  const [showIosSheet, setShowIosSheet] = useState(false);

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

  const handleAndroidInstall = async () => {
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
    <div className="relative min-h-dvh overflow-hidden flex flex-col" style={{ background: "#FFFDF8" }}>

      {/* Cercle décoratif haut-droit */}
      <div className="absolute pointer-events-none" style={{
        top: -140, right: -140, width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,140,0,0.16) 0%, transparent 70%)",
      }} />

      {/* Arcs bas-gauche */}
      <svg className="absolute bottom-0 left-0 pointer-events-none" width="180" height="180" viewBox="0 0 200 200" fill="none" aria-hidden>
        <circle cx="0" cy="200" r="160" stroke="#FF8C00" strokeWidth="1.5" strokeOpacity="0.1"/>
        <circle cx="0" cy="200" r="100" stroke="#FF8C00" strokeWidth="1" strokeOpacity="0.07"/>
      </svg>

      {/* Header */}
      <motion.div
        className="relative z-10 flex items-center justify-between px-6 pt-12 pb-2"
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.55, ease }}
      >
        <Logo variant="paysage" color="couleur" height={28} />
        <span className="font-museo text-[10px] tracking-[0.2em] uppercase" style={{ color: "#FF8C00" }}>
          Bêta
        </span>
      </motion.div>

      {/* Illustration hero */}
      <motion.div
        className="relative z-10 flex justify-center mt-4"
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.1, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="absolute pointer-events-none" style={{
          width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,140,0,0.14) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        }} />
        <Image
          src={illustrations.torus2}
          alt="Lampe JUNO"
          width={210} height={210}
          priority
          style={{ filter: "drop-shadow(0 20px 40px rgba(255,140,0,0.22))" }}
        />
      </motion.div>

      {/* Texte hero */}
      <div className="relative z-10 px-6 mt-5">
        <motion.div
          className="flex items-center gap-3 mb-3"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.55, ease }}
        >
          <div className="h-px flex-1" style={{ background: "#FF8C00", opacity: 0.25 }} />
          <span className="font-museo text-[11px] tracking-[0.25em] uppercase" style={{ color: "#FF8C00" }}>
            Apprendre autrement
          </span>
          <div className="h-px flex-1" style={{ background: "#FF8C00", opacity: 0.25 }} />
        </motion.div>

        <motion.h1
          className="font-poetsen leading-[0.95]"
          style={{ fontSize: "clamp(2.6rem, 11vw, 3.4rem)", color: "#1a1a1a" }}
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55, ease }}
        >
          Construis.{" "}
          <span style={{ color: "#FF8C00" }}>Échoue.</span>{" "}
          Recommence.
        </motion.h1>

        <motion.p
          className="font-poppins mt-4 leading-relaxed"
          style={{ fontSize: "0.875rem", color: "#727272", maxWidth: 320 }}
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.55, ease }}
        >
          JUNO t'apprend à entreprendre en construisant une lampe LEGO — étape par étape, échec compris.
        </motion.p>
      </div>

      {/* CTA */}
      <motion.div
        className="relative z-10 px-6 mt-8 pb-12 flex flex-col gap-3 mt-auto"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 0.55, ease }}
      >
        <AnimatePresence mode="wait">
          {platform === "android" && !installed && (
            <AndroidButton key="android" onInstall={handleAndroidInstall} installing={installing} />
          )}
          {platform === "android" && installed && (
            <InstalledFeedback key="done" />
          )}
          {platform === "ios" && (
            <IosButton key="ios" onOpen={() => setShowIosSheet(true)} />
          )}
          {platform === "desktop" && (
            <DesktopMessage key="desktop" />
          )}
        </AnimatePresence>

        <p className="font-poppins text-center text-[0.65rem] tracking-widest uppercase" style={{ color: "#D3D3D3" }}>
          Projet de Master · JUNO 2026
        </p>
      </motion.div>

      {/* Bottom sheet iOS */}
      <AnimatePresence>
        {showIosSheet && <IosBottomSheet onClose={() => setShowIosSheet(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ── Android ──────────────────────────────────────────────────────────── */

function AndroidButton({ onInstall, installing }: { onInstall: () => void; installing: boolean }) {
  return (
    <motion.button
      onClick={onInstall}
      disabled={installing}
      className="w-full h-[58px] rounded-2xl font-poetsen text-white text-lg tracking-widest relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FF8C00 0%, #e07800 100%)",
        boxShadow: "0 8px 32px rgba(255,140,0,0.32)",
      }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)" }}
        animate={{ x: ["-120%", "220%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      {installing ? "Installation…" : "Installer JUNO"}
    </motion.button>
  );
}

/* ── iOS ──────────────────────────────────────────────────────────────── */

function IosButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="w-full h-[58px] rounded-2xl font-poetsen text-white text-lg tracking-widest"
      style={{
        background: "linear-gradient(135deg, #FF8C00 0%, #e07800 100%)",
        boxShadow: "0 8px 32px rgba(255,140,0,0.32)",
      }}
    >
      Installer JUNO
    </button>
  );
}

/* ── Desktop ──────────────────────────────────────────────────────────── */

function DesktopMessage() {
  return (
    <div className="w-full rounded-2xl px-5 py-4 flex items-center gap-4"
      style={{ background: "#FFF3E0", border: "1px solid rgba(255,140,0,0.2)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(255,140,0,0.12)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF8C00" strokeWidth="1.8" strokeLinecap="round">
          <rect x="5" y="2" width="14" height="20" rx="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      </div>
      <div>
        <p className="font-poppins text-sm font-medium" style={{ color: "#1a1a1a" }}>Application mobile</p>
        <p className="font-poppins text-xs mt-0.5" style={{ color: "#727272" }}>
          Ouvre ce lien sur ton téléphone pour installer JUNO.
        </p>
      </div>
    </div>
  );
}

/* ── Feedback installé ────────────────────────────────────────────────── */

function InstalledFeedback() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center gap-3 h-[58px] rounded-2xl"
      style={{ background: "rgba(37,226,173,0.08)", border: "1px solid rgba(37,226,173,0.25)" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25e2ad" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span className="font-poetsen tracking-wide" style={{ color: "#25e2ad" }}>Installé — ouverture…</span>
    </motion.div>
  );
}

/* ── Bottom sheet iOS ─────────────────────────────────────────────────── */

function IosBottomSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40"
        style={{ background: "rgba(0,0,0,0.35)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl px-6 pb-10 pt-5"
        style={{ background: "#FFFDF8" }}
        initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 38 }}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "#D3D3D3" }} />

        <h2 className="font-poetsen text-xl mb-1" style={{ color: "#1a1a1a" }}>
          Ajouter à l'écran d'accueil
        </h2>
        <p className="font-poppins text-sm mb-6" style={{ color: "#727272" }}>
          3 étapes rapides depuis Safari
        </p>

        <div className="flex flex-col gap-3">
          {[
            {
              n: 1,
              title: <>Appuie sur <span style={{ color: "#FF8C00" }}>Partager</span></>,
              sub: <div className="flex items-center gap-1.5 mt-0.5"><ShareIcon /><span className="font-poppins text-xs" style={{ color: "#727272" }}>en bas de Safari</span></div>,
            },
            {
              n: 2,
              title: <>Sélectionne <span style={{ color: "#FF8C00" }}>« Sur l'écran d'accueil »</span></>,
              sub: null,
            },
            {
              n: 3,
              title: <>Appuie sur <span style={{ color: "#FF8C00" }}>« Ajouter »</span> en haut à droite</>,
              sub: null,
            },
          ].map(({ n, title, sub }) => (
            <div key={n} className="flex items-center gap-4 rounded-2xl px-4 py-3.5"
              style={{ background: "#FFF3E0", border: "1px solid rgba(255,140,0,0.15)" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#FF8C00" }}>
                <span className="font-museo text-white text-sm font-bold">{n}</span>
              </div>
              <div className="flex-1">
                <p className="font-poppins text-sm" style={{ color: "#1a1a1a" }}>{title}</p>
                {sub}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 h-12 rounded-xl font-poppins text-sm font-medium"
          style={{ background: "#F0F0F0", color: "#727272" }}
        >
          Fermer
        </button>
      </motion.div>
    </>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 18 20" fill="none"
      stroke="#FF8C00" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 13V3M9 3L5.5 6.5M9 3L12.5 6.5"/>
      <path d="M1 13v4a2 2 0 002 2h12a2 2 0 002-2v-4"/>
    </svg>
  );
}
