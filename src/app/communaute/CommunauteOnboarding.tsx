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
   Titre dégradé "communauté" — même dégradé que /welcome
   (orange → violet, #FF8C00 → #8F21CF, text-clip)
   ────────────────────────────────────────────────────────────── */

function ColoredCommunaute() {
  return (
    <span
      className="font-museo font-semibold text-[40px] leading-none"
      style={{
        background: "linear-gradient(90deg, #FF8C00 0%, #8F21CF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
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
      {/* Mosaïque photos inclinée (remonte pour déborder par le haut) */}
      <div
        className="relative shrink-0 overflow-visible"
        style={{
          transform: "rotate(-3deg)",
          transformOrigin: "50% 0%",
          marginTop: -72,
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
    <div className="flex flex-col h-full">
      {/* Tags défilants */}
      <div className="pt-4 pb-3 shrink-0">
        <TagMarquee duration={28} />
      </div>

      {/* Téléphone (zone qui absorbe l'espace dispo, crop vertical au besoin) */}
      <div className="relative flex-1 min-h-0 w-full">
        <Image
          src="/communaute/phone-notifications.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-top"
          priority
          unoptimized
        />
      </div>

      {/* Avatars */}
      <div className="relative mx-auto w-full max-w-[400px] px-4 shrink-0 -mt-4">
        <Image
          src="/communaute/avatar-cluster.png"
          alt=""
          width={732}
          height={238}
          className="w-full h-auto"
          unoptimized
        />
      </div>

      {/* Titre + CTA */}
      <div className="shrink-0 flex flex-col items-center pb-6 px-6 pt-2">
        <h1 className="text-center font-museo font-semibold text-[32px] leading-tight text-slate-900">
          découvre la
        </h1>
        <div className="mt-3">
          <ColoredCommunaute />
        </div>

        <StepDots current={2} total={2} className="mt-6" />

        <button
          type="button"
          onClick={onNext}
          className="mt-6 w-full h-[56px] rounded-full font-poppins font-semibold text-white text-[16px] active:scale-[0.98] transition-transform"
          style={{ background: "var(--color-june-600)" }}
        >
          Suivant
        </button>
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
  // Taille demandée : 204×135 (paysage)
  const w = 204;
  const h = 135;
  const gap = 6;

  const Cell = ({ n }: { n: number }) => (
    <div
      className="shrink-0 overflow-hidden"
      style={{
        width: w,
        height: h,
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

  // Contenu dupliqué pour boucle seamless (pas de padding dedans sinon
  // la période de la marquee n'est plus constante)
  const content = (
    <div className="flex" style={{ gap }}>
      {photos.map((n) => (
        <Cell key={`a-${n}`} n={n} />
      ))}
      <div style={{ width: gap }} />
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
          className="shrink-0 rounded-full font-museo font-semibold text-[10px] px-2.5 py-2 whitespace-nowrap"
          style={{
            backgroundColor: t.bg,
            borderWidth: "0.5px",
            borderStyle: "solid",
            borderColor: t.border,
            color: t.fg,
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
