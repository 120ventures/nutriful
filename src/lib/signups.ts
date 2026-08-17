import { supabase } from "@/integrations/supabase/client";
import { getAttribution } from "@/lib/attribution";
import type { Database, Json } from "@/integrations/supabase/types";

type SignupInsert = Database["public"]["Tables"]["signups"]["Insert"];

type SignupPayload = {
  email: string;
  name: string | null;
  source: string;
  consent: boolean;
  onboarding?: Json;
  user_agent: string | null;
};

/** PostgREST reports an unknown column as PGRST204 and names it in the message. */
const missingColumn = (error: { code?: string; message?: string } | null) => {
  if (error?.code !== "PGRST204") return null;
  return error.message?.match(/'([^']+)' column/)?.[1] ?? null;
};

/**
 * Insert a signup incl. first-touch attribution (utm_source etc.).
 *
 * Columns are dropped and retried when the database does not know them yet, so
 * the form keeps working while a migration is still pending - or while the site
 * is being pointed at a different Supabase project.
 */
export async function insertSignup(payload: SignupPayload) {
  const attribution = getAttribution();
  let row: SignupInsert = attribution
    ? { ...payload, attribution: attribution as Json }
    : { ...payload };

  for (let attempt = 0; attempt < 3; attempt++) {
    const { error } = await supabase.from("signups").insert(row);
    if (!error) return { error: null };

    const column = missingColumn(error);
    if (!column || !(column in row)) return { error };
    const { [column]: _dropped, ...rest } = row as Record<string, unknown>;
    row = rest as SignupInsert;
  }

  return supabase.from("signups").insert(row);
}
