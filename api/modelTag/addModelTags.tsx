import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { v4 as uuidv4 } from "uuid"

export const addModelTags = async (data: any) => {
  try {
    const tags = {
      id: data.id,
      name: data.name,
    }

    const supabase = createClientComponentClient()
    // Select all matching tag_ids
    const { data: matchingTags, error: matchingTagsError } = await supabase
      .from("tags")
      .select("id")
      .eq("name", tags.name)

    const matchingTagsMap = matchingTags?.map((tag) => tag.id).toString()
    const modelTags = {
      model_id: data.model_id,
      tag_id: matchingTagsMap ? matchingTagsMap : tags.id,
      id: uuidv4,
    }

    // Only insert in tags table if not already present
    if (matchingTagsMap?.length === 0 || matchingTagsMap == null) {
      const { data: insertedTags, error: tagsError } = await supabase
        .from("tags")
        .insert(tags)
        .single()
      const { data: insertedModelTags, error: modelTagsError } = await supabase
        .from("model_tags")
        .insert(modelTags)
        .single()
    } else {
      const { data: insertedModelTags, error: modelTagsError } = await supabase
        .from("model_tags")
        .insert(modelTags)
        .single()
    }

    if (matchingTagsError) {
      console.error("Error inserting data:", matchingTagsError)
      return { data: null, error: matchingTagsError }
    }

    return { data: matchingTags, error: null }
  } catch (error) {
    console.error("Error in addModelTags:", error)
    return { data: null, error }
  }
}
