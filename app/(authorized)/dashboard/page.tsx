import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import {
  getModels,
  getProjects,
  getImages,
  getProjectModels,
} from "@/api/helpers"
import "@/styles/index.css"
import { cookies } from "next/headers"
import HomescreenDisplay from "@/app/(authorized)/dashboard/HomescreenDisplay"

async function Page() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects()
  const modelData = await getModels(userData)
  const imageDataTable = await getImages()
  const projectModelData = await getProjectModels()

  return (
    <HomescreenDisplay
      projectData={projectData}
      modelData={modelData}
      imageData={imageDataTable}
      projectModelData={projectModelData}
    />
  )
}

export default Page
