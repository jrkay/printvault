import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function getProjectModels() {
  try {
    const { data } = await supabaseClient.from("project_models").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
