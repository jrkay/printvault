import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const addProjectModels = async (data: any) => {
  try {
    const projectModel = {
      id: data.id,
      model_id: data.modelId,
      project_id: data.projectId,
    }

    const supabase = createClientComponentClient()
    const { data: insertedData, error } = await supabase
      .from("project_models")
      .insert(projectModel)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addProjectModelsClient:", error)
    return { data: null, error }
  }
}
