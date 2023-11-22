import React from "react"
import {
  ModelData,
  ProjectData,
  ProjectModelData,
} from "@/utils/AppRoutesProps.tsx"
import HomescreenGrid from "@/app/(authorized)/dashboard/HomescreenGrid"

const HomescreenDisplay = ({
  projectData,
  projectModelData,
  modelData,
  imageData,
}: {
  projectData: ProjectData[]
  projectModelData: ProjectModelData[]
  modelData: ModelData[]
  imageData: any
}) => {
  return (
    <>
      <HomescreenGrid
        projectData={projectData}
        projectModelData={projectModelData}
        modelData={modelData}
        imageData={imageData}
      />
    </>
  )
}

export default HomescreenDisplay
