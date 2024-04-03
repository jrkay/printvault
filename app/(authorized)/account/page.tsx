import React from "react"
import AccountDisplay from "@/app/(authorized)/account/UserAccountDisplay"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import "@/styles/index.css"
import { getActiveUser } from "@/utils/helpers/userHelpers"
import { UserData } from "@/utils/appTypes"

async function AccountPage() {
  const [userData] = await Promise.all([
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const activeUser: UserData[] = await getActiveUser(userData)

  return <AccountDisplay activeUser={activeUser} />
}

export default AccountPage
