import { getUserData } from "@/utils/helpers/userHelpers"
import { getModels } from "@/api/api/modelApi"
import { getImages } from "@/api/api/imageApi"
import ModelPageDisplay from "@/app/(authorized)/models/ModelPageDisplay"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function Models() {
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    const [modelData, imageData, userDataTable] = await Promise.all([
      getModels(activeUser),
      getImages(activeUser),
      getUserData(),
    ])

    return (
      <ModelPageDisplay
        modelData={modelData}
        imageData={imageData}
        userData={userDataTable}
        activeUser={activeUser}
      />
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading models</div>
  }
}

export default Models
