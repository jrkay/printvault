import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "./types/supabase.ts"
import {
  getModels,
  getProjects,
  getUsers,
  getPrintJobs,
  getImages,
  getProjectModels,
  getModelTags,
  getPrinters,
} from "./helpers/helpers.tsx"
import "../app/style/index.css"
import AppRoutes from "./AppRoutes.tsx"

export const dynamic = "force-dynamic"

async function Page() {
  const [projectData, userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const userDataTable = await getUsers(userData)
  const modelTable = await getModels(userData)
  const jobDatatable = await getPrintJobs()
  const imageDataTable = await getImages()
  const projectModelData = await getProjectModels()
  const modelTags = await getModelTags()
  const printerData = await getPrinters()

  return (
    <>
      <AppRoutes
        projectData={projectData}
        userData={userDataTable}
        activeUser={userData}
        modelData={modelTable}
        jobData={jobDatatable}
        imageData={imageDataTable}
        projectModelData={projectModelData}
        modelTags={modelTags}
        printerData={printerData}
      />
    </>
  )
}

export default Page
