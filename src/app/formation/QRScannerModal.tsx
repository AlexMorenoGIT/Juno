"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";

interface Props {
  firstName: string;
  onClose: () => void;
}

export function QRScannerModal({ firstName, onClose }: Props) {
  const initial = (firstName.charAt(0) || "J").toUpperCase();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Scanner mon QR code"
      className="fixed inset-0 z-50 flex flex-col text-white"
      style={{
        background: "rgba(15,15,15,0.9)",
        backdropFilter: "blur(14px) saturate(130%)",
        WebkitBackdropFilter: "blur(14px) saturate(130%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* ── Close ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 z-10 size-10 rounded-full bg-white flex items-center justify-center shadow-lg text-slate-900 cursor-pointer"
        style={{ top: "calc(env(safe-area-inset-top) + 16px)" }}
      >
        <Icon name="xmark" size={16} />
      </button>

      {/* ── Cadre scanner ─────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative w-[280px] h-[300px]">
          <CornerBracket position="tl" />
          <CornerBracket position="tr" />
          <CornerBracket position="bl" />
          <CornerBracket position="br" />

          <motion.div
            className="absolute left-3 right-3 h-[3px] rounded-full"
            style={{
              background: "var(--color-deep-500)",
              boxShadow:
                "0 0 14px var(--color-deep-500), 0 0 4px rgba(255,255,255,0.6)",
            }}
            animate={{ top: ["8px", "calc(100% - 11px)", "8px"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full flex items-center justify-center font-poppins font-semibold text-white text-[18px] ring-4 ring-white/15"
            style={{ background: "var(--color-deep-700)" }}
            aria-hidden
          >
            {initial}
          </div>
        </div>
      </div>

      {/* ── Actions bas de page ───────────────────────────────── */}
      <div
        className="px-6 pt-4 flex flex-col items-center"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 28px)" }}
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 rounded-full bg-slate-900 text-white font-poppins font-semibold text-[15px] cursor-pointer"
        >
          Je n&apos;ai pas de QR code
        </motion.button>
        <button
          type="button"
          className="mt-5 font-poppins text-white/85 text-[13px] hover:text-white underline-offset-4 hover:underline cursor-pointer"
        >
          Où trouver mon QR code ?
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Coin du cadre scanner (4 L blancs)                                */
/* ---------------------------------------------------------------- */

type CornerPos = "tl" | "tr" | "bl" | "br";

function CornerBracket({ position }: { position: CornerPos }) {
  const size = 36;
  const thickness = 4;
  const radius = 28;

  const base: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
  };

  const map: Record<CornerPos, React.CSSProperties> = {
    tl: {
      top: 0, left: 0,
      borderTopLeftRadius: radius,
      borderTop: `${thickness}px solid #ffffff`,
      borderLeft: `${thickness}px solid #ffffff`,
    },
    tr: {
      top: 0, right: 0,
      borderTopRightRadius: radius,
      borderTop: `${thickness}px solid #ffffff`,
      borderRight: `${thickness}px solid #ffffff`,
    },
    bl: {
      bottom: 0, left: 0,
      borderBottomLeftRadius: radius,
      borderBottom: `${thickness}px solid #ffffff`,
      borderLeft: `${thickness}px solid #ffffff`,
    },
    br: {
      bottom: 0, right: 0,
      borderBottomRightRadius: radius,
      borderBottom: `${thickness}px solid #ffffff`,
      borderRight: `${thickness}px solid #ffffff`,
    },
  };

  return <div style={{ ...base, ...map[position] }} />;
}
