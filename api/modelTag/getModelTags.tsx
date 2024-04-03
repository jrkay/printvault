import { supabase, handleError } from "@/app/supabaseClient"

export async function getModelTags() {
  try {
    const { data } = await supabase.from("model_tags").select("*, tags(name)")
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
