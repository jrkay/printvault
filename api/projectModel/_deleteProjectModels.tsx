import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function deleteProjectModels(data: any) {
  // Filter project_models table by matching project_id & model_id,
  // and return id of matching single model

  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from("project_models")
      .delete(data)
      .match({ id: data.id })

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteProjectModelClient:", error)
    return { error, data: null }
  }
}
