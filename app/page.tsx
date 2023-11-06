import LoginForm from "@/components/login/login-form"
import Link from "next/link"
import LoginDisplay from "@/app/loginDisplay"
import { Grid, Header, Form, Button } from "semantic-ui-react"
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
