"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BottomNav, type NavTab } from "@/components/ui/BottomNav";
import { QRScannerModal } from "./QRScannerModal";
import { NoQRCodeSheet } from "./NoQRCodeSheet";

const CATEGORIES = [
  { id: "entreprendre",   label: "Entreprendre" },
  { id: "introspection",  label: "Introspection" },
  { id: "accompagnement", label: "Accompagnement" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const TAB_ROUTE: Record<NavTab, string> = {
  formation: "/formation",
  communaute: "/communaute",
  boutique: "/boutique",
  profil: "/profil",
};

export function FormationClient() {
  const router = useRouter();
  const [tab, setTab] = useState<NavTab>("formation");
  const [category, setCategory] = useState<CategoryId>("entreprendre");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [noQROpen, setNoQROpen] = useState(false);

  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div
      className="fixed flex flex-col bg-white overflow-hidden"
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: -60,
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
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

      {/* ── Badges catégories ────────────────────────────────────── */}
      <div className="pl-6 overflow-x-auto shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 pr-6 w-max">
          {CATEGORIES.map((c) => {
            const isActive = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={isActive}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 font-poppins text-[12px] font-semibold border transition-colors ${
                  isActive
                    ? "bg-white border-slate-600 text-slate-600"
                    : "bg-slate-50 border-slate-300 text-slate-300"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Cover cliquable (pleine largeur) ─────────────────────── */}
      <button
        type="button"
        onClick={() => setScannerOpen(true)}
        aria-label="Entrer dans la formation"
        className="relative flex-1 w-full mt-6 cursor-pointer overflow-hidden rounded-t-4xl"
      >
        <Image
          src="/covers/formation-desk.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </button>

      {/* ── Bottom nav flottante (glass) ─────────────────────────── */}
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
          variant="glass"
        />
      </div>

      {/* ── Modal scanner QR ─────────────────────────────────────── */}
      {scannerOpen && (
        <QRScannerModal
          onClose={() => setScannerOpen(false)}
          onNoQR={() => {
            setScannerOpen(false);
            setNoQROpen(true);
          }}
        />
      )}

      {/* ── Sheet "Je n'ai pas de QR code" ───────────────────────── */}
      {noQROpen && <NoQRCodeSheet onClose={() => setNoQROpen(false)} />}
    </div>
  );
}
