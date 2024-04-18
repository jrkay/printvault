import { handleError } from "@/utils/helpers/helpers"
import { supabaseClient } from "@/api/supabaseClient"

export async function getMatchingModels(searchTerm: any, user: any) {
  try {
    const searchString = searchTerm ? searchTerm.searchParams.q : null

    let query = supabaseClient
      .from(user ? "models" : "demo_models")
      .select()
      .or(`name.ilike.%${searchString}%,description.ilike.%${searchString}%`)

    if (user) {
      query = query.eq("user_id", user.id)
    }

    const { data, error } = await query

    if (error) {
      handleError(error)
      return []
    }

    return data
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getMatchingProjects(searchTerm: any, user: any) {
  try {
    const searchString = searchTerm ? searchTerm.searchParams.q : null

    let query = supabaseClient
      .from(user ? "projects" : "demo_projects")
      .select()
      .or(`name.ilike.%${searchString}%,description.ilike.%${searchString}%`)

    if (user) {
      query = query.eq("user_id", user.id)
    }

    const { data, error } = await query

    if (error) {
      handleError(error)
      return []
    }

    return data
  } catch (error) {
    handleError(error)
    return []
  }
}
