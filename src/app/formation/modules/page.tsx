import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { ModulesClient } from "./ModulesClient";

export default async function FormationModulesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/welcome");

  return <ModulesClient />;
}
