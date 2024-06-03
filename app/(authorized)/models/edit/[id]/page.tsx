import { getModels } from "@/api/api/modelApi"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import EditModel from "./EditModel"

async function EditModelPage() {
  try {
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    const [modelData] = await Promise.all([getModels(activeUser)])

    let content = null
    if (activeUser) {
      content = <EditModel modelData={modelData} activeUser={activeUser} />
    } else {
      content = <div>Please log in to view this page.</div>
    }

    return <>{content}</>
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading model information</div>
  }
}

export default EditModelPage
