import { supabase, handleError } from "@/app/supabaseClient"

export async function getProjectModels() {
  try {
    const { data } = await supabase.from("project_models").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
