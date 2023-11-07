"use client"

import React, { useState, useEffect } from "react"
import { ModelPage, ProjectPage, ToolsPage, HomePage } from "@/api/pageHelpers"
import AddModel from "@/components/model/AddModel"
import AddProject from "@/components/project/AddProject"
import {
  FileData,
  ModelData,
  ModelTags,
  ProjectData,
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
}: {
  userData: UserData[]
  modelData: ModelData[]
  projectData: ProjectData[]
  imageData: ImageData[]
  projectModelData: ProjectModelData[]
  isAdd?: boolean
  page?: string
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
