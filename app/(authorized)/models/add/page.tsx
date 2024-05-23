import React from "react"
import ModelAddDisplay from "./ModelAdd"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"

async function AddModel() {
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    return <ModelAddDisplay userData={activeUser?.id} />
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading model add page</div>
  }
}

export default AddModel
