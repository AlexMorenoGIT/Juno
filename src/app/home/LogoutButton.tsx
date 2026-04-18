"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/welcome");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="font-poppins font-medium text-sm text-slate-600 underline underline-offset-2 disabled:opacity-50"
    >
      {loading ? "Déconnexion…" : "Se déconnecter"}
    </button>
  );
}
