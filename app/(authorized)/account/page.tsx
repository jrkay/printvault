import React from "react"
import AccountDisplay from "@/app/(authorized)/account/UserAccountDisplay"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getUserData } from "@/utils/helpers/userHelpers"

async function AccountPage() {
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    // Fetch user data table
    const userDataTable = await getUserData()

    // Filter to find the active user
    const activeUserData = userDataTable.find(
      (user) => user.id === activeUser?.id
    )

    return <AccountDisplay activeUser={activeUserData} />
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading account page</div>
  }
}

export default AccountPage
