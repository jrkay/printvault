import LoginDisplay from "@/app/(unauthorized)/loginDisplay"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { useRouter } from "next/navigation"

async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession() // get session info

  const router = useRouter()

  if (session) {
    router.push(`/dashboard`)
    return null
  }
  return <LoginDisplay />
}

export default Page
