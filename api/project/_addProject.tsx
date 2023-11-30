import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const addProject = async (data: any) => {
  const timestamp = new Date().toISOString()

  const project = {
    ...data,
    start_date: timestamp,
  }

  const supabase = createClientComponentClient()
  try {
    const { data: insertedData, error } = await supabase
      .from("projects")
      .insert(project)
      .single()

    if (error) {
      console.error("Error inserting data:", error)
      return { data: null, error }
    }

    return { data: insertedData, error: null }
  } catch (error) {
    console.error("Error in addProject:", error)
    return { data: null, error }
  }
}
