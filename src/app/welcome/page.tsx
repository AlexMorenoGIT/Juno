"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { illustrations } from "@/lib/illustrations";

/* ── Orbit geometry ─────────────────────────────────────────────────── */

const R = 118; // orbit radius in px
const rad = (d: number) => (d * Math.PI) / 180;
const onOrbit = (deg: number, r = R) => ({
  x: Math.round(r * Math.sin(rad(deg))),
  y: Math.round(-r * Math.cos(rad(deg))),
});

const AVATARS: { emoji: string; bg: string; size: number; x: number; y: number }[] = [
  { emoji: "👱‍♀️", bg: "#3ECFCA", size: 52, ...onOrbit(-62) },  // 10-11 h
  { emoji: "😎",   bg: "#F9A8C4", size: 48, ...onOrbit(52) },   // 2 h
  { emoji: "🎓",   bg: "#FFC84A", size: 52, ...onOrbit(148) },  // 5 h
  { emoji: "🧔🏿", bg: "#3ECFCA", size: 50, ...onOrbit(-148) }, // 7-8 h
  // Intérieur de l'orbite — légèrement décalé vers le haut-droit
  { emoji: "🥸",   bg: "#C0A2EE", size: 44, x: 40, y: -86 },
];

const SHAPES = [
  { src: illustrations.wands,      w: 92,  h: 108, x: -210, y: 6,    delay: 0.05 },
  { src: illustrations.torus,      w: 58,  h: 58,  x: -172, y: -60,  delay: 0.20 },
  { src: illustrations.polyhedron, w: 72,  h: 72,  x: 2,    y: -156, delay: 0.08 },
  { src: illustrations.glass,      w: 62,  h: 62,  x: 170,  y: 8,    delay: 0.12 },
  { src: illustrations.cube,       w: 55,  h: 55,  x: -150, y: 122,  delay: 0.28 },
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Page ───────────────────────────────────────────────────────────── */

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-dvh overflow-hidden flex flex-col select-none"
      style={{
        background: [
          "radial-gradient(ellipse 140% 65% at 10% -5%, rgba(195,162,248,0.68) 0%, transparent 52%)",
          "radial-gradient(ellipse 90% 50% at 88% 16%, rgba(255,198,188,0.52) 0%, transparent 50%)",
          "#FDFAF5",
        ].join(", "),
      }}
    >
      {/* ── Zone orbite ───────────────────────────────────────────── */}
      <div
        className="relative flex-1 flex items-center justify-center"
        style={{ minHeight: 380 }}
      >
        {/*
         * Ancre zéro-dimension au centre du système.
         * Tous les enfants sont positionnés en absolu via des offsets px.
         */}
        <div className="relative" style={{ width: 0, height: 0 }}>

          {/* Lignes radiales (constellation) */}
          <svg
            className="absolute pointer-events-none"
            style={{ top: -280, left: -280 }}
            width={560}
            height={560}
            viewBox="-280 -280 560 560"
          >
            {AVATARS.slice(0, 4).map((av, i) => {
              const len = Math.hypot(av.x, av.y);
              const fx = (av.x / len) * (R + 16);
              const fy = (av.y / len) * (R + 16);
              return (
                <line
                  key={i}
                  x1={0} y1={0}
                  x2={fx} y2={fy}
                  stroke="rgba(150,118,210,0.22)"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                />
              );
            })}
          </svg>

          {/* Anneau d'orbite */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: R * 2, height: R * 2,
              top: -R, left: -R,
              border: "1.5px solid rgba(150,118,210,0.2)",
            }}
          />

          {/* Halo blanc central */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 92, height: 92,
              top: -46, left: -46,
              background: "rgba(255,255,255,0.88)",
              boxShadow: "0 0 32px rgba(255,255,255,0.9), 0 4px 20px rgba(0,0,0,0.06)",
            }}
          />

          {/* Monogramme JUNO */}
          <motion.div
            className="absolute"
            style={{ transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 20 }}
          >
            <Logo variant="monogramme" color="couleur" height={52} />
          </motion.div>

          {/* Avatars */}
          {AVATARS.map((av, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full flex items-center justify-center overflow-hidden"
              style={{
                width: av.size,
                height: av.size,
                top: av.y - av.size / 2,
                left: av.x - av.size / 2,
                background: av.bg,
                fontSize: Math.round(av.size * 0.52),
                lineHeight: "1",
                boxShadow: "0 4px 18px rgba(0,0,0,0.13)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.28 + i * 0.07,
                type: "spring",
                stiffness: 380,
                damping: 22,
              }}
            >
              {av.emoji}
            </motion.div>
          ))}

          {/* Formes 3D flottantes */}
          {SHAPES.map((sh, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                width: sh.w,
                height: sh.h,
                top: sh.y - sh.h / 2,
                left: sh.x - sh.w / 2,
              }}
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -(6 + i * 1.8), 0],
              }}
              transition={{
                opacity: { delay: sh.delay, duration: 0.38 },
                scale: { delay: sh.delay, type: "spring", stiffness: 200, damping: 18 },
                y: {
                  delay: sh.delay + 0.7,
                  duration: 3.2 + i * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <Image src={sh.src} alt="" width={sh.w} height={sh.h} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Texte + CTA ───────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 px-7 pb-12"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.55, ease }}
      >
        {/* Logo wordmark */}
        <div className="mb-3">
          <Logo variant="paysage" color="couleur" height={28} />
        </div>

        <h1
          className="font-poetsen leading-[1.05]"
          style={{ fontSize: "clamp(2.1rem, 9.5vw, 2.75rem)", color: "#1a1a1a" }}
        >
          bienvenue sur
        </h1>
        <h1
          className="font-poetsen leading-[1.05] mb-8"
          style={{
            fontSize: "clamp(2.1rem, 9.5vw, 2.75rem)",
            background: "linear-gradient(90deg, #FF8C00 0%, #8F21CF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          l&apos;application
        </h1>

        <motion.button
          onClick={() => router.push("/formation")}
          className="w-full h-14 rounded-full font-poppins font-semibold text-white text-base tracking-wide"
          style={{
            background: "linear-gradient(135deg, #FF8C00 0%, #e07800 100%)",
            boxShadow: "0 8px 28px rgba(255,140,0,0.38)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          Suivant
        </motion.button>
      </motion.div>
    </div>
  );
}
