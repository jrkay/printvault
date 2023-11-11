import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function deleteProject(data: any) {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase.from("projects").delete().eq("id", data)

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteProjectClient:", error)
    return { error, data: null }
  }
}
