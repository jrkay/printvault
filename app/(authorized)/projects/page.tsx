import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  getModels,
  getProjects,
  getProjectModels,
  getUserData,
} from "@/api/helpers.tsx"
import "@/styles/index.css"
import {
  ModelData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import ProjectListDisplay from "@/app/(authorized)/projects/projectListDisplay"

export const dynamic = "force-dynamic"

async function Models() {
  const [projectData, userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const modelDataTable: ModelData[] = await getModels(userData)
  const projectModelData: ProjectModelData[] = await getProjectModels()
  const userDataTable: any = await getUserData()

  return (
    <>
      <ProjectListDisplay
        modelData={modelDataTable}
        projectData={projectData}
        projectModelData={projectModelData}
        displaySort={true}
        userData={userDataTable}
      />
    </>
  )
}

export default Models
