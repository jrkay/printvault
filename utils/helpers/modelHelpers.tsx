import { handleError } from "@/utils/helpers/helpers"
import { supabaseClient } from "@/api/supabaseClient"

// Takes an array of model IDs and returns an array of model data for those models
export async function getModelData(modelIds: string[]) {
  try {
    const { data, error } = await supabaseClient
      .from("models")
      .select()
      .in("id", modelIds)

    if (error) {
      handleError(error)
      return []
    }

    return data
  } catch (error) {
    handleError(error)
    return []
  }
}

export const getModelDetails = (modelIdsToFetch: string[]) => {
  return getModelData(modelIdsToFetch)
    .then((models) => {
      if (!models) return []

      return models.map((model) => {
        return model ? { name: model.name, id: model.id } : null
      })
    })
    .catch((error) => {
      console.error("Error getting model details:", error)
      return []
    })
}
