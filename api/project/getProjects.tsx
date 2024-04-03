import { supabase, handleError } from "@/app/supabaseClient"

export async function getProjects(activeUser: any) {
  const userRole = activeUser?.user?.role
  const tableName = userRole === "authenticated" ? "projects" : "demo_projects"

  try {
    const { data } = await supabase.from(tableName).select()

    // Apply the user_id filter only if the user is authenticated
    let filteredData = data // Create a new variable
    if (activeUser?.user?.id && data) {
      filteredData = data.filter(
        (project) => project.user_id === activeUser.user.id
      )
    }

    return filteredData || []
  } catch (error) {
    handleError(error)
    return []
  }
}
