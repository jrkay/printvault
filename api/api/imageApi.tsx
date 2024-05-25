import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function deleteImage(data: any, activeUser: any) {
  try {
    const modelName = data.href.split("/").pop()

    const supabase = createClientComponentClient()
    const { error: imageStorageError } = await supabase.storage
      .from("images")
      .remove(["public/" + activeUser[0].id + "/" + modelName])

    if (imageStorageError) {
      console.error("Error deleting data:", imageStorageError)
      return { imageStorageError, data: null }
    }

    const { error: imageTableError } = await supabase
      .from("images")
      .delete()
      .eq("id", data.id)

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

export async function getImages(activeUser: any) {
  const userRole = activeUser?.role
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

export const uploadImage = async (
  activeUser: any,
  activeModel: any,
  imageData: any
) => {
  try {
    const timestamp = new Date().getTime()
    const modelpath = `public/${activeUser}/model_${activeModel}_${timestamp}.jpg`
    const model = imageData.target.files[0]

    const supabase = createClientComponentClient()
    const { data, error } = await supabase.storage
      .from("images")
      .upload(modelpath, model, {
        contentType: "image/jpeg",
      })

    // Retrieve the image path
    const { data: imagePathData } = await supabase.storage
      .from("images")
      .getPublicUrl(modelpath)
    const imagePath = imagePathData.publicUrl

    // Make an entry in the model_images table when the image is uploaded successfully
    const modelImage = {
      model_id: activeModel,
      href: imagePath,
    }

    const { error: insertError } = await supabase
      .from("images")
      .insert(modelImage)
      .single()

    if (insertError) {
      console.error("Error inserting data:", insertError)
      return { error: insertError, data: null }
    }
  } catch (error) {
    console.error("Error in uploadImage:", error)
    return { error, data: null }
  }
}
