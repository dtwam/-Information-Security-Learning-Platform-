import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qssubjbrezbmhwvxmoiq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8T1RWbrlybzyArkhywf3wA_2qaSu_l-";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
