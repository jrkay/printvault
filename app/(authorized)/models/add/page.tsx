import React from "react"
import ModelAddDisplay from "./modelAddDisplay"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase"

async function AddModel() {
  const [userData] = await Promise.all([
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  return (
    <>
      <ModelAddDisplay userData={userData} />
    </>
  )
}

export default AddModel
