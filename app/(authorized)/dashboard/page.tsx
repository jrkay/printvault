import { getModels } from "@/api/model/getModels"
import { getProjects } from "@/api/project/getProjects"
import { getProjectModels } from "@/api/projectModel/getProjectModels"
import { getImages } from "@/api/image/getImages"
import HomescreenGrid from "./HomescreenGrid"
import { supabase } from "@/api/supabaseServer"

async function Page() {
  const userDataResponse = await supabase.auth.getUser()
  const activeUser = userDataResponse.data.user

  const projectData = await getProjects(activeUser)
  const modelData = await getModels(activeUser)
  const imageDataTable = await getImages(activeUser)
  const projectModelData = await getProjectModels()

  return (
    <HomescreenGrid
      projectData={projectData}
      modelData={modelData}
      imageData={imageDataTable}
      projectModelData={projectModelData}
    />
  )
}

export default Page
