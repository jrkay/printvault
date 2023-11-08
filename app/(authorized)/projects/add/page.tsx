import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getModels, getProjects } from "@/api/helpers.tsx"
import "@/styles/index.css"
import { ModelData } from "@/utils/AppRoutesProps.tsx"
import ProjectAddDisplay from "@/app/(authorized)/projects/add/projectAddDisplay"

export const dynamic = "force-dynamic"

async function AddProject() {
  const [userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const modelDataTable: ModelData[] = await getModels(userData)

  return (
    <>
      <ProjectAddDisplay modelData={modelDataTable} userData={userData} />
    </>
  )
}

export default AddProject
