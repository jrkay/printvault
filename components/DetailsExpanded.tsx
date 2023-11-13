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
  activeUser,
  modelData,
  projectData,
  projectModelData,
  imageData,
  page,
  isEdit,
  modelTags,
  fileData,
}: {
  activeUser: UserData[]
  modelData: ModelData[]
  projectData: ProjectData[]
  projectModelData: ProjectModelData[]
  page?: string
  imageData: ImageData[]
  isEdit?: boolean
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
              activeUser={activeUser}
              isEdit={isEdit}
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
            />
          )
        default:
          return <></>
      }
    })
  }, [page, isEdit])

  return (
    <>
      <div>{activeObjectPage}</div>
    </>
  )
}

export default DetailsExpanded
