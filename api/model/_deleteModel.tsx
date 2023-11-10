import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function deleteModel(data: any) {
  const supabase = createClientComponentClient()

  // No assigned projects
  if (data.projects == 0) {
    try {
      const { error: modelError } = await supabase
        .from("models")
        .delete()
        .eq("id", data.id)

      if (modelError) {
        console.error("Error deleting data:", modelError)
        return { modelError, data: null }
      }

      console.log("Model has NO assigned projects - DELETED")
      return { modelError: null, data: null }
    } catch (modelError) {
      console.error("Error in deleteProjectClient:", modelError)
      return { modelError, data: null }
    }
  } else {
    // Has assigned projects
    console.log("Model has assigned projects - NOT DELETED")

    try {
      // Delete model from project_model first
      for (const project of data.projects) {
        const { data: projectModelData, error: projectModelError } =
          await supabase.from("project_models").delete().eq("model_id", data.id)
      }

      // Delete model
      const { error } = await supabase.from("models").delete().eq("id", data.id)

      if (error) {
        console.error("Error deleting data:", error)
        return { error, data: null }
      }

      return { error: null, data: null }
    } catch (error) {
      console.error("Error in deleteProjectClient:", error)
      return { error, data: null }
    }
  }
}
