import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { v4 as uuidv4 } from "uuid"

export const addPrintJob = async (data: any) => {
  try {
    const printJob = {
      date: data.date,
      printer_id: data.printer,
      status: data.status,
      duration: data.duration,
      comments: data.comments,
      model_id: data.model_id,
      fail_comment: data.fail_comment,
      user_id: data.user_id,
    }
    console.log("addPrintJob", data)

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
