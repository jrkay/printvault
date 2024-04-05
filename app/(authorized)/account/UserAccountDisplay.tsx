"use client"

import { UserData } from "@/utils/appTypes"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

function AccountDisplay({ activeUser }: { activeUser: UserData }) {
  const router = useRouter()

  if (activeUser) {
    const username = activeUser.username
    router.push(`/account/${username}`)
    return null
  } else {
    // Handle cases where user is not authenticated and redirect home
    router.push("/")
    return null
  }
}

export default AccountDisplay
