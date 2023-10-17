"use client"

import { Grid } from "semantic-ui-react"
import React, { useState } from "react"
import TopMenu from "../../components/TopMenu.tsx"
import DataDisplay from "./DataDisplay.tsx"
import Footer from "@/components/Footer.tsx"

const NavPage = ({
  data,
  userData,
  projectData,
  projectFileData,
  fileData,
  imageData,
  page,
}: {
  data: any
  userData: any
  projectData: any
  projectFileData: any
  fileData: any
  imageData: any
  page?: any
}) => {
  const [isAdd, setIsAdd] = useState(false)

  const AddLink = () => {
    return (
      <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
        Add a New Item
      </a>
    )
  }

  return (
    <>
      <div>
        <TopMenu data={data} userData={userData} />
      </div>
      <div>
        <Grid padded centered className='pageStyle'>
          <Grid.Row>
            <Grid.Column width={1} className='pageContainer'>
              <p>{AddLink()}</p>
            </Grid.Column>
            <Grid.Column
              width={8}
              className='pageContainer'
              style={{ minWidth: "700px" }}
            >
              <DataDisplay
                data={data}
                userData={userData}
                fileData={fileData}
                projectData={projectData}
                imageData={imageData}
                projectFiles={projectData}
                page={page}
                isAdd={isAdd}
              />
            </Grid.Column>
            <Grid.Column width={1} className='pageContainer'></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div>
        <Footer />
      </div>
    </>
  )
}

export default NavPage
