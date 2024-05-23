import { getModels } from "@/api/api/modelApi"
import ProjectAddDisplay from "@/app/(authorized)/projects/add/ProjectAdd"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function AddProject() {
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    const [modelData] = await Promise.all([getModels(activeUser)])

    return <ProjectAddDisplay modelData={modelData} userData={activeUser?.id} />
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading project add page</div>
  }
}

export default AddProject
