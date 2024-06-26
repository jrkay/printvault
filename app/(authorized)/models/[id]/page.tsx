import { getModels } from "@/api/api/modelApi"
import { getPrinters } from "@/api/api/printerApi"
import { getUserData } from "@/utils/helpers/userHelpers"
import ModelDetailDisplay from "@/app/(authorized)/models/[id]/ModelDetails"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function ModelDetail() {
  try {
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    const [modelData, printerData, userDataTable] = await Promise.all([
      getModels(activeUser),
      getPrinters(),
      getUserData(),
    ])

    return (
      <ModelDetailDisplay
        modelData={modelData}
        printerData={printerData}
        userData={userDataTable}
        activeUser={activeUser}
      />
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading model information</div>
  }
}

export default ModelDetail
