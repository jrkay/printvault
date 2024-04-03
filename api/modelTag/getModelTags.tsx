import { supabase, handleError } from "@/app/supabaseClient"
import { ModelData } from "@/utils/appTypes"

export async function getModelTags(model: string) {
  try {
    const { data, error } = await supabase
      .from("model_tags")
      .select("tags!inner(name)")
      .eq("model_id", model)

    if (error) throw error

    // Extract tag names directly
    const tagNames = data.map((entry) => entry.tags)
    return tagNames
  } catch (error) {
    handleError(error)
    return []
  }
}
