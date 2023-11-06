import React from "react"
import {
  ModelData,
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
  activeUser,
}: {
  userData: UserData[]
  projectData: any
  projectModelData: ProjectModelData[]
  modelData: ModelData[]
  imageData: ImageData[]
  activeUser: any
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
