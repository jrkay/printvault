"use server"

import { getModels } from "@/api/model/getModels"
import { getImages } from "@/api/image/getImages"
import { getPrinters } from "@/api/printer/getPrinters"
import { supabase } from "@/api/supabaseServer"
import { getFiles } from "@/api/file/getFiles"
import { getUserData } from "@/api/user/getUser"
import { getProjects } from "@/api/project/getProjects"
import ModelDetailDisplay from "@/app/(authorized)/models/[id]/ModelDetails"

async function ModelDetail() {
  const userDataResponse = await supabase.auth.getUser()
  const activeUser = userDataResponse.data.user
  const userDataTable = await getUserData()

  const projectData = await getProjects(activeUser)
  const modelData = await getModels(activeUser)
  const imageDataTable = await getImages(activeUser)
  const printerData = await getPrinters()
  const fileData = await getFiles()

  return (
    <ModelDetailDisplay
      modelData={modelData}
      imageData={imageDataTable}
      fileData={fileData}
      projectData={projectData}
      printerData={printerData}
      userData={userDataTable}
      activeUser={activeUser}
    />
  )
}

export default ModelDetail
