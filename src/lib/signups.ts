import { supabase } from "@/integrations/supabase/client";
import { getAttribution } from "@/lib/attribution";
import type { Json } from "@/integrations/supabase/types";

type SignupPayload = {
  email: string;
  source: string;
  consent: boolean;
  onboarding?: Json;
  user_agent: string | null;
};

/**
 * Insert a signup incl. first-touch attribution (utm_source etc.).
 * Falls back to inserting without attribution if the column doesn't exist
 * yet (PGRST204), so the form keeps working before the migration ran.
 */
export async function insertSignup(payload: SignupPayload) {
  const attribution = getAttribution();
  if (attribution) {
    const { error } = await supabase
      .from("signups")
      .insert({ ...payload, attribution: attribution as Json });
    if (error?.code !== "PGRST204") return { error };
  }
  return supabase.from("signups").insert(payload);
}
