import { Grid } from "semantic-ui-react"
import React from "react"
import TopMenu from "@/components/TopMenu.tsx"
import DataDisplay from "@/components/nav/DataDisplay.tsx"
import Footer from "@/components/Footer.tsx"
import LoginHome from "@/app/page"
import {
  ModelData,
  ModelTags,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import HomescreenGrid from "@/components/HomescreenGrid"

const HomescreenDisplay = ({
  userData,
  projectData,
  projectModelData,
  modelData,
  imageData,
  page,
  activeUser,
  modelTags,
  fileData,
}: {
  userData: UserData[]
  projectData: any
  projectModelData: ProjectModelData[]
  modelData: ModelData[]
  imageData: ImageData[]
  page?: any
  activeUser: any
  modelTags?: ModelTags[]
  fileData?: any
}) => {
  //   const [isAdd, setIsAdd] = useState(false)

  return (
    console.log("project data (DASHBOARD) - -----------", projectData),
    (
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
            page={page}
            activeUser={activeUser}
            modelTags={modelTags}
            fileData={fileData}
          />
        </div>
        <div>
          <Footer />
        </div>
      </>
    )
  )
}

export default HomescreenDisplay
