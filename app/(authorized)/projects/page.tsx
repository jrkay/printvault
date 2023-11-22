import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import {
  getModels,
  getProjects,
  getProjectModels,
  getUserData,
} from "@/api/helpers"
import "@/styles/index.css"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps"
import ProjectListDisplay from "@/app/(authorized)/projects/projectListDisplay"
import { cookies } from "next/headers"

async function Projects() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects()
  const modelData = await getModels(userData)
  const projectModelData = await getProjectModels()
  const userDataTable = await getUserData()

  return (
    <ProjectListDisplay
      modelData={modelData}
      projectData={projectData}
      projectModelData={projectModelData}
      displaySort={true}
      userData={userDataTable}
    />
  )
}

export default Projects
