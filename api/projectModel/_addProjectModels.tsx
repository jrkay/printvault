import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
