import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { v4 as uuidv4 } from "uuid"

export const addModelTags = async (data: any) => {
  try {
    const modelTags = {
      model_id: data.model_id,
      tag_id: data.id,
      id: uuidv4,
    }

    const tags = {
      id: data.id,
      name: data.name,
    }

    const supabase = createClientComponentClient()
    const { data: insertedTags, error: tagsError } = await supabase
      .from("tags")
      .insert(tags)
      .single()

    const { data: insertedModelTags, error: modelTagsError } = await supabase
      .from("model_tags")
      .insert(modelTags)
      .single()

    if (modelTagsError) {
      console.error("Error inserting data:", modelTagsError)
      return { data: null, error: modelTagsError }
    }

    return { data: insertedModelTags, error: null }

    if (tagsError) {
      console.error("Error inserting data:", tagsError)
      return { data: null, error: tagsError }
    }

    return { data: insertedTags, error: null }
  } catch (error) {
    console.error("Error in addModelTags:", error)
    return { data: null, error }
  }
}
