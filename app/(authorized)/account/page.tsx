import React from "react"
import AccountDisplay from "@/app/(authorized)/account/UserAccountDisplay"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getUserData } from "@/utils/helpers/userHelpers"

async function AccountPage() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const userDataTable = await getUserData()
  // Filter on the active user
  const activeUser = userDataTable.find((user) => user.id === userData?.id)

  return <AccountDisplay activeUser={activeUser} />
}

export default AccountPage
