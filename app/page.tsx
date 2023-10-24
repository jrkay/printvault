import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "./types/supabase.ts"
import {
  getModels,
  getProjects,
  getUsers,
  getPrintJobs,
  getImages,
  getProjectFiles,
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
  const projectFileData = await getProjectFiles()

  return (
    <>
      <AppRoutes
        projectData={projectData}
        userData={userDataTable} // TODO if needed, set this back to userDataTable
        activeUser={userData}
        fileData={modelTable}
        jobData={jobDatatable}
        imageData={imageDataTable}
        projectFileData={projectFileData}
      />
    </>
  )
}

export default Page
