"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type Step = 1 | 2;

/* ──────────────────────────────────────────────────────────────
   Data : photos step 1 (4 rows)
   ────────────────────────────────────────────────────────────── */

const ROW_1 = [1, 2, 3, 4, 5, 6];
const ROW_2 = [7, 8, 9, 10, 11];
const ROW_3 = [12, 13, 14, 15, 16];
const ROW_4 = [17, 18, 19, 20, 21];

const photoSrc = (n: number) => `/communaute/photos/photo-${n}.png`;

/* ──────────────────────────────────────────────────────────────
   Data : tags step 2 (défilent à l'infini)
   ────────────────────────────────────────────────────────────── */

type Tag = { label: string; bg: string; border: string; fg: string };

const TAGS: Tag[] = [
  { label: "photographe",          bg: "var(--color-deep-100)",  border: "var(--color-deep-300)",  fg: "var(--color-deep-900)" },
  { label: "créateur",             bg: "var(--color-mint-100)",  border: "var(--color-mint-300)",  fg: "var(--color-mint-900)" },
  { label: "styliste",             bg: "var(--color-error-100)", border: "var(--color-error-300)", fg: "var(--color-error-900)" },
  { label: "designer",             bg: "var(--color-june-100)",  border: "var(--color-june-300)",  fg: "var(--color-june-900)" },
  { label: "mentor",               bg: "var(--color-slate-100)", border: "var(--color-slate-300)", fg: "var(--color-slate-800)" },
  { label: "étudiant",             bg: "var(--color-core-100)",  border: "var(--color-core-300)",  fg: "var(--color-core-900)" },
  { label: "musicien",             bg: "var(--color-deep-100)",  border: "var(--color-deep-300)",  fg: "var(--color-deep-900)" },
  { label: "graphiste",            bg: "var(--color-mint-100)",  border: "var(--color-mint-300)",  fg: "var(--color-mint-900)" },
  { label: "développeur",          bg: "var(--color-error-100)", border: "var(--color-error-300)", fg: "var(--color-error-900)" },
  { label: "community manager",    bg: "var(--color-june-100)",  border: "var(--color-june-300)",  fg: "var(--color-june-900)" },
  { label: "artisan",              bg: "var(--color-slate-100)", border: "var(--color-slate-300)", fg: "var(--color-slate-800)" },
  { label: "directeur artistique", bg: "var(--color-core-100)",  border: "var(--color-core-300)",  fg: "var(--color-core-900)" },
];

/* ──────────────────────────────────────────────────────────────
   Titre dégradé "communauté" — même dégradé multicolore que /welcome
   (violet → orange → bleu → rouge, text-clip)
   ────────────────────────────────────────────────────────────── */

function ColoredCommunaute() {
  return (
    <span
      className="font-museo font-semibold text-[40px] leading-none bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(90deg, #661C8C 0%, #FF8C00 28%, #0092BE 75%, #FF1A3B 97%)",
      }}
    >
      communauté
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────
   Composant principal
   ────────────────────────────────────────────────────────────── */

