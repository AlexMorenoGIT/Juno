"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { BottomNav, type NavTab } from "@/components/ui/BottomNav";

const TAB_ROUTE: Record<NavTab, string> = {
  formation: "/formation",
  communaute: "/communaute",
  boutique: "/boutique",
  profil: "/profil",
};

type ModuleId = "start" | "entrepreneurship" | "build" | "iteration" | "project";

type ModuleCard = {
  id: ModuleId;
  title: string;
  description: string;
  illustration: string;
  progress: number;
  locked?: boolean;
  theme: {
    bg: string;          // gradient background
    grid: string;        // grid line color (rgba)
    title: string;       // title text color
    body: string;        // body text color
    accent: string;      // progress ring color (deep-950, june-950…)
    glow: string;        // inner highlight overlay
  };
};

const MODULES: ModuleCard[] = [
  {
    id: "start",
    title: "Le point de départ",
    description:
      "Ton premier projet, c'est toi. Découvre, apprend, développe ta propre identité.",
    illustration: "/illustrations/modules/module-2.png",
    progress: 0,
    locked: true,
    theme: {
      bg: "linear-gradient(135deg,#d3d3d3 0%,#a3a3a3 45%,#5b5b5b 100%)",
      grid: "rgba(255,255,255,0.12)",
      title: "rgba(26,26,26,0.72)",
      body: "rgba(26,26,26,0.62)",
      accent: "#272727",
      glow: "radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)",
    },
  },
  {
    id: "entrepreneurship",
    title: "L'entrepreneuriat ???",
    description:
      "À la découverte des fondamentaux de l'entrepreneuriat et des réalités qui l'entourent, afin de poser des bases claires.",
    illustration: "/illustrations/modules/module-3.png",
    progress: 0,
    locked: true,
    theme: {
      bg: "linear-gradient(135deg,#d3d3d3 0%,#a3a3a3 45%,#5b5b5b 100%)",
      grid: "rgba(255,255,255,0.12)",
      title: "rgba(26,26,26,0.72)",
      body: "rgba(26,26,26,0.62)",
      accent: "#272727",
      glow: "radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)",
    },
  },
  {
    id: "build",
    title: "Bâtir mon projet",
    description:
      "Que tu aies une idée ou non, apprends à en faire émerger une et à construire un projet en béton.",
    illustration: "/illustrations/modules/module-4.png",
    progress: 0,
    locked: true,
    theme: {
      bg: "linear-gradient(135deg,#d3d3d3 0%,#a3a3a3 45%,#5b5b5b 100%)",
      grid: "rgba(255,255,255,0.12)",
      title: "rgba(26,26,26,0.72)",
      body: "rgba(26,26,26,0.62)",
      accent: "#272727",
      glow: "radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)",
    },
  },
  {
    id: "iteration",
    title: "L'art de l'itération",
    description:
      "Parce qu'un projet n'est jamais parfait du premier coup, découvre comment l'améliorer en avançant.",
    illustration: "/illustrations/modules/module-5.png",
    progress: 0,
    locked: true,
    theme: {
      bg: "linear-gradient(135deg,#d3d3d3 0%,#a3a3a3 45%,#5b5b5b 100%)",
      grid: "rgba(255,255,255,0.12)",
      title: "rgba(26,26,26,0.72)",
      body: "rgba(26,26,26,0.62)",
      accent: "#272727",  // slate-800
      glow: "radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)",
    },
  },
  {
    id: "project",
    title: "Je me projette",
    description:
      "Et si j'essayais de donner vie à mon idée et la faire rentrer dans le monde d'aujourd'hui.",
    illustration: "/illustrations/modules/module-1.png",
    progress: 0,
    locked: true,
    theme: {
      bg: "linear-gradient(135deg,#d3d3d3 0%,#a3a3a3 45%,#5b5b5b 100%)",
      grid: "rgba(255,255,255,0.12)",
      title: "rgba(26,26,26,0.72)",
      body: "rgba(26,26,26,0.62)",
      accent: "#272727",  // slate-800
      glow: "radial-gradient(120% 60% at 20% 0%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 60%)",
    },
  },
];

