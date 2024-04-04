import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function getActiveUser(auth: any) {
  try {
    const { data } = await supabaseClient.from("users").select()
    //  .match({ id: auth.id })
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getUserData() {
  try {
    const { data } = await supabaseClient.from("users").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
