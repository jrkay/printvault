import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

// export const supabase = createServerComponentClient<Database>({
//   cookies: () => cookies(),
// })

export function handleError(error: any) {
  console.error("Error:", error)
}

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl) {
  throw new Error("Supabase URL is not defined")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
