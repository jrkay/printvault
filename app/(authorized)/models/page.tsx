import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getUserData, getActiveUser } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/model/getModels"
import { getImages } from "@/api/image/getImages"
import ModelListDisplay from "@/app/(authorized)/models/ModelListDisplay"

async function Models() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const modelData = await getModels(userData)
  const imageData = await getImages(userData)
  const userDataTable = await getUserData()
  const activeUser = await getActiveUser(userData)

  return (
    <ModelListDisplay
      modelData={modelData}
      imageData={imageData}
      userData={userDataTable}
      activeUser={activeUser}
    />
  )
}

export default Models
