import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "../types/supabase.ts"

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
  return data
}

// Fetch users data from the supabase database
export async function getUsers(auth: any) {
  const supabase = createSupabaseClient()
  const { data } = await supabase
    .from("users")
    .select()
    .match({ id: auth?.user?.id })
  return data
}

// Fetch print file data from the supabase database
export async function getModels(activeUser: any) {
  const supabase = createSupabaseClient()
  const { data } = await supabase
    .from("models")
    .select()
    .eq("user_id", activeUser?.user?.id)
  return data
}

// Fetch print job data from the supabase database
export async function getPrintJobs() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("print_jobs").select()
  return data
}

// Fetch image data from the supabase database
export async function getImages() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("images").select()
  return data
}

export async function getProjectFiles() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from("project_files").select()
  return data
}

export async function updateFile(file: any) {
  const supabase = createSupabaseClient()
  const { error } = await supabase.from("models").update(file).eq("id", file.id)
  return error
}
