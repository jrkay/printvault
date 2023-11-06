"use client"

import { useEffect, useState } from "react"
import {
  ModelDetailFields,
  ProjectDetailFields,
  ToolsDetailFields,
  AccountDetailFields,
} from "@/api/detailHelpers"
import { ModelData, ProjectModelData, UserData } from "@/utils/AppRoutesProps"

function DetailsExpanded({
  userData,
  modelData,
  projectData,
  projectModelData,
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
          return <ToolsDetailFields projectData={projectData} />
        case "Account":
          return <AccountDetailFields projectData={projectData} />
        case "ModelAdd":
          return (
            <ModelDetailFields
              modelData={modelData}
              imageData={imageData}
              userData={userData}
              isEdit={false}
              isAdd={true}
              modelTags={modelTags}
              fileData={fileData}
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
