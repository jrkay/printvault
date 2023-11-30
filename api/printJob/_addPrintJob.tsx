import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
