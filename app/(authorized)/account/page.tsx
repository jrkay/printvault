import React from "react"
import AccountDisplay from "@/app/(authorized)/account/accountDisplay"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getProjects } from "@/api/helpers.tsx"
import "@/styles/index.css"

async function AccountPage() {
  const [userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  return (
    console.log("active user", userData),
    (<AccountDisplay activeUser={userData} />)
  )
}

export default AccountPage
