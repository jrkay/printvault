import { supabaseClient } from "@/api/supabaseClient"
import { PrinterProps } from "@/utils/appTypes"
import { handleError } from "@/utils/helpers/helpers"

export async function getPrinters(): Promise<PrinterProps[]> {
  try {
    const { data } = await supabaseClient.from("printers").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
