import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
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

export async function getProjects(activeUser: User | null) {
  const user = activeUser
  const userRole = activeUser?.role

  try {
    let combinedData: any = []

    if (userRole === "authenticated") {
      const { data: ownedProjects } = await supabaseClient
        .from("projects")
        .select()
        .eq("user_id", user?.id)

      const { data: sharedProjects } = await supabaseClient
        .from("projects")
        .select()
        .contains("shared_with", [user?.id])

      if (ownedProjects || sharedProjects) {
        // Combine the results, excluding duplicates
        combinedData = [
          ...(ownedProjects || []),
          ...(sharedProjects || []).filter(
            (project) => !(ownedProjects || []).find((p) => p.id === project.id)
          ),
        ]
      }
    } else {
      const { data: guestProjects } = await supabaseClient
        .from("demo_projects")
        .select()
      return guestProjects || []
    }
    return combinedData
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getProjectsForModel(modelId: string, activeUser?: User) {
  const userRole = activeUser?.role
  const projectModelsTable =
    userRole === "authenticated" ? "project_models" : "demo_project_models"
  const projectsTable =
    userRole === "authenticated" ? "projects" : "demo_projects"

  try {
    const { data: projectModelData, error: projectModelError } =
      await supabaseClient
        .from(projectModelsTable)
        .select("project_id")
        .eq("model_id", modelId)

    if (projectModelError) throw projectModelError

    const matchingProjectIds = projectModelData.map((item) => item.project_id)
    const { data: projectData, error: projectError } = await supabaseClient
      .from(projectsTable)
      .select("*")
      .in("id", matchingProjectIds)

    if (projectError) throw projectError

    return projectData || []
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
