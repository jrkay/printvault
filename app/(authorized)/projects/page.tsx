import { getModels } from "@/api/api/modelApi"
import { getProjectModels } from "@/api/api/projectModelApi"
import { getProjects } from "@/api/api/projectApi"
import ProjectListDisplay from "@/app/(authorized)/projects/ProjectPageDisplay"
import { getUserData } from "@/utils/helpers/userHelpers"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function Projects() {
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
        getProjectModels(),
        getProjects(activeUser),
        getUserData(),
      ])

    return (
      <ProjectListDisplay
        modelData={modelData}
        projectData={projectData}
        projectModelData={projectModelData}
        userData={userDataTable}
        activeUser={activeUser}
      />
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading projects</div>
  }
}

export default Projects
