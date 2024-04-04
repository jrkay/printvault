"use client"

import { useRouter } from "next/navigation"
import { UserData } from "@/utils/appTypes"

function AccountDisplay({ activeUser }: { activeUser: UserData[] }) {
  const router = useRouter()

  if (activeUser && activeUser.length > 0) {
    const username = activeUser[0].username
    router.push(`/account/${username}`)
    return null
  } else {
    // Handle cases where user is not authenticated and redirect home
    router.push("/")
    return null
  }
}

export default AccountDisplay
