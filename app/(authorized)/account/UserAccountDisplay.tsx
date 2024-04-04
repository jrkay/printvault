"use client"

import { useRouter } from "next/navigation"

function AccountDisplay({ activeUser }: { activeUser: any }) {
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
