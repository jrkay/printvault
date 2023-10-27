"use client"

import { useEffect, useState } from "react"
import {
  FileDetailFields,
  ProjectDetailFields,
  ToolsDetailFields,
  AccountDetailFields,
} from "../helpers/detailHelpers"

function DetailsExpanded({
  userData,
  modelData,
  projectData,
  projectFileData,
  jobData,
  imageData,
  page,
  isEdit,
  isAdd,
  modelTags,
}: {
  userData: any
  modelData: any
  projectData: any
  projectFileData: any
  jobData: any
  page?: any
  imageData: any
  isEdit?: any
  isAdd?: any
  modelTags: any
}) {
  const [activeObjectPage, setActiveObjectPage] =
    useState<React.ReactNode>(null)

  useEffect(() => {
    setActiveObjectPage(() => {
      switch (page) {
        case "Files":
          return (
            <FileDetailFields
              modelData={modelData}
              jobData={jobData}
              imageData={imageData}
              userData={userData}
              isEdit={isEdit}
              isAdd={isAdd}
              modelTags={modelTags}
            />
          )
        case "Projects":
          return (
            <ProjectDetailFields
              modelData={modelData}
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
              modelData={modelData}
              projectData={projectData}
              isEdit={isEdit}
            />
          )
        case "Account":
          return (
            <AccountDetailFields
              modelData={modelData}
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
    <>
      <div className='mainNavDetails'>{activeObjectPage}</div>
    </>
  )
}

export default DetailsExpanded
