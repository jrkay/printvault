import { supabase, handleError } from "@/app/supabaseClient"

export async function getPrintJobs(model: string) {
  try {
    const { data } = await supabase
      .from("print_jobs")
      .select()
      .eq("model_id", model)
      .order("created_at", { ascending: false })

    console.log("jobs++++page---", data)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
