"use client"

import { useEffect, useState } from "react"
import { ModelDetailFields, ProjectDetailFields } from "@/api/detailHelpers"
import {
  FileData,
  ModelData,
  ModelTags,
  ProjectData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps"

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
  projectData: ProjectData[]
  projectModelData: ProjectModelData[]
  page?: string
  imageData: ImageData[]
  isEdit?: boolean
  isAdd?: boolean
  modelTags: ModelTags[]
  fileData: FileData[]
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
