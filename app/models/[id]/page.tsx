import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  getModels,
  getProjects,
  getUsers,
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
  JobData,
  ImageData,
  ProjectModelData,
  PrinterData,
  ModelTags,
} from "@/utils/AppRoutesProps.tsx"
import ModelDetailDisplay from "@/app/models/[id]/modelDetailDisplay.tsx"

export const dynamic = "force-dynamic"

async function ModelDetail() {
  const [projectData, userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const userDataTable: UserData[] = await getUsers(userData)
  const modelDataTable: ModelData[] = await getModels(userData)
  const jobDatatable: JobData[] = await getPrintJobs()
  const imageDataTable: any = await getImages()
  const projectModelData: ProjectModelData[] = await getProjectModels()
  const modelTags: any = await getModelTags()
  const printerDataTable: PrinterData[] = await getPrinters()
  const fileDataTable: any = await getFiles()

  return (
    <>
      <ModelDetailDisplay
        modelData={modelDataTable}
        imageData={imageDataTable}
        userData={userDataTable}
        isAdd={false}
        activeUser={userData}
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
