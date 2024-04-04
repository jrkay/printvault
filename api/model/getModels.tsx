import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function getModels(activeUser: any) {
  const user = activeUser?.id
  const userRole = activeUser?.role

  try {
    let combinedData: any = []

    if (userRole === "authenticated") {
      // Fetch models where the user is the owner
      const { data: ownedModels } = await supabaseClient
        .from("models")
        .select()
        .eq("user_id", user)

      // Fetch models where the user is in the shared_with array
      const { data: sharedModels } = await supabaseClient
        .from("models")
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
      const { data: guestModels } = await supabaseClient
        .from("demo_models")
        .select()
      combinedData = guestModels || []
    }

    return combinedData
  } catch (error) {
    handleError(error)
    return []
  }
}
