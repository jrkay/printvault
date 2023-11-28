import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const addProject = async (data: any) => {
  try {
    const timestamp = new Date().toISOString()

    const project = {
      id: data.id,
      name: data.name,
      description: data.description,
      start_date: timestamp,
      status: data.status,
      comments: data.comments,
      user_id: data.userId,
    }

    const supabase = createClientComponentClient()
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
