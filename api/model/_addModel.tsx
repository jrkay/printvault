import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const addModel = async (data: any) => {
  try {
    const supabase = createClientComponentClient()

    const { data: insertedData, error } = await supabase
      .from("models")
      .insert(data)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addModel:", error)
    return { data: null, error }
  }
}

export default addModel
