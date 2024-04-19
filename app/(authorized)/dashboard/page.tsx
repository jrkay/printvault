import { getModels } from "@/api/api/modelApi"
import { getProjects } from "@/api/api/projectApi"
import { getProjectModels } from "@/api/api/projectModelApi"
import { getImages } from "@/api/api/imageApi"
import HomescreenGrid from "./HomescreenGrid"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function Dashboard() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const projectData = await getProjects(userData)
  const modelData = await getModels(userData)
  const imageDataTable = await getImages(userData)
  const projectModelData = await getProjectModels()

  return (
    <HomescreenGrid
      projectData={projectData}
      modelData={modelData}
      imageData={imageDataTable}
      projectModelData={projectModelData}
      userData={userData}
    />
  )
}

export default Dashboard
