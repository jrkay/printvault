import React from "react"
import AccountDisplay from "@/app/account/accountDisplay"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getProjects, getUsers } from "@/api/helpers.tsx"
import "@/styles/index.css"
import { UserData } from "@/utils/AppRoutesProps.tsx"

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
