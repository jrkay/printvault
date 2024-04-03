import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

// Create the supabase client with the given cookies
const supabase = createServerComponentClient<Database>({
  cookies: () => cookies(),
})

// Function to handle errors
function handleError(error: any) {
  console.error("Error:", error)
}

export async function getActiveUser(auth: any) {
  try {
    const { data } = await supabase
      .from("users")
      .select()
      .match({ id: auth?.user?.id })
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getUserData() {
  try {
    const { data } = await supabase.from("users").select("*")
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
