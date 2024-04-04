import { getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/modelApi"
import { getProjectModels } from "@/api/projectModelApi"
import { getImages } from "@/api/imageApi"
import { getProjects } from "@/api/projectApi"
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
