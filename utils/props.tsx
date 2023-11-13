import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getModels, getActiveUser } from "@/api/helpers.tsx"
import "@/styles/index.css"
import { UserData, ModelData } from "@/utils/AppRoutesProps.tsx"

async function activeUserDataProp() {
  const [userData] = await Promise.all([
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  return userData
}

async function userDataProps() {
  const userDataTable: UserData[] = await getActiveUser(activeUserDataProp)

  return { userDataTable }
}

async function getModelProps(data: Promise<{ userDataTable: UserData[] }>) {
  const modelDataTable: ModelData[] = await getModels(data)

  return modelDataTable
}

export const modelInformation = getModelProps(userDataProps())
