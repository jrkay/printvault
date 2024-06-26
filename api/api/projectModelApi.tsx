import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export const addProjectModel = async (data: any) => {
  try {
    const supabase = createClientComponentClient()

    const { data: insertedData, error } = await supabase
      .from("project_models")
      .insert(data)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addProjectModels:", error)
    return { data: null, error }
  }
}

export async function deleteProjectModels(model: any) {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from("project_models")
      .delete()
      .match({ id: model.id })

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteProjectModels:", error)
    return { error, data: null }
  }
}

export async function getProjectModels(activeUser: any) {
  const userRole = activeUser?.role
  const projectModelsTable =
    userRole === "authenticated" ? "project_models" : "demo_project_models"

  try {
    const { data } = await supabaseClient.from(projectModelsTable).select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
