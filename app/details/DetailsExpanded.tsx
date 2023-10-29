"use client"

import { useEffect, useState } from "react"
import {
  ModelDetailFields,
  ProjectDetailFields,
  ToolsDetailFields,
  AccountDetailFields,
} from "../helpers/detailHelpers"
import {
  JobData,
  ModelData,
  ProjectModelData,
  UserData,
} from "../AppRoutesProps"

function DetailsExpanded({
  userData,
  modelData,
  projectData,
  projectModelData,
  jobData,
  imageData,
  page,
  isEdit,
  isAdd,
  modelTags,
  fileData,
}: {
  userData: UserData[]
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
  jobData: JobData[]
  page?: any
  imageData: ImageData[]
  isEdit?: any
  isAdd?: any
  modelTags: any
  fileData: any
}) {
  const [activeObjectPage, setActiveObjectPage] =
    useState<React.ReactNode>(null)

  useEffect(() => {
    setActiveObjectPage(() => {
      switch (page) {
        case "Models":
          return (
            <ModelDetailFields
              modelData={modelData}
              jobData={jobData}
              imageData={imageData}
              userData={userData}
              isEdit={isEdit}
              isAdd={isAdd}
              modelTags={modelTags}
              fileData={fileData}
            />
          )
        case "Projects":
          return (
            <ProjectDetailFields
              modelData={modelData}
              projectData={projectData}
              projectModelData={projectModelData}
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
