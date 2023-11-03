"use client"

import React, { useState, useEffect } from "react"
import {
  AccountPage,
  ModelPage,
  ProjectPage,
  ToolsPage,
  HomePage,
} from "@/api/pageHelpers"
import AddModel from "@/pages/model/AddModel.tsx"
import AddProject from "@/pages/project/AddProject.tsx"
import {
  ModelData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"

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
            activeUser,
            modelTags,
            fileData,
          })
        case "Projects":
          return ProjectPage({
            modelData,
            projectData,
            projectModelData,
          })
        case "Tools":
          return ToolsPage({ modelData, projectData })
        case "Account":
          return AccountPage({ userData, activeUser })
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
      {page === "Models" && isAdd ? (
        <>{<AddModel userData={userData} />}</>
      ) : page === "Projects" && isAdd ? (
        <>{<AddProject userData={userData} modelData={modelData} />}</>
      ) : (
        <>{activeNavPage}</>
      )}
    </>
  )
}
