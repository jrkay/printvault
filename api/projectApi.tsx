import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export const addProject = async (data: any) => {
  const timestamp = new Date().toISOString()

  const project = {
    ...data,
    start_date: timestamp,
  }

  const supabase = createClientComponentClient()
  try {
    const { data: insertedData, error } = await supabase
      .from("projects")
      .insert(project)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addProject:", error)
    return { data: null, error }
  }
}

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
    console.error("Error in deleteProject:", error)
    return { error, data: null }
  }
}

export async function getProjects(activeUser: any) {
  const userRole = activeUser?.role

  try {
    if (userRole === "authenticated") {
      const { data: ownedProjects } = await supabaseClient
        .from("projects")
        .select()
        .eq("user_id", activeUser?.id)

      const { data: sharedProjects } = await supabaseClient
        .from("projects")
        .select()
        .contains("shared_with", [activeUser?.id])

      const data = [...(ownedProjects || []), ...(sharedProjects || [])]
      return data || []
    } else {
      const { data: guestProjects } = await supabaseClient
        .from("demo_projects")
        .select()
      return guestProjects || []
    }
  } catch (error) {
    handleError(error)
    return []
  }
}

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
