"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";

/* ---------------------------------------------------------------- */
/* Constants                                                         */
/* ---------------------------------------------------------------- */

const SCAN_SIZE = 280;         // carré de scan (280×280)
const VIEWPORT_RADIUS = 28;    // coin arrondi du trou
const CORNER_SIZE = 36;        // taille du L (px)
const STROKE = 4;              // épaisseur du trait
const CORNER_R = 22;           // arrondi du L

interface Props {
  onClose: () => void;
  onNoQR: () => void;
}

export function QRScannerModal({ onClose, onNoQR }: Props) {
  const router = useRouter();
  const videoRef  = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | null>(null);
  const handledRef = useRef(false);
  const [camError, setCamError] = useState<string | null>(null);

  /* ---- Caméra + boucle de scan ---------------------------------- */
  useEffect(() => {
    let stream: MediaStream | null = null;

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        video.setAttribute("playsinline", "true");
        await video.play();
        tick();
      } catch {
        setCamError("Impossible d'accéder à la caméra. Autorise l'accès dans les réglages.");
      }
    }

    function tick() {
      const video  = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (video.readyState >= video.HAVE_ENOUGH_DATA) {
        const w = video.videoWidth;
        const h = video.videoHeight;
        if (w && h) {
          canvas.width  = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (ctx) {
            ctx.drawImage(video, 0, 0, w, h);
            const img = ctx.getImageData(0, 0, w, h);
            const code = jsQR(img.data, img.width, img.height, {
              inversionAttempts: "dontInvert",
            });
            if (code?.data && !handledRef.current) {
              handledRef.current = true;
              handleDetected(code.data);
              return;
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    function handleDetected(raw: string) {
      try {
        const url = new URL(raw);
        if (url.hostname === window.location.hostname) {
          router.push(url.pathname + url.search);
          return;
        }
      } catch {
        /* raw n'est pas une URL → fallback */
      }
      router.push("/formation/modules");
    }

    start();

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [onClose, router]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Scanner mon QR code"
      className="fixed inset-0 z-50 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* ── Flux caméra ─────────────────────────────────────────── */}
      <video
        ref={videoRef}
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(1)" }}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* ── Overlay noir 70 % avec trou central ────────────────── */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: SCAN_SIZE,
          height: SCAN_SIZE,
          borderRadius: VIEWPORT_RADIUS,
          boxShadow: "0 0 0 9999px rgba(0,0,0,0.7)",
        }}
      />

      {/* ── Message erreur caméra ──────────────────────────────── */}
      {camError && (
        <div className="absolute inset-x-6 top-1/4 text-center font-poppins text-[14px] text-white/90">
          {camError}
        </div>
      )}

      {/* ── Close (simple croix blanche 26 × 26) ───────────────── */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-5 z-30 cursor-pointer appearance-none bg-transparent border-0 outline-none focus:outline-none active:bg-transparent select-none"
        style={{
          top: "calc(env(safe-area-inset-top) + 16px)",
          WebkitTapHighlightColor: "transparent",
          WebkitAppearance: "none",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 4 L22 22 M22 4 L4 22"
            stroke="#ffffff"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* ── Cadre scanner (coins L + tirets latéraux + scan line) */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none overflow-hidden"
        style={{ width: SCAN_SIZE, height: SCAN_SIZE, borderRadius: VIEWPORT_RADIUS }}
      >
        <CornerBracket position="tl" />
        <CornerBracket position="tr" />
        <CornerBracket position="bl" />
        <CornerBracket position="br" />

        <SideTick side="left"  />
        <SideTick side="right" />

        {/* Scan line (barre deep-700 3px + trail gradient) */}
        <ScanLine />
      </div>

      {/* ── CTA blanc juste EN-DESSOUS du cadre ────────────────── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
        style={{
          top: `calc(50% + ${SCAN_SIZE / 2}px + 32px)`,
          width: `${SCAN_SIZE}px`,
        }}
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={onNoQR}
          className="w-full h-14 rounded-full bg-white font-poppins font-semibold text-[15px] text-slate-900 cursor-pointer appearance-none border-0 outline-none focus:outline-none select-none"
          style={{
            WebkitTapHighlightColor: "transparent",
            WebkitAppearance: "none",
            boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
          }}
        >
          Je n&apos;ai pas de QR code
        </motion.button>
        <button
          type="button"
          className="mt-4 font-poppins text-white/85 text-[13px] hover:text-white underline-offset-4 hover:underline cursor-pointer bg-transparent border-0 outline-none focus:outline-none select-none"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          Où trouver mon QR code ?
        </button>
      </div>
    </motion.div>
  );
}

/* ================================================================ */
/* Corner L — arrondi aux 2 bouts (strokeLinecap="round")            */
/* ================================================================ */

type CornerPos = "tl" | "tr" | "bl" | "br";

function CornerBracket({ position }: { position: CornerPos }) {
  const S  = CORNER_SIZE;
  const R  = CORNER_R;
  const W  = STROKE;

  // Chemin L arrondi (quart de cercle entre les deux branches)
  //   tl :   (0, S) → (0, R) ─╮
  //                          ↪ (R, 0) → (S, 0)
  const paths: Record<CornerPos, string> = {
    tl: `M ${W/2} ${S} L ${W/2} ${R + W/2} A ${R} ${R} 0 0 1 ${R + W/2} ${W/2} L ${S} ${W/2}`,
    tr: `M 0 ${W/2} L ${S - R - W/2} ${W/2} A ${R} ${R} 0 0 1 ${S - W/2} ${R + W/2} L ${S - W/2} ${S}`,
    bl: `M ${W/2} 0 L ${W/2} ${S - R - W/2} A ${R} ${R} 0 0 0 ${R + W/2} ${S - W/2} L ${S} ${S - W/2}`,
    br: `M 0 ${S - W/2} L ${S - R - W/2} ${S - W/2} A ${R} ${R} 0 0 0 ${S - W/2} ${S - R - W/2} L ${S - W/2} 0`,
  };

  const pos: Record<CornerPos, React.CSSProperties> = {
    tl: { top: 0, left: 0 },
    tr: { top: 0, right: 0 },
    bl: { bottom: 0, left: 0 },
    br: { bottom: 0, right: 0 },
  };

  return (
    <svg
      width={S}
      height={S}
      viewBox={`0 0 ${S} ${S}`}
      className="absolute"
      style={pos[position]}
      aria-hidden
    >
      <path
        d={paths[position]}
        stroke="#ffffff"
        strokeWidth={W}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ================================================================ */
/* Side tick — petit trait au milieu des arêtes gauche et droite     */
/* ================================================================ */

function SideTick({ side }: { side: "left" | "right" }) {
  const LENGTH = 32;
  return (
    <svg
      width={STROKE}
      height={LENGTH}
      viewBox={`0 0 ${STROKE} ${LENGTH}`}
      className="absolute top-1/2 -translate-y-1/2"
      style={side === "left" ? { left: 0 } : { right: 0 }}
      aria-hidden
    >
      <line
        x1={STROKE / 2}
        y1={STROKE / 2}
        x2={STROKE / 2}
        y2={LENGTH - STROKE / 2}
        stroke="#ffffff"
        strokeWidth={STROKE}
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ================================================================ */
/* Scan line — barre deep-700 + trail gradient                       */
/* ================================================================ */

function ScanLine() {
  const TRAIL = 60; // hauteur du gradient sous la barre
  const OVERSHOOT = 40; // dépasse au-dessus
  return (
    <motion.div
      className="absolute left-0 right-0 top-0 will-change-transform"
      style={{ height: 3 + TRAIL, pointerEvents: "none" }}
      initial={{ y: SCAN_SIZE }}
      animate={{
        y: [
          SCAN_SIZE,
          -OVERSHOOT,
          SCAN_SIZE,
        ],
      }}
      transition={{
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
      aria-hidden
    >
      {/* Barre deep-700 pleine */}
      <div
        style={{
          height: 3,
          background: "#8F21CF",
          boxShadow: "0 0 10px rgba(143,33,207,0.85)",
        }}
      />
      {/* Trail gradient (dessous) */}
      <div
        style={{
          height: TRAIL,
          background:
            "linear-gradient(180deg, rgba(143,33,207,1) 0%, rgba(224,179,255,0) 50%)",
        }}
      />
    </motion.div>
  );
}
