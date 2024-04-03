import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function updateProject(project: any) {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from("projects")
      .update(project)
      .eq("id", project.id)

    return { error, data: null }
  } catch (error) {
    console.error("Error in updateProject:", error)

    return { error, data: null }
  }
}
