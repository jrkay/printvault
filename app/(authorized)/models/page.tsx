import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  getModels,
  getImages,
  getUserData,
  getActiveUser,
} from "@/api/helpers.tsx"
import { ModelData, UserData } from "@/utils/AppRoutesProps.tsx"
import ModelListDisplay from "@/app/(authorized)/models/modelListDisplay"

async function Models() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const modelData = await getModels(userData)
  const imageData = await getImages()
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
