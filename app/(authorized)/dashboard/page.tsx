import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import { getModels } from "@/api/model/getModels"
import { getProjects } from "@/api/project/getProjects"
import { getProjectModels } from "@/api/projectModel/getProjectModels"
import { getImages } from "@/api/image/getImages"
import "@/styles/index.css"
import { cookies } from "next/headers"
import HomescreenGrid from "./HomescreenGrid"

async function Page() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects(userData)
  const modelData = await getModels(userData)
  const imageDataTable = await getImages(userData)
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
