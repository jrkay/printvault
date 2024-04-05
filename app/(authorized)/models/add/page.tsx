import React from "react"
import ModelAddDisplay from "./ModelAdd"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"

async function AddModel() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  return <ModelAddDisplay userData={userData} />
}

export default AddModel
