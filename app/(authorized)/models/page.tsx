import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getModels, getImages, getUserData } from "@/api/helpers.tsx"
import "@/styles/index.css"
import { ModelData } from "@/utils/AppRoutesProps.tsx"
import ModelListDisplay from "@/app/(authorized)/models/modelListDisplay"

export const dynamic = "force-dynamic"

async function Models() {
  const [userData] = await Promise.all([
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const modelDataTable: ModelData[] = await getModels(userData)
  const imageDataTable: any = await getImages()
  const userDataTable: any = await getUserData()

  return (
    <>
      <ModelListDisplay
        modelData={modelDataTable}
        imageData={imageDataTable}
        userData={userDataTable}
      />
    </>
  )
}

export default Models
