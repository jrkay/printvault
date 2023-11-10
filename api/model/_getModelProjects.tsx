import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function getModelProjects(
  data: any,
  callback: (message: any) => void
) {
  try {
    const supabase = createClientComponentClient()

    const { data: projects, error: error } = await supabase
      .from("project_models")
      .select("project_id")
      .eq("model_id", data)

    {
      if (projects?.length != 0 || projects != null) {
        console.log("returned projects-------------", projects)

        callback(projects?.map((p: any) => p.project_id))
        return
      }
    }
    if (error) {
      console.error("Error deleting data:", error)
      const errorMessage = error.message || "Unknown error occurred"
      return
    }
  } catch (error) {
    console.error("Error in deleteModelClient:", error)
  }
}
