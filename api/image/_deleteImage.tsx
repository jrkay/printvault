import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
