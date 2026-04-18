"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
}

export function NoQRCodeSheet({ onClose }: Props) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Tu n'as pas de QR code"
      className="fixed inset-x-0 top-0 z-[60] bg-white flex flex-col overflow-hidden"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 32, stiffness: 320 }}
      style={{
        height: "100dvh",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      {/* ── Close ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 z-20 cursor-pointer appearance-none bg-transparent border-0 outline-none focus:outline-none select-none"
        style={{
          top: "calc(env(safe-area-inset-top) + 16px)",
          WebkitTapHighlightColor: "transparent",
          WebkitAppearance: "none",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
          <path
            d="M4 4 L22 22 M22 4 L4 22"
            stroke="#1a1a1a"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* ── Banner rouge + icône ──────────────────────────────── */}
      <div className="relative w-full shrink-0" style={{ height: 155 }}>
        <Image
          src="/illustrations/bg/lamp-sheet-bg.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ bottom: -60 }}>
          <Image
            src="/illustrations/no-qr.png"
            alt=""
            width={140}
            height={140}
            priority
            unoptimized
          />
        </div>
      </div>

      {/* ── Contenu centré ────────────────────────────────────── */}
      <div
        className="flex flex-col items-center text-center px-8"
        style={{ marginTop: 80 }}
      >
        <p className="font-poppins font-normal text-[10px] text-slate-500">
          Pour accéder à la formation
        </p>
        <h2 className="font-museo font-extrabold text-[20px] text-slate-900 mt-2">
          💡 Tu as besoin de la lampe 💡
        </h2>
        <div className="bg-slate-300 mt-4" style={{ width: 150, height: 1 }} />
        <p className="font-poppins font-normal text-[12px] text-slate-500 mt-4 leading-snug">
          Elle fait partie de l&apos;expérience
          <br />
          et t&apos;accompagne dans ton parcours
        </p>
      </div>

      {/* ── CTA orange ────────────────────────────────────────── */}
      <div
        className="px-6"
        style={{
          marginTop: 80,
          marginBottom: "calc(env(safe-area-inset-bottom) + 24px)",
        }}
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          className="w-full h-12 rounded-full font-poppins font-semibold text-white text-[15px] cursor-pointer appearance-none border-0 outline-none focus:outline-none select-none"
          style={{
            background: "var(--color-june-600)",
            boxShadow: "0 6px 20px rgba(255,140,0,0.28)",
            WebkitTapHighlightColor: "transparent",
            WebkitAppearance: "none",
          }}
        >
          Découvrir la lampe
        </motion.button>
      </div>
    </motion.div>
  );
}
