"use client";

import { useState } from "react";
import { BottomNav, NavTab } from "@/components/ui/BottomNav";

export function NavDemo() {
  const [tab1, setTab1] = useState<NavTab>("formation");
  const [tab2, setTab2] = useState<NavTab>("boutique");

  return (
    <div className="grid grid-cols-1 gap-8">

      {/* ── Dark variant ── */}
      <div className="space-y-3">
        <p className="font-poppins text-sm text-slate-500">variant="dark" (défaut)</p>
        <div className="bg-slate-800 rounded-2xl p-6 flex justify-center items-end min-h-32">
          <div className="w-[378px]">
            <BottomNav activeTab={tab1} onTabChange={setTab1} variant="dark" />
          </div>
        </div>
      </div>

      {/* ── Glass variant avec image de fond ── */}
      <div className="space-y-3">
        <p className="font-poppins text-sm text-slate-500">variant="glass" — sur fond image</p>
        <div className="bg-slate-800 rounded-2xl p-6 flex justify-center items-end min-h-32 relative overflow-hidden">
          {/* Fond image Unsplash */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
            alt="fond montagne"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="w-[378px]">
            <BottomNav activeTab={tab2} onTabChange={setTab2} variant="glass" />
          </div>
        </div>
      </div>

    </div>
  );
}
