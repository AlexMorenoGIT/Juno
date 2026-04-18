"use client";

import { useState } from "react";
import Image from "next/image";
import { BottomNav, type NavTab } from "@/components/ui/BottomNav";
import { QRScannerModal } from "./QRScannerModal";

const CATEGORIES = [
  { id: "entreprendre",   label: "Entreprendre" },
  { id: "introspection",  label: "Introspection" },
  { id: "accompagnement", label: "Accompagnement" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

interface Props {
  firstName: string;
}

export function FormationClient({ firstName }: Props) {
  const [tab, setTab] = useState<NavTab>("formation");
  const [category, setCategory] = useState<CategoryId>("entreprendre");
  const [scannerOpen, setScannerOpen] = useState(false);

  return (
    <div className="relative min-h-dvh flex flex-col bg-white overflow-hidden">
      {/* ── Titre ────────────────────────────────────────────────── */}
      <header className="px-6 py-8">
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
      <div className="pl-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2 pr-6 w-max">
          {CATEGORIES.map((c) => {
            const isActive = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={isActive}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 font-poppins text-[12px] font-semibold text-slate-600 border transition-colors ${
                  isActive
                    ? "bg-white border-slate-600"
                    : "bg-slate-50 border-slate-300"
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
        className="relative flex-1 w-full mt-6 cursor-pointer overflow-hidden"
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
          onTabChange={setTab}
          variant="glass"
        />
      </div>

      {/* ── Modal scanner QR ─────────────────────────────────────── */}
      {scannerOpen && (
        <QRScannerModal
          firstName={firstName}
          onClose={() => setScannerOpen(false)}
        />
      )}
    </div>
  );
}
