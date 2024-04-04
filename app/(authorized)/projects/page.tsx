import { getModels } from "@/api/model/getModels"
import { getProjectModels } from "@/api/projectModel/getProjectModels"
import { getProjects } from "@/api/project/getProjects"
import { getActiveUser } from "@/utils/helpers/userHelpers"
import ProjectListDisplay from "@/app/(authorized)/projects/ProjectPageDisplay"
import { supabase } from "@/api/supabaseServer"
import { getUserData } from "@/api/user/getUser"

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
