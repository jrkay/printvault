"use client"

import { UserProps } from "@/utils/appTypes"
import { useRouter } from "next/navigation"

function AccountDisplay({ activeUser }: { activeUser: UserProps }) {
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
