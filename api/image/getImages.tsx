import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function getImages(activeUser: any) {
  const userRole = activeUser?.user?.role
  // Determine the table name based on the user role
  const tableName = userRole === "authenticated" ? "images" : "demo_images"

  try {
    const { data } = await supabaseClient.from(tableName).select()

    let filteredData = data
    if (activeUser?.user?.id && data) {
      filteredData = data.filter(
        (project) => project.user_id === activeUser.user.id
      )
    }

    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
