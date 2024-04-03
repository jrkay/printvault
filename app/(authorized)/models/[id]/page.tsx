import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getActiveUser, getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/model/getModels"
import { getProjectModels } from "@/api/projectModel/getProjectModels"
import { getImages } from "@/api/image/getImages"
import { getPrinters } from "@/api/printer/getPrinters"
import { getPrintJobs } from "@/api/printJob/getPrintJobs"
import { getFiles } from "@/api/file/getFiles"
import { getModelTags } from "@/api/modelTag/getModelTags"
import { getProjects } from "@/api/project/getProjects"
import ModelDetailDisplay from "@/app/(authorized)/models/[id]/ModelDetailDisplay"

async function ModelDetail() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects(userData)
  const activeUser = await getActiveUser(userData)
  const modelData = await getModels(userData)
  const jobData = await getPrintJobs()
  const imageDataTable = await getImages(userData)
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
