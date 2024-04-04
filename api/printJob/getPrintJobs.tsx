import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export async function getPrintJobs(model: string) {
  try {
    const { data } = await supabaseClient
      .from("print_jobs")
      .select()
      .eq("model_id", model)
      .order("created_at", { ascending: false })
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
