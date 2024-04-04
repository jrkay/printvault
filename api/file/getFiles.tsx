import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function getFiles() {
  try {
    const { data } = await supabaseClient.from("model_files").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
