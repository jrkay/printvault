import { getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/model/getModels"
import { getProjectModels } from "@/api/projectModel/getProjectModels"
import { getImages } from "@/api/image/getImages"
import { getProjects } from "@/api/project/getProjects"
import ProjectDetailDisplay from "@/app/(authorized)/projects/[id]/ProjectDetailsDisplay"
import { supabase } from "@/api/supabaseServer"

async function ProjectDetail() {
  const userDataResponse = await supabase.auth.getUser()
  const activeUser = userDataResponse.data.user
  const userDataTable = await getUserData()

  const projectData = await getProjects(activeUser)
  const modelData = await getModels(activeUser)
  const projectModelData = await getProjectModels()
  const imageData = await getImages(activeUser)

  return (
    <ProjectDetailDisplay
      modelData={modelData}
      projectModelData={projectModelData}
      projectData={projectData}
      imageData={imageData}
      userData={userDataTable}
      activeUser={activeUser}
    />
  )
}

export default ProjectDetail
