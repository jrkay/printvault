import React from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import "@/styles/index.css"
import {
  getActiveUser,
  getModels,
  getProjects,
  getProjectModels,
} from "@/api/helpers.tsx"
import {
  UserData,
  ModelData,
  ProjectModelData,
} from "@/utils/AppRoutesProps.tsx"
import PublicAccountDisplay from "@/app/(authorized)/account/[userName]/publicAccountDisplay"

async function publicAccountPage() {
  const [projectData, userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const activeUser: UserData[] = await getActiveUser(userData)
  const modelDataTable: ModelData[] = await getModels(userData)
  const projectModelData: ProjectModelData[] = await getProjectModels()

  return (
    <PublicAccountDisplay
      activeUser={activeUser}
      modelData={modelDataTable}
      projectData={projectData}
      projectModelData={projectModelData}
    />
  )
}

export default publicAccountPage
