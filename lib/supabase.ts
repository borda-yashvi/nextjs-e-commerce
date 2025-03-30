import { createClient } from "@supabase/supabase-js"

// These are dummy values - replace with your actual Supabase credentials
const supabaseUrl = "https://your-project-url.supabase.co"
const supabaseKey = "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseKey)

