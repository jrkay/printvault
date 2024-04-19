import { getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/api/modelApi"
import { getImages } from "@/api/api/imageApi"
import ModelPageDisplay from "@/app/(authorized)/models/ModelPageDisplay"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function Models() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const modelData = await getModels(userData)
  const imageData = await getImages(userData)
  const userDataTable = await getUserData()

  return (
    <ModelPageDisplay
      modelData={modelData}
      imageData={imageData}
      userData={userDataTable}
      activeUser={userData}
    />
  )
}

export default Models
