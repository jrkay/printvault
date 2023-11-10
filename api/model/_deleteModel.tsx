import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function deleteModel(data: any) {
  try {
    const supabase = createClientComponentClient()

    const { data: projects, error: error } = await supabase
      .from("project_models")
      .select("id")
      .eq("model_id", data)

    // Check if model is assigned to any projects
    {
      // If no assignments, delete model
      if (projects?.length === 0 || projects == null) {
        try {
          console.log("Model not assigned to any projects - DELETED")
          await supabase.from("models").delete(data).eq("id", data)
        } catch (error) {
          console.error("Error deleting data:", error)
        }
      } else {
        console.log("Model assigned to projects - NOT DELETED")
        // Add error message displaying model is assigned to projects
        return <div>Model is assigned to projects</div>
      }
    }
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
