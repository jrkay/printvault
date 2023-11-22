import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  getModels,
  getProjects,
  getActiveUser,
  getPrintJobs,
  getImages,
  getProjectModels,
  getModelTags,
  getPrinters,
  getFiles,
  getUserData,
} from "@/api/helpers.tsx"
import ModelDetailDisplay from "@/app/(authorized)/models/[id]/modelDetailDisplay"

async function ModelDetail() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects()
  const activeUser = await getActiveUser(userData)
  const modelData = await getModels(userData)
  const jobData = await getPrintJobs()
  const imageDataTable = await getImages()
  const projectModelData = await getProjectModels()
  const modelTags = await getModelTags()
  const printerData = await getPrinters()
  const fileData = await getFiles()
  const userDataTable = await getUserData()

  return (
    <ModelDetailDisplay
      modelData={modelData}
      imageData={imageDataTable}
      activeUser={activeUser}
      modelTags={modelTags}
      fileData={fileData}
      projectModelData={projectModelData}
      projectData={projectData}
      jobData={jobData}
      printerData={printerData}
      page='Models'
      userData={userDataTable}
    />
  )
}

export default ModelDetail
