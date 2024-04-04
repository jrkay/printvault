import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

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
