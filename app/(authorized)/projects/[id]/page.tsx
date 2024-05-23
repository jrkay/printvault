import { getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/api/modelApi"
import { getProjectModels } from "@/api/api/projectModelApi"
import { getImages } from "@/api/api/imageApi"
import { getProjects } from "@/api/api/projectApi"
import ProjectDetailDisplay from "@/app/(authorized)/projects/[id]/ProjectDetailsDisplay"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function ProjectDetail() {
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    const [modelData, imageData, projectModelData, projectData, userDataTable] =
      await Promise.all([
        getModels(activeUser),
        getImages(activeUser),
        getProjectModels(),
        getProjects(activeUser),
        getUserData(),
      ])

    return (
      <ProjectDetailDisplay
        modelData={modelData}
        projectModelData={projectModelData}
        projectData={projectData}
        imageData={imageData}
        userData={userDataTable}
        activeUser={activeUser?.id}
      />
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading project information</div>
  }
}

export default ProjectDetail
