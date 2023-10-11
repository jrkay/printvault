"use client"

import React, { useState, useEffect } from "react"
import {
  AccountPage,
  FilePage,
  ProjectPage,
  ToolsPage,
  HomePage,
} from "../helpers/pageHelpers"

export default function Details({
  data,
  userData,
  fileData,
  projectData,
  imageData,
  page,
}: {
  data: any
  userData: any
  fileData: any
  projectData: any
  imageData: any
  page?: any
}) {
  const [activeNavPage, setActiveNavPage] = useState<React.ReactNode>(null)

  useEffect(() => {
    setActiveNavPage(() => {
      switch (page) {
        case "Files":
          return FilePage({ fileData, projectData, imageData })
        case "Projects":
          return ProjectPage({ fileData, projectData })
        case "Tools":
          return ToolsPage({ fileData, projectData })
        case "Account":
          return AccountPage({ data, userData })
        default:
          return HomePage({ fileData, projectData, imageData })
      }
    })
  }, [page])

  return <>{activeNavPage}</>
}
