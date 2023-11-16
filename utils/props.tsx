import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getModels, getActiveUser, getUserData } from "@/api/helpers.tsx"
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
  // TODO: get user AND shared_with models
  // const userDataTable: UserData[] = await getActiveUser(activeUserDataProp)
  const userDataTable: UserData[] = await getUserData()

  return { userDataTable }
}

async function getModelProps(data: Promise<{ userDataTable: UserData[] }>) {
  const modelDataTable: ModelData[] = await getModels(data)

  return modelDataTable
}

export const modelInformation = getModelProps(userDataProps())
