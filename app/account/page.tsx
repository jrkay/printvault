import React from "react"
import { Grid, Header, Button, Segment } from "semantic-ui-react"
import Footer from "@/components/Footer"
import TopMenu from "@/components/TopMenu"
import AccountDisplay from "@/app/account/accountDisplay"

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import {
  getModels,
  getProjects,
  getUsers,
  getPrintJobs,
  getImages,
  getProjectModels,
  getModelTags,
  getPrinters,
  getFiles,
} from "@/api/helpers.tsx"
import "@/styles/index.css"
import {
  UserData,
  ModelData,
  JobData,
  ImageData,
  ProjectModelData,
  PrinterData,
  ModelTags,
} from "@/utils/AppRoutesProps.tsx"
import ProjectListDisplay from "@/app/projects/projectListDisplay"

async function AccountPage() {
  const [projectData, userData] = await Promise.all([
    getProjects(),
    createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => response.data),
  ])

  const userDataTable: UserData[] = await getUsers(userData)

  return (
    console.log("active user", userData),
    (<AccountDisplay activeUser={userData} />)
  )
}

export default AccountPage
