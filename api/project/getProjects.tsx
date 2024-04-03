import { supabase, handleError } from "@/app/supabaseClient"

export async function getProjects(activeUser: any) {
  const userRole = activeUser?.user?.role
  // Determine the table name based on the user role
  const tableName = userRole === "authenticated" ? "projects" : "demo_projects"

  try {
    const { data } = await supabase.from(tableName).select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
