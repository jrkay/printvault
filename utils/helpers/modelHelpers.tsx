import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  PrinterData,
  ProjectData,
  ModelData,
  UserData,
  JobData,
  ImageData,
  ProjectModelData,
} from "@/utils/appTypes"

// Create the supabase client with the given cookies
const supabase = createServerComponentClient<Database>({
  cookies: () => cookies(),
})

// Function to handle errors
function handleError(error: any) {
  console.error("Error:", error)
}
// Takes an array of model IDs and returns an array of model data for those models
export async function getModelData(modelIds: string[]) {
  try {
    const { data, error } = await supabase
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
      if (!models) return [] // Handle null 'models'

      return models.map((model) => {
        return model ? { name: model.name, id: model.id } : null
      })
    })
    .catch((error) => {
      console.error("Error getting model details:", error)
      return [] // Return empty array on error
    })
}
