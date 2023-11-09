import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { v4 as uuidv4 } from "uuid"

const addModel = async (data: any) => {
  try {
    const model = {
      id: uuidv4.toString(),
      name: data.name,
      description: data.description,
      type: data.type,
      license: data.license,
      url: data.url,
      user_id: data.userId,
    }

    const supabase = createClientComponentClient()
    const { data: insertedData, error } = await supabase
      .from("models")
      .insert(model)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addModelClient:", error)
    return { data: null, error }
  }
}

export default addModel
