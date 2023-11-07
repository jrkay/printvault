import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const addPrintJob = async (data: any) => {
  try {
    const printJob = {
      id: crypto.randomUUID(),
      date: data.date,
      printer_id: data.printer,
      status: data.status,
      material_type: data.material_type,
      duration: data.duration,
      comments: data.comments,
      model_id: data.model_id,
      fail_comment: data.fail_comment,
    }

    const supabase = createClientComponentClient()
    const { data: insertedData, error } = await supabase
      .from("print_jobs")
      .insert(printJob)
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
