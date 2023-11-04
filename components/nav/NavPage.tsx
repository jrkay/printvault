"use client"

import { Grid } from "semantic-ui-react"
import React, { useState } from "react"
import TopMenu from "@/components/TopMenu.tsx"
import DataDisplay from "@/components/nav/DataDisplay.tsx"
import Footer from "@/components/Footer.tsx"
import LoginHome from "@/components/LoginHome"
import {
  ModelData,
  ModelTags,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"

const NavPage = ({
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
  modelTags: ModelTags[]
  fileData: any
}) => {
  const [isAdd, setIsAdd] = useState(false)

  return (
    <>
      {activeUser ? (
        <>
          <div>
            <TopMenu activeUser={activeUser} />
          </div>
          <div>
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
                    isAdd={isAdd}
                    activeUser={activeUser}
                    modelTags={modelTags}
                    fileData={fileData}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
          <div>
            <Footer />
          </div>
        </>
      ) : (
        <>
          <LoginHome />
        </>
      )}
    </>
  )
}

export default NavPage
