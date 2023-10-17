"use client"

import { useEffect, useState } from "react"
import {
  FileDetailFields,
  ProjectDetailFields,
  ToolsDetailFields,
  AccountDetailFields,
} from "../helpers/detailHelpers"

function DetailsExpanded({
  data,
  userData,
  fileData,
  projectData,
  projectFileData,
  jobData,
  imageData,
  page,
  isEdit,
  isAdd,
}: {
  data: any
  userData: any
  fileData: any
  projectData: any
  projectFileData: any
  jobData: any
  page?: any
  imageData: any
  isEdit?: any
  isAdd?: any
}) {
  const [activeObjectPage, setActiveObjectPage] =
    useState<React.ReactNode>(null)

  useEffect(() => {
    setActiveObjectPage(() => {
      switch (page) {
        case "Files":
          return (
            <FileDetailFields
              fileData={fileData}
              projectData={projectData}
              jobData={jobData}
              imageData={imageData}
              userData={userData}
              isEdit={isEdit}
              isAdd={isAdd}
            />
          )
        case "Projects":
          return (
            <ProjectDetailFields
              fileData={fileData}
              projectData={projectData}
              projectFileData={projectFileData}
              isEdit={isEdit}
              userData={userData}
              isAdd={isAdd}
            />
          )
        case "Tools":
          return (
            <ToolsDetailFields
              fileData={fileData}
              projectData={projectData}
              isEdit={isEdit}
            />
          )
        case "Account":
          return (
            <AccountDetailFields
              fileData={fileData}
              projectData={projectData}
              isEdit={isEdit}
            />
          )
        default:
          return <></>
      }
    })
  }, [page, isEdit, isAdd])

  return (
    console.log(
      "project files detailsexpanded 22222----------",
      projectFileData
    ),
    (
      <>
        <div className='mainNavDetails'>{activeObjectPage}</div>
      </>
    )
  )
}

export default DetailsExpanded
