"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { illustrations } from "@/lib/illustrations";

/* ── Géométrie ───────────────────────────────────────────────────────── */

const CIRCLE_1 = 96;   // cercle central (autour du monogramme)
const CIRCLE_2 = 220;  // cercle moyen

// Décalage vertical des cercles 1 & 2 (descendus dans la scène)
const CORE_DY = 42;

// Orbite des 6 éléments — juste en dehors du cercle 2 (r=110)
const INNER_R = 132;

// Cercle 3 : rayon plus grand + centre plus profond → arc moins arrondi
const OUTER_R = 290;
const OUTER_CY = 115;

const rad = (d: number) => (d * Math.PI) / 180;

type OrbitItem = {
  kind: "shape" | "avatar";
  src: string;
  w: number;
  h: number;
  x: number;
  y: number;
  // paramètres de flottement
  fx: number;
  fy: number;
  dur: number;
  rot: number;
};

const onInner = (angleDeg: number, w: number, h: number, fx: number, fy: number, dur: number, rot: number, kind: OrbitItem["kind"], src: string): OrbitItem => ({
  kind,
  src,
  w,
  h,
  x: Math.round(INNER_R * Math.sin(rad(angleDeg))),
  y: Math.round(-INNER_R * Math.cos(rad(angleDeg))) + CORE_DY,
  fx, fy, dur, rot,
});

const onOuter = (angleDeg: number, w: number, h: number, fx: number, fy: number, dur: number, rot: number, kind: OrbitItem["kind"], src: string): OrbitItem => ({
  kind,
  src,
  w,
  h,
  x: Math.round(OUTER_R * Math.sin(rad(angleDeg))),
  y: Math.round(OUTER_CY - OUTER_R * Math.cos(rad(angleDeg))),
  fx, fy, dur, rot,
});

// 6 éléments placés "random" autour du cercle 2, équidistants
const INNER_ITEMS: OrbitItem[] = [
  onInner(-42, 66, 66, 4, -6, 5.6, 8,  "shape",  illustrations.torus2),
  onInner(38,  58, 58, -3, -5, 6.2, 0,  "avatar", "/avatars/avatar-pink.png"),
  onInner(98,  83, 83, -4, 3,  5.0, -6, "shape",  illustrations.cylindreTeal),
  onInner(148, 60, 60, 3,  4,  6.8, 0,  "avatar", "/avatars/avatar-diploma.png"),
  onInner(-148,73, 73, -5, 3,  5.4, 10, "shape",  illustrations.cube),
  onInner(-98, 58, 58, 4,  -4, 6.0, 0,  "avatar", "/avatars/avatar-yellow.png"),
];

// 4 éléments sur l'arc du cercle 3 (partie haute uniquement)
const OUTER_ITEMS: OrbitItem[] = [
  onOuter(-30, 72, 72, -4, -6, 7.0, 8,  "shape",  illustrations.spiral),
  onOuter(-10, 54, 54, 3,  -5, 6.4, 0,  "avatar", "/avatars/avatar-blond.png"),
  onOuter(11,  76, 76, -3, -5, 7.6, -10, "shape", illustrations.polyhedron),
  onOuter(30,  54, 54, 4,  -4, 6.8, 0,  "avatar", "/avatars/avatar-red.png"),
];

const ease = [0.22, 1, 0.36, 1] as const;

/* ── Page ────────────────────────────────────────────────────────────── */

