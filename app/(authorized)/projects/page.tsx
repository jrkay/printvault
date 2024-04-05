import { getModels } from "@/api/api/modelApi"
import { getProjectModels } from "@/api/api/projectModelApi"
import { getProjects } from "@/api/api/projectApi"
import ProjectListDisplay from "@/app/(authorized)/projects/ProjectPageDisplay"
import { getUserData } from "@/utils/helpers/userHelpers"
import { supabaseClient } from "@/api/supabaseClient"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function Projects() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])
  const userDataTable = await getUserData()

  const projectData = await getProjects(userData)
  const modelData = await getModels(userData)
  const projectModelData = await getProjectModels()

  return (
    <ProjectListDisplay
      modelData={modelData}
      projectData={projectData}
      projectModelData={projectModelData}
      displaySort={true}
      userData={userDataTable}
    />
  )
}

export default Projects
