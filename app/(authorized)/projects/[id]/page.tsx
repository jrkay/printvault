import { getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/api/modelApi"
import { getProjectModels } from "@/api/api/projectModelApi"
import { getImages } from "@/api/api/imageApi"
import { getProjects } from "@/api/api/projectApi"
import ProjectDetailDisplay from "@/app/(authorized)/projects/[id]/ProjectDetailsDisplay"
import { supabaseClient } from "@/api/supabaseClient"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function ProjectDetail() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const userDataTable = await getUserData()
  const projectData = await getProjects(userData)
  const modelData = await getModels(userData)
  const projectModelData = await getProjectModels()
  const imageData = await getImages(userData)

  return (
    <ProjectDetailDisplay
      modelData={modelData}
      projectModelData={projectModelData}
      projectData={projectData}
      imageData={imageData}
      userData={userDataTable}
      activeUser={userData?.id}
    />
  )
}

export default ProjectDetail
