import React from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import "@/styles/index.css"
import {
  getActiveUser,
  getModels,
  getProjects,
  getProjectModels,
} from "@/api/helpers"
import { cookies } from "next/headers"
import PublicAccountDisplay from "@/app/(authorized)/account/[userName]/publicAccountDisplay"

async function PublicAccountPage() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects()
  const activeUser = await getActiveUser(userData)
  const modelData = await getModels(userData)
  const projectModelData = await getProjectModels()

  return (
    <PublicAccountDisplay
      activeUser={activeUser}
      modelData={modelData}
      projectData={projectData}
      projectModelData={projectModelData}
    />
  )
}

export default PublicAccountPage
