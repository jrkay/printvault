import React from "react"
import TopMenu from "@/components/TopMenu.tsx"
import Footer from "@/components/Footer.tsx"
import {
  ModelData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import HomescreenGrid from "@/app/HomescreenGrid"

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
      <div>
        <TopMenu activeUser={activeUser} />
      </div>
      <div>
        <HomescreenGrid
          userData={userData}
          projectData={projectData}
          projectModelData={projectModelData}
          modelData={modelData}
          imageData={imageData}
        />
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default HomescreenDisplay
