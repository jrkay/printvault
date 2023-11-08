import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getModels, getProjects, getProjectModels } from "@/api/helpers.tsx"
import "@/styles/index.css"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps.tsx"
import ProjectAddDisplay from "@/app/(authorized)/projects/add/projectAddDisplay"

export const dynamic = "force-dynamic"

async function AddProject() {
  const [userData] = await Promise.all([
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const modelDataTable: ModelData[] = await getModels(userData)
  const projectModelData: ProjectModelData[] = await getProjectModels()

  return (
    <>
      <ProjectAddDisplay
        modelData={modelDataTable}
        userData={userData}
        projectModelData={projectModelData}
      />
    </>
  )
}

export default AddProject
