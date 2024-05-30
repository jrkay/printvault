import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"
import { ImageProps } from "@/utils/appTypes"

export async function deleteImage(image: ImageProps, activeUser: User) {
  try {
    const modelName = image.href.split("/").pop()

    const supabase = createClientComponentClient()
    const { error: imageStorageError } = await supabase.storage
      .from("images")
      .remove(["public/" + activeUser.id + "/" + modelName])

    if (imageStorageError) {
      console.error("Error deleting data:", imageStorageError)
      return { imageStorageError, data: null }
    }

    const { error: imageTableError } = await supabase
      .from("images")
      .delete()
      .eq("id", image.id)

    if (imageTableError) {
      console.error("Error deleting image:", imageTableError)
      return { imageTableError, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteImage:", error)
    return { error, data: null }
  }
}

export async function getImages(
  activeUser: User | null,
  activeModelId: string
) {
  const userRole = activeUser?.role
  // Determine the table name based on the user role
  const tableName = userRole === "authenticated" ? "images" : "demo_images"

  try {
    const { data } = await supabaseClient
      .from(tableName)
      .select()
      .eq("model_id", activeModelId)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export const uploadImage = async (
  activeUser: User,
  activeModelId: string,
  imageData: any
) => {
  try {
    const supabase = createClientComponentClient()
    const timestamp = new Date().getTime()

    const modelPath = `public/${activeUser.id}/model_${activeModelId}_${timestamp}.jpg`

    const modelFile = imageData.target.files[0]

    // Upload the image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(modelPath, modelFile, {
        contentType: "image/jpeg",
      })

    if (uploadError) {
      console.error("Error uploading image:", uploadError.message)
      return { error: uploadError, data: null }
    }

    // Retrieve the public URL of the uploaded image
    const { data: imagePathData } = supabase.storage
      .from("images")
      .getPublicUrl(modelPath)

    const imagePath = imagePathData.publicUrl

    // Insert the image record into the model_images table
    const modelImage = {
      model_id: activeModelId,
      href: imagePath,
    }

    const { data: insertData, error: insertError } = await supabase
      .from("images")
      .insert(modelImage)
      .single()

    if (insertError) {
      console.error("Error inserting image record:", insertError.message)
      return { error: insertError, data: null }
    }

    // Return the inserted data
    return { data: insertData, error: null }
  } catch (error) {
    console.error("Error in uploadImage:", error)
    return { error, data: null }
  }
}
