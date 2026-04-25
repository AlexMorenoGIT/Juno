"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BottomNav, type NavTab } from "@/components/ui/BottomNav";

const SEEN_KEY = "juno.boutique.seenOnboarding";

const ALWAYS_ONBOARD_EMAILS = new Set(["alex.moreno32390@gmail.co"]);

const TAB_ROUTE: Record<NavTab, string> = {
  formation: "/formation",
  communaute: "/communaute",
  boutique: "/boutique",
  profil: "/profil",
};

export function BoutiqueClient({ userEmail }: { userEmail: string | null }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState(false);
  const [tab, setTab] = useState<NavTab>("boutique");

  const forceOnboard =
    process.env.NODE_ENV !== "production" ||
    (userEmail !== null && ALWAYS_ONBOARD_EMAILS.has(userEmail));

  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    if (forceOnboard) {
      setSeen(false);
    } else {
      const stored =
        typeof window !== "undefined" &&
        window.localStorage.getItem(SEEN_KEY) === "1";
      setSeen(stored);
    }
    setReady(true);
  }, [forceOnboard]);

  const handleOnboardingDone = () => {
    try {
      if (!forceOnboard) window.localStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setSeen(true);
  };

  if (!ready) return null;

  if (!seen) return <BoutiqueOnboarding onNext={handleOnboardingDone} />;

  return (
    <div
      className="relative min-h-[100dvh] bg-white"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 140px)",
      }}
    >
      <div className="px-6 pt-6">
        <h1 className="font-museo text-slate-900 text-[28px] leading-tight">
          Boutique
        </h1>
        <p className="mt-3 font-poppins text-slate-500 text-[14px]">
          Bientôt disponible.
        </p>
      </div>

      <div
        className="fixed inset-x-4 z-40"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
      >
        <BottomNav
          activeTab={tab}
          onTabChange={(t) => {
            setTab(t);
            if (t !== "boutique") router.push(TAB_ROUTE[t]);
          }}
          variant="dark"
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Onboarding boutique : image hero + titre dégradé + Suivant
   ────────────────────────────────────────────────────────────── */

function BoutiqueOnboarding({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative h-[100dvh] overflow-hidden"
      style={{
        backgroundColor: "#F5F5F5",
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Image hero — absolute, derrière tout */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ top: -60, width: 460, height: "75vh", zIndex: 1 }}
      >
        <Image
          src="/boutique/hero.png"
          alt=""
          fill
          sizes="(max-width: 460px) 100vw, 460px"
          className="object-contain object-top"
          priority
          unoptimized
        />
      </div>

      {/* Bloc bas — F5F5F5, plus grand en hauteur, sans dégradé de transition */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center px-6 pt-16"
        style={{
          backgroundColor: "#F5F5F5",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 40px)",
        }}
      >
        <div className="w-full flex flex-col items-center">
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
            <span
              className="font-museo font-semibold text-[40px] leading-none bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #661C8C 0%, #FF8C00 28%, #0092BE 75%, #FF1A3B 97%)",
              }}
            >
              boutique
            </span>
          </div>

          <button
            type="button"
            onClick={onNext}
            className="mt-8 w-full h-14 rounded-full font-poppins font-semibold text-white text-base tracking-wide active:scale-[0.98] transition-transform"
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
