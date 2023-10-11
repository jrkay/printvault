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
export async function getPrintFiles(auth: any) {
  const supabase = createSupabaseClient()
  const { data } = await supabase
    .from("print_files")
    .select()
    .match({ user_id: auth?.user?.id })
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
