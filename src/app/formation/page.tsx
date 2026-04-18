import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { FormationClient } from "./FormationClient";

export default async function FormationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/welcome");

  const firstName =
    (user.user_metadata?.first_name as string | undefined) ??
    user.email?.split("@")[0] ??
    "";

  return <FormationClient firstName={firstName} />;
}
