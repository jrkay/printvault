import LoginDisplay from "@/app/(unauthorized)/LoginDisplay"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession() // get session info

  if (session) return redirect(`/dashboard`) // redirect if there is a session

  return <LoginDisplay />
}

export default Page
