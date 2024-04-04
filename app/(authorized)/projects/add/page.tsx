import { getModels } from "@/api/modelApi"
import ProjectAddDisplay from "@/app/(authorized)/projects/add/ProjectAdd"
import { supabase } from "@/api/supabaseServer"
import { getUserData } from "@/utils/helpers/userHelpers"

async function AddProject() {
  const userDataResponse = await supabase.auth.getUser()
  const activeUser = userDataResponse.data.user
  const userDataTable = await getUserData()

  const modelData = await getModels(activeUser)

  return <ProjectAddDisplay modelData={modelData} userData={userDataTable} />
}

export default AddProject
