import { supabase, handleError } from "@/app/supabaseClient"

export async function getImages(activeUser: any) {
  const user = activeUser?.user?.id
  const userRole = activeUser?.user?.role
  // Determine the table name based on the user role
  const tableName = userRole === "authenticated" ? "images" : "demo_images"

  try {
    const { data } = await supabase.from(tableName).select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
