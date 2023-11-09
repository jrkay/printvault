import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function deleteModelTags(data: any) {
  try {
    const supabase = createClientComponentClient()

    // Select all matching tag_ids
    const { data: matchingTags, error: matchingTagsError } = await supabase
      .from("model_tags")
      .select("tag_id")
      .match({ tag_id: data.tag_id })

    if (matchingTagsError) {
      console.error("Error fetching matching tags:", matchingTagsError)
      return { matchingTagsError, data: null }
    }

    //    const tag_table_id = matchingTags[0].tag_id

    //  console.log("tag_table_id:", tag_table_id)
    // If there is only one match, safely delete from tags
    if (matchingTags.length === 1) {
      console.log("IS THIS GETTING HIT?")
      const { data: insertedModelTags, error: modelTagsError } = await supabase
        .from("model_tags")
        .delete()
        .match({ model_id: data.model_id, tag_id: data.tag_id })

      const { data: matchIds, error: tagsError } = await supabase
        .from("tags")
        .delete()
        .match({ id: data.tag_id })

      if (tagsError) {
        console.error("Error deleting tag:", tagsError)
        return { tagsError, data: null }
      }

      if (modelTagsError) {
        console.error("Error deleting data from Model_Tags:", modelTagsError)
        return { modelTagsError, data: null }
      }
      return { data: insertedModelTags, error: null }
    } else {
      console.log("OOOOOOR IS THIS GETTING HIT?")
      const { data: insertedModelTags, error: modelTagsError } = await supabase
        .from("model_tags")
        .delete()
        .match({ model_id: data.model_id, tag_id: data.tag_id })
    }
  } catch (error) {
    console.error("Error in deleteModelClient:", error)
    return { error, data: null }
  }
}
