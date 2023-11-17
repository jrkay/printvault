"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import "@/styles/index.css"
import { UserData } from "@/utils/AppRoutesProps.tsx"

function AccountPage({ activeUser }: { activeUser: UserData[] }) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the account page of the user
    if (activeUser && activeUser.length > 0) {
      const username = activeUser[0].username // Assuming the username is in the userData
      router.push(`/account/${username}`)
    } else {
      // Handle cases where the user is not authenticated
      // Redirect to login page or some other page
      router.push("/login")
    }
  }, [activeUser, router])

  return <div></div>
}

export default AccountPage
