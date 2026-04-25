import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { BoutiqueClient } from "./BoutiqueClient";

export default async function BoutiquePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/welcome");

  return <BoutiqueClient userEmail={user.email ?? null} />;
}
