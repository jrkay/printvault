import { getModels } from "@/api/modelApi"
import { getProjectModels } from "@/api/projectModelApi"
import { getProjects } from "@/api/projectApi"
import ProjectListDisplay from "@/app/(authorized)/projects/ProjectPageDisplay"
import { supabase } from "@/api/supabaseServer"
import { getUserData } from "@/utils/helpers/userHelpers"

async function Projects() {
  const userDataResponse = await supabase.auth.getUser()
  const activeUser = userDataResponse.data.user
  const userDataTable = await getUserData()

  const projectData = await getProjects(activeUser)
  const modelData = await getModels(activeUser)
  const projectModelData = await getProjectModels()

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
