import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

const supabase = createServerComponentClient<Database>({
  cookies: () => cookies(),
})

// Function to handle errors
function handleError(error: any) {
  console.error("Error:", error)
}

export async function getActiveUser(auth: any) {
  try {
    const { data } = await supabase.from("users").select()
    //  .match({ id: auth.id })
    console.log("getActiveUser data--------", data)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getUserData() {
  try {
    const { data } = await supabase.from("users").select()
    console.log("getUserData data--------", data)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
