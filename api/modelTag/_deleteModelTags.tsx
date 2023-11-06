import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function deleteModelTags(data: any) {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from("model_tags")
      .delete(data)
      .match({ model_id: data.id })

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteModelClient:", error)
    return { error, data: null }
  }
}
