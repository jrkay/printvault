import { supabase, handleError } from "@/app/supabaseClient"

export async function updateFile(model: any) {
  try {
    const { error } = await supabase
      .from("models")
      .update(model)
      .eq("id", model.id)
    return error
  } catch (error) {
    handleError(error)
    return error
  }
}
