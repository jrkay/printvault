import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"
import { deleteFile } from "./fileApi"
import { FileProps, ImageProps, ModelProps } from "@/utils/appTypes"
import { deleteImage } from "./imageApi"

export const addModel = async (data: any) => {
  try {
    const supabase = createClientComponentClient()

    const { data: insertedData, error } = await supabase
      .from("models")
      .insert(data)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addModel:", error)
    return { data: null, error }
  }
}

export async function deleteModel(
  model: any,
  activeUser: User,
  imageData: ImageProps[],
  fileData: FileProps[]
) {
  const supabase = createClientComponentClient()

  const modelId = model.id

  // Check for and delete model images
  for (const image of imageData) {
    const { error: deleteImageError } = await deleteImage(image, activeUser)
    if (deleteImageError) {
      console.error("Error deleting image:", deleteImageError)
      return { error: deleteImageError }
    }
  }

  // Check for and delete model files
  for (const file of fileData) {
    const { error: deleteFileError } = await deleteFile(file, activeUser)
    if (deleteFileError) {
      console.error("Error deleting file:", deleteFileError)
      return { error: deleteFileError }
    }
  }

  // Check if model has any assigned projects
  // No assigned projects
  if (model.projects.length === 0) {
    try {
      const { error: modelError } = await supabase
        .from("models")
        .delete()
        .eq("id", modelId)

      if (modelError) {
        console.error("Error deleting data:", modelError)
        return { modelError, data: null }
      }

      return { modelError: null, data: null }
    } catch (modelError) {
      console.error("Error in deleteModel:", modelError)
      return { modelError, data: null }
    }
  } else {
    // Has assigned projects
    try {
      // Delete model from project_model first
      for (const project of model.projects) {
        const { data: projectModelData, error: projectModelError } =
          await supabase.from("project_models").delete().eq("model_id", modelId)

        if (projectModelError) {
          console.error("Error deleting project_model data:", projectModelError)
          return { error: projectModelError }
        }
      }

      // Delete model
      const { error } = await supabase.from("models").delete().eq("id", modelId)

      if (error) {
        console.error("Error deleting data:", error)
        return { error, data: null }
      }

      return { error: null, data: null }
    } catch (error) {
      console.error("Error in deleteModel with projects:", error)
      return { error, data: null }
    }
  }
}

export async function getModelProjects(
  data: any,
  callback: (message: any) => void
) {
  try {
    const supabase = createClientComponentClient()

    const { data: projects, error: error } = await supabase
      .from("project_models")
      .select("project_id")
      .eq("model_id", data)

    {
      if (projects?.length != 0 || projects != null) {
        callback(projects?.map((p: any) => p.project_id))
        return
      }
    }
    if (error) {
      console.error("Error retrieving data:", error)
      return
    }
  } catch (error) {
    console.error("Error in getModelProjects:", error)
  }
}

export async function getModels(activeUser: User | null) {
  const user = activeUser
  const userRole = activeUser?.role

  try {
    let combinedData: any = []

    if (userRole === "authenticated") {
      // Fetch models where the user is the owner
      const { data: ownedModels } = await supabaseClient
        .from("models")
        .select()
        .eq("user_id", user?.id)

      // Fetch models where the user is in the shared_with array
      const { data: sharedModels } = await supabaseClient
        .from("models")
        .select()
        .contains("shared_with", [user?.id])

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

export async function updateModel(model: any) {
  const supabase = createClientComponentClient()
  const { error } = await supabase
    .from("models")
    .update(model)
    .match({ id: model.id })
  return error
}
