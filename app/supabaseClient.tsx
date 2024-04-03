import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

export const supabase = createServerComponentClient<Database>({
  cookies: () => cookies(),
})

export function handleError(error: any) {
  console.error("Error:", error)
}
