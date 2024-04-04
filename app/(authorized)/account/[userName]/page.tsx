import React from "react"
import { getModels } from "@/api/modelApi"
import { getProjects } from "@/api/projectApi"
import { getProjectModels } from "@/api/projectModelApi"
import PublicAccountDisplay from "@/app/(authorized)/account/[userName]/PublicUserAccountDisplay"
import { supabase } from "@/api/supabaseServer"

async function PublicAccountPage() {
  const userDataResponse = await supabase.auth.getUser()
  const activeUser = userDataResponse.data.user

  const projectData = await getProjects(activeUser)
  const modelData = await getModels(activeUser)
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
