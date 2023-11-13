import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  getModels,
  getProjects,
  getImages,
  getProjectModels,
} from "@/api/helpers.tsx"
import "@/styles/index.css"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps.tsx"
import HomescreenDisplay from "@/app/(authorized)/dashboard/HomescreenDisplay"

export const dynamic = "force-dynamic"

async function Page() {
  const [projectData, userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const modelDataTable: ModelData[] = await getModels(userData)
  const imageDataTable: any = await getImages()
  const projectModelData: ProjectModelData[] = await getProjectModels()

  return (
    <HomescreenDisplay
      projectData={projectData}
      modelData={modelDataTable}
      imageData={imageDataTable}
      projectModelData={projectModelData}
    />
  )
}

export default Page
