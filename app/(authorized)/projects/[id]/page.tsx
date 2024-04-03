import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import { getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/model/getModels"
import { getProjectModels } from "@/api/projectModel/getProjectModels"
import { getImages } from "@/api/image/getImages"
import { getProjects } from "@/api/project/getProjects"
import "@/styles/index.css"
import ProjectDetailDisplay from "@/app/(authorized)/projects/[id]/ProjectDetailsDisplay"
import { cookies } from "next/headers"

async function ProjectDetail() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects(userData)
  const modelData = await getModels(userData)
  const projectModelData = await getProjectModels()
  const imageData = await getImages(userData)
  const userDataTable = await getUserData()

  return (
    <ProjectDetailDisplay
      modelData={modelData}
      projectModelData={projectModelData}
      projectData={projectData}
      imageData={imageData}
      userData={userDataTable}
      activeUser={userData}
    />
  )
}

export default ProjectDetail
