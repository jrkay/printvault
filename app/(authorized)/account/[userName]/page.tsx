import React from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import "@/styles/index.css"
import { getActiveUser } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/model/getModels"
import { getProjects } from "@/api/project/getProjects"
import { getProjectModels } from "@/api/projectModel/getProjectModels"
import { cookies } from "next/headers"
import PublicAccountDisplay from "@/app/(authorized)/account/[userName]/PublicUserAccountDisplay"

async function PublicAccountPage() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects(userData)
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
