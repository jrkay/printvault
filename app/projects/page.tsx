import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getModels, getProjects, getProjectModels } from "@/api/helpers.tsx"
import "@/styles/index.css"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps.tsx"
import ProjectListDisplay from "@/app/projects/projectListDisplay"

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

  return (
    <>
      <ProjectListDisplay
        modelData={modelDataTable}
        projectData={projectData}
        projectModelData={projectModelData}
        displaySort={true}
        activeUser={userData}
      />
    </>
  )
}

export default Models
