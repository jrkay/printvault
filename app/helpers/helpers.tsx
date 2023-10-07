import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../types/supabase.ts'

export async function ProjectServerComponent() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
    const { data } = await supabase.from('projects').select()
    return data;
  }

  export async function UsersServerComponent(auth:any) {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
    const { data } = await supabase.from('users').select().match({ id: auth?.user?.id })
    return data;
  }

  export async function PrintFilesServerComponent() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore })
    const { data } = await supabase.from('print_files').select()
    return data;
  }
