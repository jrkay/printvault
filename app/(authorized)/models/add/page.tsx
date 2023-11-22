import React from "react"
import ModelAddDisplay from "./modelAddDisplay"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase"

async function AddModel() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  return <ModelAddDisplay userData={userData} />
}

export default AddModel
