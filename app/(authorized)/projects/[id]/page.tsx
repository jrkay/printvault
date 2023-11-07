import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getModels, getProjects, getProjectModels } from "@/api/helpers.tsx"
import "@/styles/index.css"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps.tsx"
import ProjectDetailDisplay from "@/app/(authorized)/projects/[id]/projectDetailDisplay"

export const dynamic = "force-dynamic"

async function ProjectDetail() {
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
      <ProjectDetailDisplay
        modelData={modelDataTable}
        isAdd={false}
        activeUser={userData}
        projectModelData={projectModelData}
        projectData={projectData}
      />
    </>
  )
}

export default ProjectDetail