export function CommunauteOnboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<Step>(1);

  return (
    <div
      className="relative h-[100dvh] overflow-hidden"
      style={{
        backgroundColor: "var(--color-slate-100)",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step-1"
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <StepOne onNext={() => setStep(2)} />
          </motion.div>
        ) : (
          <motion.div
            key="step-2"
            className="h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <StepTwo onNext={onDone} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframes marquee (CSS-only) */}
      <style jsx global>{`
        @keyframes juno-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes juno-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STEP 1 — Mosaïque photos + titre
   ────────────────────────────────────────────────────────────── */

function StepOne({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Mosaïque photos inclinée (remonte pour déborder par le haut,
          élargie pour éviter le coin blanc à gauche dû à la rotation) */}
      <div
        className="relative shrink-0 overflow-visible"
        style={{
          transform: "rotate(-3deg)",
          transformOrigin: "50% 0%",
          marginTop: 0,
          marginLeft: -40,
          marginRight: -40,
          width: "calc(100% + 80px)",
        }}
      >
        <PhotoRow
          photos={ROW_1}
          paddingLeft={40}
          direction="right"
          duration={38}
        />
        <div className="mt-[6px]">
          <PhotoRow
            photos={ROW_2}
            paddingLeft={0}
            direction="left"
            duration={36}
          />
        </div>
        <div className="mt-[6px]">
          <PhotoRow
            photos={ROW_3}
            paddingLeft={80}
            direction="right"
            duration={40}
          />
        </div>
        <div className="mt-[6px]">
          <PhotoRow
            photos={ROW_4}
            paddingLeft={0}
            direction="left"
            duration={34}
          />
        </div>
      </div>

      {/* Titre + CTA */}
      <div className="flex-1 flex flex-col items-center justify-end pb-6 px-6">
        <h1
          className="font-museo leading-[1.05] text-center"
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
          }}
        >
          découvre la
        </h1>
        <div className="mt-2">
          <ColoredCommunaute />
        </div>

        <StepDots current={1} total={2} className="mt-6" />

        <button
          type="button"
          onClick={onNext}
          className="mt-6 w-full h-14 rounded-full font-poppins font-semibold text-white text-base tracking-wide active:scale-[0.98] transition-transform"
          style={{
            background: "linear-gradient(135deg, #FF8C00 0%, #e07800 100%)",
            boxShadow: "0 8px 28px rgba(255,140,0,0.38)",
          }}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   STEP 2 — Tags + téléphone + avatars + titre
   ────────────────────────────────────────────────────────────── */

function StepTwo({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative h-full"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      {/* Téléphone : absolute, derrière tout */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ top: 120, width: 380, height: "75vh", zIndex: 1 }}
      >
        <Image
          src="/communaute/phone-mockup.png"
          alt=""
          fill
          sizes="(max-width: 460px) 100vw, 460px"
          className="object-contain object-top"
          priority
          unoptimized
        />
      </div>

      {/* Dégradés diagonaux en haut (décor, par-dessus le téléphone) */}
      <DiagonalGradients />

      {/* Tags défilants en haut */}
      <div className="absolute inset-x-0 top-0 z-20 pt-12 pb-3">
        <TagMarquee duration={28} />
      </div>

      {/* Bloc bas — F5F5F5, hauteur auto qui démarre un peu au-dessus du
          cluster d'avatars. */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pt-6"
        style={{
          backgroundColor: "#F5F5F5",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 20px)",
        }}
      >
        {/* Notifications card juste au-dessus du dégradé */}
        <div
          aria-hidden
          className="absolute left-0 right-0 flex justify-center pointer-events-none px-6"
          style={{ bottom: "calc(100% + 56px)" }}
        >
          <Image
            src="/communaute/notif-card.png"
            alt=""
            width={652}
            height={275}
            className="w-full max-w-[360px] h-auto"
            unoptimized
          />
        </div>

        {/* Bande de transition 40px : dégradé F5F5F5 (transparent → 90%) */}
        <div
          aria-hidden
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: "100%",
            height: 40,
            background:
              "linear-gradient(180deg, rgba(245,245,245,0) 0%, rgba(245,245,245,0.90) 86%, rgba(245,245,245,0.90) 100%)",
          }}
        />
        <div className="w-full flex flex-col items-center">
          {/* Cluster d'avatars juste au-dessus du titre */}
          <div className="w-full max-w-[320px] mb-4">
            <Image
              src="/communaute/avatar-cluster.png"
              alt=""
              width={732}
              height={238}
              className="w-full h-auto"
              unoptimized
            />
          </div>

          <h1
            className="font-museo leading-[1.05] text-center"
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.01em",
            }}
          >
            découvre la
          </h1>
          <div className="mt-2">
            <ColoredCommunaute />
          </div>

          <StepDots current={2} total={2} className="mt-6" />

          <button
            type="button"
            onClick={onNext}
            className="mt-6 w-full h-14 rounded-full font-poppins font-semibold text-white text-base tracking-wide active:scale-[0.98] transition-transform"
            style={{
              background: "linear-gradient(135deg, #FF8C00 0%, #e07800 100%)",
              boxShadow: "0 8px 28px rgba(255,140,0,0.38)",
            }}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PhotoRow — marquee infinie horizontale
   ────────────────────────────────────────────────────────────── */

function PhotoRow({
  photos,
  paddingLeft,
  direction,
  duration,
}: {
  photos: number[];
  paddingLeft: number;
  direction: "left" | "right";
  duration: number;
}) {
  // Taille : 200×134 (paysage)
  const w = 200;
  const h = 134;
  const gap = 6;

  const Cell = ({ n }: { n: number }) => (
    <div
      className="shrink-0 overflow-hidden"
      style={{
        width: w,
        height: h,
        marginRight: gap,
        borderRadius: 28,
        backgroundColor: "var(--color-slate-200)",
      }}
    >
      <Image
        src={photoSrc(n)}
        alt=""
        width={w * 2}
        height={h * 2}
        className="w-full h-full object-cover"
        unoptimized
      />
    </div>
  );

  // Contenu dupliqué pour boucle seamless. On utilise marginRight sur
  // chaque cellule (et pas flex gap) pour que la période de la marquee
  // soit exactement la largeur d'un set + un gap : translate(-50%) tombe
  // pile sur le début de la copie, pas d'espace différent au raccord.
  const content = (
    <div className="flex">
      {photos.map((n) => (
        <Cell key={`a-${n}`} n={n} />
      ))}
      {photos.map((n) => (
        <Cell key={`b-${n}`} n={n} />
      ))}
    </div>
  );

  const anim =
    direction === "right"
      ? `juno-marquee-right ${duration}s linear infinite`
      : `juno-marquee-left ${duration}s linear infinite`;

  // L'offset horizontal initial est porté par marginLeft, pas par
  // paddingLeft dans le contenu animé.
  return (
    <div className="w-full overflow-hidden">
      <div
        className="w-max"
        style={{
          animation: anim,
          marginLeft: paddingLeft,
          willChange: "transform",
        }}
      >
        {content}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TagMarquee — tags qui défilent en boucle
   ────────────────────────────────────────────────────────────── */

function TagMarquee({ duration }: { duration: number }) {
  const content = (
    <div className="flex items-center gap-2 pl-2">
      {TAGS.concat(TAGS).map((t, i) => (
        <span
          key={i}
          className="shrink-0 rounded-full font-museo font-semibold text-[10px] whitespace-nowrap"
          style={{
            backgroundColor: t.bg,
            borderWidth: "0.5px",
            borderStyle: "solid",
            borderColor: t.border,
            color: t.fg,
            padding: "4px 10px",
          }}
        >
          {t.label}
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full overflow-hidden">
      <div
        className="w-max"
        style={{
          animation: `juno-marquee-left ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {content}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   DiagonalGradients — 3 rectangles 670×250 inclinés à 30°
   en diagonale du milieu-gauche vers le coin supérieur droit
   ────────────────────────────────────────────────────────────── */

function DiagonalGradients() {
  const W = 670;
  const H = 420;

  // Les rectangles sont centrés horizontalement sur le viewport puis
  // tournés à -30°. Centrage via left:50% + marginLeft:-W/2 → la zone
  // de fade des dégradés reste visible des deux côtés.
  const baseStyle = {
    position: "absolute" as const,
    width: W,
    height: H,
    left: "50%",
    marginLeft: -W / 2,
    transform: "rotate(-30deg)",
    transformOrigin: "50% 50%",
    pointerEvents: "none" as const,
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden"
      style={{ height: 620, zIndex: 5 }}
    >
      {/* Rect 2 — bleu, légèrement au-dessus, opacité globale 70% */}
      <div
        style={{
          ...baseStyle,
          top: -20,
          opacity: 0.7,
          background:
            "linear-gradient(180deg, rgba(3,206,246,0) 0%, rgba(3,206,246,0.30) 50%, rgba(3,206,246,0) 100%)",
        }}
      />
      {/* Rect 1 — violet, position de base */}
      <div
        style={{
          ...baseStyle,
          top: 10,
          background:
            "linear-gradient(180deg, rgba(184,84,248,0) 0%, rgba(184,84,248,0.20) 50%, rgba(184,84,248,0) 100%)",
        }}
      />
      {/* Rect 3 — jaune, à moitié en dessous du rect 2 */}
      <div
        style={{
          ...baseStyle,
          top: -20 + H / 2,
          background:
            "linear-gradient(180deg, rgba(255,187,50,0) 0%, rgba(255,187,50,0.30) 50%, rgba(255,187,50,0) 100%)",
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   StepDots — pills de progression
   ────────────────────────────────────────────────────────────── */

function StepDots({
  current,
  total,
  className = "",
}: {
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i + 1 <= current;
        return (
          <span
            key={i}
            className="block h-[4px] rounded-full transition-colors"
            style={{
              width: 32,
              backgroundColor: active
                ? "var(--color-june-600)"
                : "var(--color-slate-300)",
            }}
          />
        );
      })}
    </div>
  );
}
