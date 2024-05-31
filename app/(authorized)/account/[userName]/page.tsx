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
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    if (!activeUser) {
      throw new Error("User not authenticated")
    }

    const [projectData, modelData, projectModelData, userDataTable] =
      await Promise.all([
        getProjects(activeUser),
        getModels(activeUser),
        getProjectModels(activeUser),
        getUserData(),
      ])

    // Filter to find the active user
    const activeUserData = userDataTable.find(
      (user) => user.id === activeUser.id
    )

    return (
      <PublicAccountDisplay
        activeUser={activeUserData}
        modelData={modelData}
        projectData={projectData}
        projectModelData={projectModelData}
      />
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading account</div>
  }
}

export default PublicAccountPage
