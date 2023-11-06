import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function deleteModel(data: any) {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from("models")
      .delete(data)
      .eq("id", data.id.toString())

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
