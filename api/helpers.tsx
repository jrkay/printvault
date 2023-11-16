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
function createSupabaseClient() {
  const cookieStorage = cookies()
  return createServerComponentClient<Database>({
    cookies: () => cookieStorage,
  })
}

export async function getProjects() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("projects").select()

  if (data === null) {
    return [] as ProjectData[]
  }

  return data
}

export async function getActiveUser(auth: any) {
  const supabase = createSupabaseClient()
  const { data } = await supabase
    .from("users")
    .select()
    .match({ id: auth?.user?.id })

  if (data === null) {
    return [] as UserData[]
  }

  return data
}

export async function getUserData() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("users").select("*")

  if (data === null) {
    return [] as UserData[]
  }

  return data
}

export async function getModels(activeUser: any) {
  const user = activeUser?.user?.id

  const supabase = createSupabaseClient()

  // Fetch models where the user is owner
  const { data: ownedModels, error: ownedError } = await supabase
    .from("models")
    .select()
    .eq("user_id", user)

  // Fetch models where user is in shared_with array
  const { data: sharedModels, error: sharedError } = await supabase
    .from("models")
    .select()
    .contains("shared_with", [user])

  if (ownedError || sharedError) {
    console.error("Error fetching models:", ownedError || sharedError)
    return []
  }

  // Combine the results, with no duplicates
  const combinedData = [
    ...ownedModels,
    ...sharedModels.filter(
      (model) => !ownedModels.find((m) => m.id === model.id)
    ),
  ]

  return combinedData as ModelData[]
}

export async function getPrintJobs() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("print_jobs").select()

  if (data === null) {
    return [] as JobData[]
  }

  return data
}

export async function getImages() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("images").select()

  if (data === null) {
    return [] as ImageData[]
  }

  return data
}

export async function getProjectModels() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("project_models").select()

  if (data === null) {
    return [] as ProjectModelData[]
  }

  return data
}

export async function updateFile(model: any) {
  const supabase = createSupabaseClient()
  const { error } = await supabase
    .from("models")
    .update(model)
    .eq("id", model.id)
  return error
}

export async function getModelTags() {
  const supabase = createSupabaseClient()
  const { data, error } = await supabase
    .from("model_tags")
    .select("*, tags(name)")

  if (data === null) {
    return []
  }

  return data
}

export async function getPrinters(): Promise<PrinterData[]> {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("printers").select()

  if (data === null) {
    return []
  }

  return data
}

export async function getFiles() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("model_files").select()

  if (data === null) {
    return []
  }

  return data
}