export default function WelcomePage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div
      className="relative h-[100svh] overflow-hidden flex flex-col select-none"
      style={{
        background: [
          // Halo violet haut-gauche — plus gros & plus diffus
          "radial-gradient(ellipse 180% 95% at 5% -15%, rgba(183,140,246,0.78) 0%, rgba(183,140,246,0.28) 38%, transparent 70%)",
          // Halo rose haut-droit — plus gros & plus diffus
          "radial-gradient(ellipse 140% 80% at 95% -8%, rgba(255,170,180,0.70) 0%, rgba(255,170,180,0.22) 42%, transparent 72%)",
          "#FDFAF5",
        ].join(", "),
      }}
    >
      {/* ── Scène ──────────────────────────────────────────────────── */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center pt-4">
        {/* Ancre zéro-dimension au centre de la scène */}
        <div className="relative" style={{ width: 0, height: 0 }}>

          {/* Cercle 3 — arc blanc (seul le haut est visible) */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: OUTER_R * 2,
              height: OUTER_R * 2,
              top: OUTER_CY - OUTER_R,
              left: -OUTER_R,
              border: "1.5px solid rgba(255,255,255,0.9)",
            }}
          />

          {/* Cercle 2 — anneau blanc */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: CIRCLE_2,
              height: CIRCLE_2,
              top: -CIRCLE_2 / 2 + CORE_DY,
              left: -CIRCLE_2 / 2,
              border: "1.5px solid rgba(255,255,255,0.95)",
            }}
          />

          {/* Cercle 1 — central, fond blanc 60% + bordure blanche */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: CIRCLE_1,
              height: CIRCLE_1,
              top: -CIRCLE_1 / 2 + CORE_DY,
              left: -CIRCLE_1 / 2,
              background: "rgba(255,255,255,0.60)",
              border: "1.5px solid rgba(255,255,255,1)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
            }}
          />

          {/* Monogramme JUNO — centré exactement */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{
              width: CIRCLE_1,
              height: CIRCLE_1,
              top: -CIRCLE_1 / 2 + CORE_DY,
              left: -CIRCLE_1 / 2,
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 280, damping: 20 }}
          >
            <Logo variant="monogramme" color="couleur" height={48} />
          </motion.div>

          {/* Éléments inner + outer */}
          {[...INNER_ITEMS, ...OUTER_ITEMS].map((it, i) => {
            const isAvatar = it.kind === "avatar";
            return (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  width: it.w,
                  height: it.h,
                  top: it.y - it.h / 2,
                  left: it.x - it.w / 2,
                }}
                initial={{ opacity: 0, scale: 0.55 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: [0, it.fx, -it.fx * 0.6, 0],
                  y: [0, -Math.abs(it.fy), it.fy * 0.5, 0],
                  rotate: it.rot ? [0, it.rot, -it.rot * 0.6, 0] : 0,
                }}
                transition={{
                  opacity: { delay: 0.25 + i * 0.05, duration: 0.4 },
                  scale: { delay: 0.25 + i * 0.05, type: "spring", stiffness: 260, damping: 20 },
                  x: { delay: 0.8 + i * 0.1, duration: it.dur, repeat: Infinity, ease: "easeInOut" },
                  y: { delay: 0.8 + i * 0.1, duration: it.dur * 0.9, repeat: Infinity, ease: "easeInOut" },
                  rotate: { delay: 0.8 + i * 0.1, duration: it.dur * 1.3, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {isAvatar ? (
                  <div
                    className="rounded-full overflow-hidden"
                    style={{
                      width: it.w,
                      height: it.h,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.14)",
                    }}
                  >
                    <Image
                      src={it.src}
                      alt=""
                      width={it.w * 2}
                      height={it.h * 2}
                      quality={100}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <Image
                    src={it.src}
                    alt=""
                    width={it.w * 2}
                    height={it.h * 2}
                    quality={100}
                    unoptimized
                    style={{ width: it.w, height: it.h }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Texte + CTA ────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 px-7 shrink-0"
        style={{ paddingBottom: "max(4rem, calc(env(safe-area-inset-bottom) + 2.5rem))" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.55, ease }}
      >
        <div className="mb-3 flex justify-center">
          <Logo variant="paysage" color="couleur" height={26} />
        </div>

        <h1
          className="font-museo leading-[1.05] mb-7 text-center"
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
          }}
        >
          bienvenue sur
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #FF8C00 0%, #8F21CF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            l&apos;application
          </span>
        </h1>

        <motion.button
          onClick={() => setSheetOpen(true)}
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

      {/* ── Overlay + Sheet ───────────────────────────────────────── */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.button
              aria-label="Fermer"
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.35)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-3xl"
              style={{
                minHeight: "55dvh",
                paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
                boxShadow: "0 -12px 40px rgba(0,0,0,0.18)",
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 500) {
                  setSheetOpen(false);
                }
              }}
            >
              <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
                <div className="w-10 h-1.5 rounded-full bg-slate-200" />
              </div>
              {/* Contenu de la sheet — à remplir ensuite */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
