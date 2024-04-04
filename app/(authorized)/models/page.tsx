import { getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/modelApi"
import { getImages } from "@/api/imageApi"
import ModelPageDisplay from "@/app/(authorized)/models/ModelPageDisplay"

import { supabase } from "@/api/supabaseServer"

async function Models() {
  const userDataResponse = await supabase.auth.getUser()
  const activeUser = userDataResponse.data.user
  const userDataTable = await getUserData()

  const modelData = await getModels(activeUser)
  const imageData = await getImages(activeUser)

  return (
    <ModelPageDisplay
      modelData={modelData}
      imageData={imageData}
      userData={userDataTable}
    />
  )
}

export default Models
