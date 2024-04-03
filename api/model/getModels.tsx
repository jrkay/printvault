import { supabase, handleError } from "@/app/supabaseClient"

export async function getModels(activeUser: any) {
  const user = activeUser?.user?.id
  const userRole = activeUser?.user?.role
  // Determine the table name based on the user role
  const tableName = userRole === "authenticated" ? "models" : "demo_models"

  try {
    let combinedData: any = []

    if (userRole) {
      // Fetch models where the user is the owner
      const { data: ownedModels } = await supabase
        .from(tableName)
        .select()
        .eq("user_id", user)

      // Fetch models where the user is in the shared_with array
      const { data: sharedModels } = await supabase
        .from(tableName)
        .select()
        .contains("shared_with", [user])

      if (ownedModels || sharedModels) {
        // Combine the results, excluding duplicates
        combinedData = [
          ...(ownedModels || []),
          ...(sharedModels || []).filter(
            (model) => !(ownedModels || []).find((m) => m.id === model.id)
          ),
        ]
      }
    } else {
      // Fetch models for guest access
      const { data: guestModels } = await supabase.from("demo_models").select()
      combinedData = guestModels || []
    }

    return combinedData
  } catch (error) {
    handleError(error)
    return []
  }
}
