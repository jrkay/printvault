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

export default function Details({
  data,
  userData,
  fileData,
  projectData,
  imageData,
  isAdd,
  page,
}: {
  data: any
  userData: any
  fileData: any
  projectData: any
  imageData: any
  isAdd?: any
  page?: any
}) {
  const [activeNavPage, setActiveNavPage] = useState<React.ReactNode>(null)

  useEffect(() => {
    setActiveNavPage(() => {
      switch (page) {
        case "Files":
          return FilePage({ fileData, imageData, userData, isAdd })
        case "Projects":
          return ProjectPage({ fileData, projectData })
        case "Tools":
          return ToolsPage({ fileData, projectData })
        case "Account":
          return AccountPage({ data, userData })
        default:
          return HomePage({ fileData, projectData, imageData, userData, isAdd })
      }
    })
  }, [page])

  return (
    <>{isAdd ? <>{<AddFile userData={userData} />}</> : <>{activeNavPage}</>}</>
  )
}
