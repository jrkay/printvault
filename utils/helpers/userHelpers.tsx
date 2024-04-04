import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function getUserData() {
  try {
    const { data } = await supabaseClient.from("users").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
