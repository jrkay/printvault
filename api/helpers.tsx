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

// Fetch project data from the supabase database
export async function getProjects() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("projects").select()

  if (data === null) {
    return [] as ProjectData[]
  }

  return data
}

// Fetch users data from the supabase database
export async function getUsers(auth: any) {
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

// Fetch print model data from the supabase database
export async function getModels(activeUser: any) {
  const supabase = createSupabaseClient()
  const { data } = await supabase
    .from("models")
    .select()
    .eq("user_id", activeUser?.user?.id)

  if (data === null) {
    return [] as ModelData[]
  }

  return data as ModelData[]
}

// Fetch print job data from the supabase database
export async function getPrintJobs() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("print_jobs").select()

  if (data === null) {
    return [] as JobData[]
  }

  return data
}

// Fetch image data from the supabase database
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

// Fetch data from model_tags
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

// Fetch data from printers
export async function getPrinters(): Promise<PrinterData[]> {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("printers").select()

  if (data === null) {
    return []
  }

  return data
}

// Fetch file from the supabase database
export async function getFiles() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("model_files").select()

  if (data === null) {
    return []
  }

  return data
}