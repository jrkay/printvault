import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function updatePrintJob(job: any) {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from("print_jobs")
      .update(job)
      .eq("id", job.id)

    return { error, data: null }
  } catch (error) {
    console.error("Error in updatePrintJob:", error)

    return { error, data: null }
  }
}
