import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import {
  getModels,
  getProjects,
  getProjectModels,
  getImages,
  getUserData,
} from "@/api/helpers"
import "@/styles/index.css"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps"
import ProjectDetailDisplay from "@/app/(authorized)/projects/[id]/projectDetailDisplay"
import { cookies } from "next/headers"

async function ProjectDetail() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects()
  const modelData = await getModels(userData)
  const projectModelData = await getProjectModels()
  const imageData = await getImages()
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
