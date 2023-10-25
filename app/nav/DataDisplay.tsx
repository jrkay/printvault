"use client"

import React, { useState, useEffect } from "react"
import {
  AccountPage,
  FilePage,
  ProjectPage,
  ToolsPage,
  HomePage,
} from "../helpers/pageHelpers"
import AddFile from "../../components/file/AddFile.tsx"
import AddProject from "../../components/project/AddProject.tsx"

export default function Details({
  userData,
  fileData,
  projectData,
  imageData,
  projectFileData,
  isAdd,
  page,
  activeUser,
  modelTags,
}: {
  userData: any
  fileData: any
  projectData: any
  imageData: any
  projectFileData: any
  isAdd?: boolean
  page?: string
  activeUser: any
  modelTags: any
}) {
  const [activeNavPage, setActiveNavPage] = useState<React.ReactNode>(null)

  useEffect(() => {
    setActiveNavPage(() => {
      switch (page) {
        case "Files":
          return FilePage({
            fileData,
            imageData,
            userData,
            isAdd,
            activeUser,
            modelTags,
          })
        case "Projects":
          return ProjectPage({
            fileData,
            projectData,
            projectFileData,
          })
        case "Tools":
          return ToolsPage({ fileData, projectData })
        case "Account":
          return AccountPage({ userData, activeUser })
        default:
          return HomePage({
            fileData,
            projectData,
            imageData,
            userData,
            projectFileData,
            isAdd,
            activeUser,
            modelTags,
          })
      }
    })
  }, [page])

  return (
    <>
      {page === "Files" && isAdd ? (
        <>{<AddFile userData={userData} />}</>
      ) : page === "Projects" && isAdd ? (
        <>{<AddProject userData={userData} fileData={fileData} />}</>
      ) : (
        <>{activeNavPage}</>
      )}
    </>
  )
}
