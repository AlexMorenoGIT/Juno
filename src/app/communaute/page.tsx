import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { CommunauteClient } from "./CommunauteClient";

export default async function CommunautePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/welcome");

  return <CommunauteClient />;
}
