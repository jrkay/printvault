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

export async function getPrintMaterialOptions(type?: string) {
  try {
    const { data } = await supabaseClient
      .from("material")
      .select()
      .eq("material", type)
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getPrintMaterialName(id?: string): Promise<any | null> {
  try {
    const { data, error } = await supabaseClient
      .from("material")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      throw error
    }

    return data || null
  } catch (error) {
    handleError(error)
    return null
  }
}
