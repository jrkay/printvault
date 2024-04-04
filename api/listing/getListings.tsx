import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function getListings(userData: any) {
  try {
    const { data } = await supabaseClient
      .from("listings")
      .select()
      .eq("owner_id", userData?.user?.id)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
