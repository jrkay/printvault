import { getModels } from "@/api/api/modelApi"
import { getProjects } from "@/api/api/projectApi"
import { getProjectModels } from "@/api/api/projectModelApi"
import { getUserData } from "@/utils/helpers/userHelpers"
import HomescreenGrid from "./HomescreenGrid"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function Dashboard() {
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    const [modelData, projectModelData, projectData, userDataTable] =
      await Promise.all([
        getModels(activeUser),
        getProjectModels(activeUser),
        getProjects(activeUser),
        getUserData(),
      ])

    return (
      <HomescreenGrid
        projectData={projectData}
        modelData={modelData}
        projectModelData={projectModelData}
        userData={activeUser}
      />
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading dashboard</div>
  }
}

export default Dashboard
