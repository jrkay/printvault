import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { supabaseClient } from "@/api/supabaseClient"
import { handleError } from "@/utils/helpers/helpers"

export const addPrintJob = async (data: any) => {
  try {
    const supabase = createClientComponentClient()

    const { data: insertedData, error } = await supabase
      .from("print_jobs")
      .insert(data)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addPrintJob:", error)
    return { data: null, error }
  }
}

export async function deletePrintJob(data: any) {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase
      .from("print_jobs")
      .delete()
      .match({ id: data.id })

    if (error) {
      console.error("Error deleting data:", error)
      return { error, data: null }
    }

    return { error: null, data: null }
  } catch (error) {
    console.error("Error in deletePrintJob:", error)
    return { error, data: null }
  }
}

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
