import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"
import { User } from "@supabase/supabase-js"

export async function getListings(userData: User) {
  try {
    const { data } = await supabaseClient
      .from("listings")
      .select()
      .eq("owner_id", userData?.id)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
