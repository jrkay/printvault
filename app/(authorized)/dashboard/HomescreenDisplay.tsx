import React from "react"
import {
  ModelData,
  ProjectData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import HomescreenGrid from "@/app/(authorized)/dashboard/HomescreenGrid"

const HomescreenDisplay = ({
  userData,
  projectData,
  projectModelData,
  modelData,
  imageData,
}: {
  userData: UserData[]
  projectData: ProjectData[]
  projectModelData: ProjectModelData[]
  modelData: ModelData[]
  imageData: ImageData[]
}) => {
  return (
    <>
      <HomescreenGrid
        userData={userData}
        projectData={projectData}
        projectModelData={projectModelData}
        modelData={modelData}
        imageData={imageData}
      />
    </>
  )
}

export default HomescreenDisplay
