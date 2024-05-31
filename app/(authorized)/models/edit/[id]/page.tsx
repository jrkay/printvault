import { getModels } from "@/api/api/modelApi"
import { getPrinters } from "@/api/api/printerApi"
import { getUserData } from "@/utils/helpers/userHelpers"
import ModelDetailDisplay from "@/app/(authorized)/models/[id]/ModelDetails"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import EditModel from "./EditModel"
import { getProjects } from "@/api/api/projectApi"

async function EditModelPage() {
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    const [modelData, projects] = await Promise.all([
      getModels(activeUser),
      getProjects(activeUser),
    ])

    // Define a variable to hold the component or message based on the condition
    let content = null
    if (activeUser) {
      content = (
        <EditModel
          modelData={modelData}
          // modelTags={activeModelTags}
          //  imageData={imageData}
          //   fileData={fileData}
          activeUser={activeUser}
          projectData={projects}
        />
      )
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
