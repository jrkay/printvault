import { getModels } from "@/api/api/modelApi"
import { getImages } from "@/api/api/imageApi"
import { getPrinters } from "@/api/api/printerApi"
import { getFiles } from "@/api/api/fileApi"
import { getUserData } from "@/utils/helpers/userHelpers"
import { getProjects } from "@/api/api/projectApi"
import ModelDetailDisplay from "@/app/(authorized)/models/[id]/ModelDetails"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function ModelDetail() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const userDataTable = await getUserData()
  const projectData = await getProjects(userData)
  const modelData = await getModels(userData)
  const imageDataTable = await getImages(userData)
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
      activeUser={userData?.id}
    />
  )
}

export default ModelDetail
