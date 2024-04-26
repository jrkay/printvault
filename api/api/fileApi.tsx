import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function deleteFile(data: any, activeUser: any) {
  try {
    const fileName = data.href.split("/").pop()

    const supabase = createClientComponentClient()
    const { error: fileStorageError } = await supabase.storage
      .from("files")
      .remove(["public/" + activeUser[0].id + "/" + fileName])

    if (fileStorageError) {
      console.error("Error deleting data:", fileStorageError)
      return { fileStorageError, data: null }
    }

    const { error: fileTableError } = await supabase
      .from("model_files")
      .delete()
      .eq("id", data.id)

    if (fileTableError) {
      console.error("Error deleting file:", fileTableError)
      return { fileTableError, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteFile:", error)
    return { error, data: null }
  }
}

export async function getFiles(modelId: string) {
  try {
    const { data } = await supabaseClient
      .from("model_files")
      .select()
      .eq("model_id", modelId)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function updateFile(model: any) {
  try {
    const { error } = await supabaseClient
      .from("models")
      .update(model)
      .eq("id", model.id)
    return error
  } catch (error) {
    handleError(error)
    return error
  }
}

export const uploadFile = async (
  activeUser: any,
  activeModel: any,
  fileData: any
) => {
  const getFileExtension = (href: string): string => {
    return href.match(/\.(\w{3})(?=\?|$)/)?.[1] ?? ""
  }

  try {
    const timestamp = new Date().getTime()
    const file = fileData.target.files[0]
    const extension = getFileExtension(file.name)

    const modelpath = `public/${activeUser}/model_${activeModel}_${timestamp}.${extension}`

    const supabase = createClientComponentClient()
    const { data, error } = await supabase.storage
      .from("files")
      .upload(modelpath, file)

    // Retrieve the image path
    const { data: filePathData } = await supabase.storage
      .from("files")
      .getPublicUrl(modelpath)
    const filePath = filePathData.publicUrl

    // Make an entry in the model_images table when the image is uploaded successfully
    const modelFile = {
      model_id: activeModel,
      href: filePath,
    }

    const { error: insertError } = await supabase
      .from("model_files")
      .insert(modelFile)
      .single()

    if (insertError) {
      console.error("Error inserting data:", insertError)
      return { error: insertError, data: null }
    }
  } catch (error) {
    console.error("Error in uploadFile:", error)
    return { error, data: null }
  }
}
