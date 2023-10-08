import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../types/supabase.ts'


  // Create the supabase client with the given cookies
function createSupabaseClient() {
  const cookieStorage = cookies()
  return createServerComponentClient<Database>({ cookies: () => cookieStorage })
}

// Fetch projects data from the supabase database
export async function getProjects() {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from('projects').select()
  return data
}

// Fetch users data from the supabase database
export async function getUsers(auth:any) {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from('users').select().match({ id: auth?.user?.id })
  return data
}

// Fetch print files data from the supabase database
export async function getPrintFiles(auth:any) {
  const supabase = createSupabaseClient()
  const { data } = await supabase.from('print_files').select().match({ user_id: auth?.user?.id })
  return data
}