import { getModels } from "@/api/modelApi"
import { getImages } from "@/api/imageApi"
import { getPrinters } from "@/api/printerApi"
import { supabase } from "@/api/supabaseServer"
import { getFiles } from "@/api/fileApi"
import { getUserData } from "@/utils/helpers/userHelpers"
import { getProjects } from "@/api/projectApi"
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