export function ModulesClient() {
  const router = useRouter();
  const [tab, setTab] = useState<NavTab>("formation");

  // La page /formation précédente bloque le scroll (overflow:hidden sur
  // html/body). On rétablit le scroll pour cette page (sa cleanup n'est
  // pas toujours rejouée au moment de la navigation côté client).
  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
  }, []);

  return (
    <div
      className="relative min-h-[100dvh] bg-white"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 140px)",
      }}
    >
      {/* ── Back button ───────────────────────────────────────── */}
      <div className="px-6 pt-4">
        <Link
          href="/formation"
          aria-label="Retour"
          className="inline-flex h-10 w-10 items-center justify-center -ml-2 text-slate-900 active:scale-95 transition-transform"
        >
          <Icon name="arrow-left" size={24} />
        </Link>
      </div>

      {/* ── Titre ────────────────────────────────────────────────── */}
      <header className="px-6 py-8 shrink-0">
        <h1 className="text-slate-900 text-[32px] leading-[1.15]">
          <span className="block font-poppins font-normal">
            Je me forme <span aria-hidden>🎓</span> sur
          </span>
          <span className="block font-museo font-semibold">
            l&apos;entrepreneuriat
          </span>
          <span className="flex items-center gap-3 font-poppins font-normal">
            grâce à
            <Image
              src="/brands/lego.png"
              alt="LEGO"
              width={61}
              height={35}
              priority
              unoptimized
            />
          </span>
        </h1>
      </header>

      {/* ── Liste des modules ──────────────────────────────────── */}
      <main className="px-5 flex flex-col gap-4">
        {MODULES.map((module, index) => (
          <ModuleCardItem key={module.id} module={module} index={index} />
        ))}
      </main>

      {/* ── BottomNav ──────────────────────────────────────────── */}
      <div
        className="fixed inset-x-4 z-40"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
      >
        <BottomNav
          activeTab={tab}
          onTabChange={(t) => {
            setTab(t);
            if (t !== "formation") router.push(TAB_ROUTE[t]);
          }}
          variant="dark"
        />
      </div>
    </div>
  );
}

function ModuleCardItem({
  module: m,
  index,
}: {
  module: ModuleCard;
  index: number;
}) {
  const cardClass = `relative block overflow-hidden rounded-[28px] h-[224px] ${
    m.locked ? "cursor-not-allowed" : "active:scale-[0.985]"
  } transition-transform`;

  const inner = (
    <>
        {/* Fond : gradient + grille + reflet */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: m.theme.bg,
            boxShadow: m.locked
              ? "0 10px 30px -12px rgba(45,45,45,0.45), inset 0 1px 0 rgba(255,255,255,0.25)"
              : "0 14px 34px -14px rgba(20,10,40,0.35), inset 0 1px 0 rgba(255,255,255,0.45)",
          }}
        >
          {/* Grille "briques" en fond (lignes) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(${m.theme.grid} 1px, transparent 1px),
                linear-gradient(90deg, ${m.theme.grid} 1px, transparent 1px)
              `,
              backgroundSize: "22px 22px",
              maskImage:
                "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.25) 100%)",
              WebkitMaskImage:
                "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.25) 100%)",
            }}
          />
          {/* Reflet haut-gauche */}
          <div
            className="absolute inset-0"
            style={{ background: m.theme.glow }}
          />
        </div>

        {/* Illustration (clippée par overflow-hidden de la carte) */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 z-10"
          style={{ width: 170, height: 170 }}
        >
          <Image
            src={m.illustration}
            alt=""
            fill
            sizes="170px"
            className={`object-contain object-right ${
              m.locked
                ? "drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)] grayscale opacity-70"
                : "drop-shadow-[0_10px_16px_rgba(0,0,0,0.22)]"
            }`}
            unoptimized
          />
        </div>

        {/* Contenu */}
        <div className="relative z-20 flex flex-col h-full p-5 pr-[150px]">
          <h2
            className="font-poetsen text-[20px] leading-[1.15] italic"
            style={{ color: m.theme.title }}
          >
            {m.title}
          </h2>

          <p
            className="mt-2 font-poppins text-[13px] leading-[1.45]"
            style={{ color: m.theme.body }}
          >
            {m.description}
          </p>

          {/* Badge progression */}
          <div className="mt-auto inline-flex items-center gap-1.5">
            <ProgressRing
              value={m.progress}
              size={18}
              stroke={2.4}
              color={m.theme.accent}
            />
            <span className="font-museo text-[13px] font-semibold tabular-nums text-white">
              {m.progress}%
            </span>
          </div>
        </div>

        {/* Overlay verrouillé */}
        {m.locked && (
          <div
            aria-hidden
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            {/* Bouton cadenas */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{ background: "rgba(255,255,255,0.35)" }}
              />
              <div
                className="relative h-[54px] w-[54px] rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.22)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1.5px solid rgba(255,255,255,0.85)",
                  boxShadow:
                    "0 8px 24px -6px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                <Icon
                  name="locked-2"
                  size={24}
                  className="text-white"
                  aria-label="Module verrouillé"
                />
              </div>
            </div>
          </div>
        )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.06 * index,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {m.locked ? (
        <div className={cardClass} aria-disabled>
          {inner}
        </div>
      ) : (
        <Link
          href={`/formation/modules/${m.id}`}
          className={cardClass}
        >
          {inner}
        </Link>
      )}
    </motion.div>
  );
}

function ProgressRing({
  value,
  size,
  stroke,
  color,
}: {
  value: number;
  size: number;
  stroke: number;
  color: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, value)) / 100) * c;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeOpacity={0.35}
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
