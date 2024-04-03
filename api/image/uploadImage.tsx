import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
