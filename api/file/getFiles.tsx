import { supabase, handleError } from "@/app/supabaseClient"

export async function getFiles() {
  try {
    const { data } = await supabase.from("model_files").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
