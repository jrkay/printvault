import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/utils/supabase"
import { getModels } from "@/api/model/getModels"
import "@/styles/index.css"
import { cookies } from "next/headers"
import ProjectAddDisplay from "@/app/(authorized)/projects/add/ProjectAddDisplay"

async function AddProject() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const modelData = await getModels(userData)

  return <ProjectAddDisplay modelData={modelData} userData={userData} />
}

export default AddProject
