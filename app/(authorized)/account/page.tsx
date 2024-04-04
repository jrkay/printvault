import React from "react"
import AccountDisplay from "@/app/(authorized)/account/UserAccountDisplay"
import { supabase } from "@/api/supabaseServer"

async function AccountPage() {
  const userDataResponse = await supabase.auth.getUser()
  const activeUser = userDataResponse.data.user

  return <AccountDisplay activeUser={activeUser} />
}

export default AccountPage
