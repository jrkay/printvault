import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabase = createClientComponentClient()

// For Update Operations
export async function updateFileClient(file: any) {
  const { error } = await supabase
    .from("print_files")
    .update(file)
    .match({ id: file.id })
  return error
}

// For Insert Operations
export const addFileClient = async (data: any) => {
  try {
    const file = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      type: data.type,
      tags: data.tags,
      license: data.license,
      url: data.url,
      user_id: data.userId,
    }

    const { data: insertedData, error } = await supabase
      .from("print_files")
      .insert(file)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addFileClient:", error)
    return { data: null, error }
  }
}

// For Delete Operations
export async function deleteFileClient(data: any) {
  try {
    const { error } = await supabase
      .from("print_files")
      .delete(data)
      .eq("id", data.id.toString())
    console.log("success")

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deleteFileClient:", error)
    return { error, data: null }
  }
}
