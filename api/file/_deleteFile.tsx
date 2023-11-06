import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
      console.error("Error deleting data:", fileTableError)
      return { fileTableError, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteFile:", error)
    return { error, data: null }
  }
}
