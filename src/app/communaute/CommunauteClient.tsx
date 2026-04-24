"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav, type NavTab } from "@/components/ui/BottomNav";
import { CommunauteOnboarding } from "./CommunauteOnboarding";

const SEEN_KEY = "juno.communaute.seenOnboarding";

const TAB_ROUTE: Record<NavTab, string> = {
  formation: "/formation",
  communaute: "/communaute",
  boutique: "/boutique",
  profil: "/profil",
};

export function CommunauteClient() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState(false);
  const [tab, setTab] = useState<NavTab>("communaute");

  useEffect(() => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    const stored = typeof window !== "undefined" && window.localStorage.getItem(SEEN_KEY) === "1";
    setSeen(stored);
    setReady(true);
  }, []);

  const handleOnboardingDone = () => {
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setSeen(true);
  };

  if (!ready) return null;
  if (!seen) return <CommunauteOnboarding onDone={handleOnboardingDone} />;

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
          Communauté
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
            if (t !== "communaute") router.push(TAB_ROUTE[t]);
          }}
          variant="dark"
        />
      </div>
    </div>
  );
}
