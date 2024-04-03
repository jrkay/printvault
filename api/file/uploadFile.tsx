import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
