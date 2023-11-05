import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const addModelTags = async (data: any) => {
  try {
    const modelTags = {
      model_id: data.id,
      tag_id: data.tags,
    }

    const supabase = createClientComponentClient()
    const { data: insertedData, error } = await supabase
      .from("model_tags")
      .insert(modelTags)
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
