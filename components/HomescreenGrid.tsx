"use client"

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

const HomescreenGrid = ({
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
    <>
      <Grid centered className='pageStyle'>
        <Grid.Row>
          <Grid.Column
            largeScreen={13}
            widescreen={13}
            computer={12}
            tablet={12}
            mobile={14}
            className='pageContainer'
            style={{ maxWidth: "1700px" }}
          >
            <DataDisplay
              userData={userData}
              modelData={modelData}
              projectData={projectData}
              imageData={imageData}
              projectModelData={projectModelData}
              page={page}
              isAdd={false}
              activeUser={activeUser}
              modelTags={modelTags}
              fileData={fileData}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default HomescreenGrid
