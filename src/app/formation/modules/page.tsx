import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function FormationModulesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/welcome");

  return (
    <div className="fixed inset-0 flex flex-col bg-white px-6 py-10">
      <h1 className="font-museo text-slate-900 text-[28px] leading-tight mb-3">
        Bienvenue dans ta formation
      </h1>
      <p className="font-poppins text-slate-500 text-[14px]">
        Les sections arrivent bientôt. Tu as scanné le bon QR code.
      </p>
      <Link
        href="/formation"
        className="mt-auto font-poppins text-[13px] text-slate-500 underline underline-offset-4"
      >
        ← Retour au scanner
      </Link>
    </div>
  );
}
