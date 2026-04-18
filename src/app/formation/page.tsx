import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FormationClient } from "./FormationClient";

export default async function FormationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/welcome");

  return <FormationClient />;
}
