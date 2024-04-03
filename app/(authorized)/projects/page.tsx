import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import { getModels } from "@/api/model/getModels"
import { getProjectModels } from "@/api/projectModel/getProjectModels"
import { getProjects } from "@/api/project/getProjects"
import { getActiveUser } from "@/utils/helpers/userHelpers"
import "@/styles/index.css"
import ProjectListDisplay from "@/app/(authorized)/projects/ProjectListDisplay"
import { cookies } from "next/headers"

async function Projects() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects(userData)
  const modelData = await getModels(userData)
  const projectModelData = await getProjectModels()
  const activeUser = await getActiveUser(userData)

  return (
    <ProjectListDisplay
      modelData={modelData}
      projectData={projectData}
      projectModelData={projectModelData}
      displaySort={true}
      userData={activeUser}
    />
  )
}

export default Projects
