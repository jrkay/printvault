import React from "react"
import { getModels } from "@/api/api/modelApi"
import { getProjects } from "@/api/api/projectApi"
import { getProjectModels } from "@/api/api/projectModelApi"
import PublicAccountDisplay from "@/app/(authorized)/account/[userName]/PublicUserAccountDisplay"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getUserData } from "@/utils/helpers/userHelpers"

async function PublicAccountPage() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const projectData = await getProjects(userData)
  const modelData = await getModels(userData)
  const projectModelData = await getProjectModels()
  const userDataTable = await getUserData()
  // Filter on the active user
  const activeUser = userDataTable.find((user) => user.id === userData?.id)

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
