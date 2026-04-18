import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "./LogoutButton";
import { Logo } from "@/components/brand/Logo";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/welcome");

  const firstName = (user.user_metadata?.first_name as string | undefined) ?? null;
  const displayName = firstName ?? user.email;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-white">
      <div className="mb-6">
        <Logo variant="paysage" color="couleur" height={32} />
      </div>
      <h1 className="font-poetsen text-slate-900 text-3xl mb-2">
        Bienvenue {displayName} <span aria-hidden>👋</span>
      </h1>
      <p className="font-poppins text-slate-500 text-sm mb-10">
        Tu es connecté. La formation arrive bientôt.
      </p>
      <LogoutButton />
    </div>
  );
}
