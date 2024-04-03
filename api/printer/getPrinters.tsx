import { supabase, handleError } from "@/app/supabaseClient"
import { PrinterData } from "@/utils/appTypes"

export async function getPrinters(): Promise<PrinterData[]> {
  try {
    const { data } = await supabase.from("printers").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
