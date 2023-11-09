import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const updateModelTags = async (data: any) => {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase.from("tags").update(data).eq("id", data.id)

    return { error, data: null }
  } catch (error) {
    console.error("Error in updateProjectClient:", error)

    return { error, data: null }
  }
}
