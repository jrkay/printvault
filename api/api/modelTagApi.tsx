import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { v4 as uuidv4 } from "uuid"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"
import { ModelTagProps } from "@/utils/appTypes"

export const addModelTag = async (data: any) => {
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

export async function deleteModelTag(tag: any) {
  try {
    const supabase = createClientComponentClient()

    // Select all matching tag_ids
    const { data: matchingTags, error: matchingTagsError } = await supabase
      .from("model_tags")
      .select("tag_id")
      .match({ tag_id: tag.tag_id })

    if (matchingTagsError) {
      console.error("Error fetching matching tags:", matchingTagsError)
      return { matchingTagsError, data: null }
    }

    if (matchingTags.length === 1) {
      const { data: insertedModelTags, error: modelTagsError } = await supabase
        .from("model_tags")
        .delete()
        .match({ model_id: tag.model_id, tag_id: tag.tag_id })

      const { data: matchIds, error: tagsError } = await supabase
        .from("tags")
        .delete()
        .match({ id: tag.tag_id })

      if (tagsError) {
        console.error("Error deleting tag:", tagsError)
        return { tagsError, data: null }
      }

      if (modelTagsError) {
        console.error("Error deleting data:", modelTagsError)
        return { modelTagsError, data: null }
      }
      return { data: insertedModelTags, error: null }
    } else {
      const { data: insertedModelTags, error: modelTagsError } = await supabase
        .from("model_tags")
        .delete()
        .match({ model_id: tag.model_id, tag_id: tag.tag_id })
    }
  } catch (error) {
    console.error("Error in deleteModelTags:", error)
    return { error, data: null }
  }
}

export async function getModelTags(model: string) {
  try {
    const { data, error } = await supabaseClient
      .from("model_tags")
      .select("tags!inner(name, id)")
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

export const getAllTags = async (): Promise<ModelTagProps[]> => {
  try {
    const { data, error } = await supabaseClient
      .from("model_tags")
      .select("tags(id, name)")

    if (error) throw error

    const tagList: ModelTagProps[] = data.map((entry: any) => ({
      model_id: entry.model_id,
      tag_id: entry.tag_id,
      id: entry.tags.id,
      name: entry.tags.name,
    }))

    return tagList
  } catch (error) {
    console.error("Error fetching tags:", error)
    return []
  }
}
