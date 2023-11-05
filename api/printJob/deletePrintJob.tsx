import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

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
