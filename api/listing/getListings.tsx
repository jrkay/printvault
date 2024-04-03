import { supabase, handleError } from "@/app/supabaseClient"

export async function getListings(userData: any) {
  try {
    const { data } = await supabase
      .from("listings")
      .select()
      .eq("owner_id", userData?.user?.id)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
