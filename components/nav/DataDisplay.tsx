"use client"

import React, { useState, useEffect } from "react"
import {
  AccountPage,
  ModelPage,
  ProjectPage,
  ToolsPage,
  HomePage,
} from "@/api/pageHelpers"
import AddModel from "@/components/model/AddModel"
import AddProject from "@/components/project/AddProject"
import {
  ModelData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import Link from "next/link"

export default function Details({
  userData,
  modelData,
  projectData,
  imageData,
  projectModelData,
  isAdd,
  page,
  activeUser,
  modelTags,
  fileData,
}: {
  userData: UserData[]
  modelData: ModelData[]
  projectData: any
  imageData: ImageData[]
  projectModelData: ProjectModelData[]
  isAdd?: boolean
  page?: string
  activeUser: any
  modelTags: any
  fileData: any
}) {
  const [activeNavPage, setActiveNavPage] = useState<React.ReactNode>(null)

  useEffect(() => {
    setActiveNavPage(() => {
      switch (page) {
        case "Models":
          return ModelPage({
            modelData,
            imageData,
            userData,
            isAdd,
          })
        case "ModelAdd":
          return ModelPage({
            modelData,
            imageData,
            userData,
            isAdd: true,
          })
        case "Projects":
          return ProjectPage({
            modelData,
            projectData,
            projectModelData,
            userData,
          })
        case "ProjectAdd":
          return ProjectPage({
            modelData,
            projectData,
            projectModelData,
            isAdd: true,
            userData,
          })
        case "Tools":
          return ToolsPage()
        case "Account":
          return <></>
        //          AccountPage({ activeUser })
        default:
          return HomePage({
            modelData,
            projectData,
            imageData,
            userData,
            projectModelData,
            isAdd,
            activeUser,
            modelTags,
            fileData,
          })
      }
    })
  }, [page])

  return (
    <>
      {(page === "Models" || page === "ModelAdd") && isAdd ? (
        <>{<AddModel page='ModelAdd' userData={userData} />}</>
      ) : page === "Projects" && isAdd ? (
        <>{<AddProject userData={userData} modelData={modelData} />}</>
      ) : (
        <>{activeNavPage}</>
      )}
    </>
  )
}
