import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  getModels,
  getProjects,
  getUsers,
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
import HomescreenDisplay from "@/app/(authorized)/dashboard/HomescreenDisplay"

export const dynamic = "force-dynamic"

async function Page() {
  const [projectData, userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const userDataTable: UserData[] = await getUsers(userData)
  const modelDataTable: ModelData[] = await getModels(userData)
  // const jobDatatable: JobData[] = await getPrintJobs()
  const imageDataTable: any = await getImages()
  const projectModelData: ProjectModelData[] = await getProjectModels()
  const modelTags: ModelTags[] = await getModelTags()
  const printerDataTable: PrinterData[] = await getPrinters()
  const fileDataTable: any = await getFiles()

  return (
    <HomescreenDisplay
      projectData={projectData}
      userData={userDataTable}
      modelData={modelDataTable}
      //        jobData={jobDatatable}
      imageData={imageDataTable}
      projectModelData={projectModelData}
      //      modelTags={modelTags}
      //        printerData={printerDataTable}
      //    fileData={fileDataTable}
    />
  )
}

export default Page
