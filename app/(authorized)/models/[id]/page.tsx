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
} from "@/api/helpers.tsx"
import "@/styles/index.css"
import {
  UserData,
  ModelData,
  ProjectModelData,
  PrinterData,
  ModelTags,
} from "@/utils/AppRoutesProps.tsx"
import ModelDetailDisplay from "@/app/(authorized)/models/[id]/modelDetailDisplay"

export const dynamic = "force-dynamic"

async function ModelDetail() {
  const [projectData, userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const activeUser: UserData[] = await getActiveUser(userData)
  const modelDataTable: ModelData[] = await getModels(userData)
  const jobDatatable: any = await getPrintJobs()
  const imageDataTable: any = await getImages()
  const projectModelData: ProjectModelData[] = await getProjectModels()
  const modelTags: ModelTags[] = await getModelTags()
  const printerDataTable: PrinterData[] = await getPrinters()
  const fileDataTable: any = await getFiles()

  return (
    <>
      <ModelDetailDisplay
        modelData={modelDataTable}
        imageData={imageDataTable}
        activeUser={activeUser}
        modelTags={modelTags}
        fileData={fileDataTable}
        projectModelData={projectModelData}
        projectData={projectData}
        jobData={jobDatatable}
        printerData={printerDataTable}
        page='Models'
      />
    </>
  )
}

export default ModelDetail
