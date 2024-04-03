import { supabase, handleError } from "@/app/supabaseClient"

export async function getPrintJobs() {
  try {
    const { data } = await supabase.from("print_jobs").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
