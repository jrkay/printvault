import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  PrinterData,
  ProjectData,
  ModelData,
  UserData,
  JobData,
  ImageData,
  ProjectModelData,
} from "@/utils/AppRoutesProps.tsx"

// Create the supabase client with the given cookies
const supabase = createServerComponentClient<Database>({
  cookies: () => cookies(),
})

// Function to handle errors
function handleError(error: any) {
  console.error("Error:", error)
}

export async function getProjects(activeUser: any) {
  const userRole = activeUser?.user?.role
  // Determine the table name based on the user role
  const tableName = userRole === "authenticated" ? "projects" : "demo_projects"

  try {
    const { data } = await supabase.from(tableName).select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getActiveUser(auth: any) {
  try {
    const { data } = await supabase
      .from("users")
      .select()
      .match({ id: auth?.user?.id })
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getUserData() {
  try {
    const { data } = await supabase.from("users").select("*")
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getModels(activeUser: any) {
  const user = activeUser?.user?.id
  const userRole = activeUser?.user?.role
  // Determine the table name based on the user role
  const tableName = userRole === "authenticated" ? "models" : "demo_models"

  try {
    let combinedData = []

    if (userRole) {
      // Fetch models where the user is the owner
      const { data: ownedModels } = await supabase
        .from(tableName)
        .select()
        .eq("user_id", user)

      // Fetch models where the user is in the shared_with array
      const { data: sharedModels } = await supabase
        .from(tableName)
        .select()
        .contains("shared_with", [user])

      if (ownedModels || sharedModels) {
        // Combine the results, excluding duplicates
        combinedData = [
          ...(ownedModels || []),
          ...(sharedModels || []).filter(
            (model) => !(ownedModels || []).find((m) => m.id === model.id)
          ),
        ]
      }
    } else {
      // Fetch models for guest access
      const { data: guestModels } = await supabase.from("demo_models").select()
      combinedData = guestModels || []
    }

    return combinedData
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getPrintJobs() {
  try {
    const { data } = await supabase.from("print_jobs").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getImages(activeUser: any) {
  const user = activeUser?.user?.id
  const userRole = activeUser?.user?.role
  // Determine the table name based on the user role
  const tableName = userRole === "authenticated" ? "images" : "demo_images"

  try {
    const { data } = await supabase.from(tableName).select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getProjectModels() {
  try {
    const { data } = await supabase.from("project_models").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function updateFile(model: any) {
  try {
    const { error } = await supabase
      .from("models")
      .update(model)
      .eq("id", model.id)
    return error
  } catch (error) {
    handleError(error)
    return error
  }
}

export async function getModelTags() {
  try {
    const { data } = await supabase.from("model_tags").select("*, tags(name)")
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getPrinters(): Promise<PrinterData[]> {
  try {
    const { data } = await supabase.from("printers").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}

export async function getFiles() {
  try {
    const { data } = await supabase.from("model_files").select()
    return data || []
  } catch (error) {
    handleError(error)
    return []
  }
}
