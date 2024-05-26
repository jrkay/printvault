import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"
import { ModelProps } from "@/utils/appTypes"
import { generateFileName } from "@/utils/helpers/uiHelpers"

export async function deleteFile(file: any, activeUser: User) {
  try {
    const fileName = file.href.split("/").pop()

    const supabase = createClientComponentClient()
    const { error: fileStorageError } = await supabase.storage
      .from("files")
      .remove(["public/" + activeUser.id + "/" + fileName])

    if (fileStorageError) {
      console.error("Error deleting data:", fileStorageError)
      return { fileStorageError, data: null }
    }

    const { error: fileTableError } = await supabase
      .from("model_files")
      .delete()
      .eq("id", file.id)

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
  activeUser: User,
  activeModel: ModelProps,
  fileData: any
) => {
  const getFileExtension = (href: string): string => {
    return href.match(/\.(\w{3})(?=\?|$)/)?.[1] ?? ""
  }

  try {
    const file = fileData.target.files[0]
    const extension = getFileExtension(file.name)
    const fileName = generateFileName(activeModel.name, extension)

    const modelpath = `public/${activeUser.id}/model_${fileName}`

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
      model_id: activeModel.id,
      href: filePath,
      size: file.size,
      file_name: fileName,
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
