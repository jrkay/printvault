import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getActiveUser, getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/model/getModels"
import { getImages } from "@/api/image/getImages"
import { getPrinters } from "@/api/printer/getPrinters"

import { getFiles } from "@/api/file/getFiles"

import { getProjects } from "@/api/project/getProjects"
import ModelDetailDisplay from "@/app/(authorized)/models/[id]/ModelDetails"

async function ModelDetail() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const projectData = await getProjects(userData)
  const activeUser = await getActiveUser(userData)
  const modelData = await getModels(userData)

  const imageDataTable = await getImages(userData)

  const printerData = await getPrinters()
  const fileData = await getFiles()
  const userDataTable = await getUserData()

  return (
    <ModelDetailDisplay
      modelData={modelData}
      imageData={imageDataTable}
      activeUser={activeUser}
      fileData={fileData}
      projectData={projectData}
      printerData={printerData}
      userData={userDataTable}
    />
  )
}

export default ModelDetail
