import { getModels } from "@/api/api/modelApi"
import ProjectAddDisplay from "@/app/(authorized)/projects/add/ProjectAdd"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function AddProject() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const modelData = await getModels(userData)

  return <ProjectAddDisplay modelData={modelData} userData={userData?.id} />
}

export default AddProject
