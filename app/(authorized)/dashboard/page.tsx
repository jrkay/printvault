import { getModels } from "@/api/modelApi"
import { getProjects } from "@/api/projectApi"
import { getProjectModels } from "@/api/projectModelApi"
import { getImages } from "@/api/imageApi"
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
