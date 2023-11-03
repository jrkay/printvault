"use client"

import { Grid } from "semantic-ui-react"
import React, { useState } from "react"
import TopMenu from "@/components/TopMenu.tsx"
import DataDisplay from "@/components/nav/DataDisplay.tsx"
import Footer from "@/components/Footer.tsx"
import LoginHome from "@/pages/LoginHome.tsx"
import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"
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

  const AddLink = () => {
    const type = page
    switch (type) {
      case "Models":
        return (
          <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
            Add New Model
          </a>
        )
      case "Projects":
        return (
          <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
            Add New Project
          </a>
        )
      case "Tools":
        return (
          <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
            Add New Tool
          </a>
        )

      default:
        return (
          <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
            Add New
          </a>
        )
    }
  }

  const navigate = useNavigate()
  const SideLinks = () => {
    const router = useRouter()

    const type = page
    switch (type) {
      case "Models":
        if (isAdd) {
          return (
            <>
              <a
                onClick={() => navigate("/models/")}
                style={{
                  cursor: "pointer",
                }}
              >
                Cancel
              </a>
            </>
          )
        } else {
          return <></>
        }
      case "Projects":
        if (isAdd) {
          return (
            <>
              <p>Add an Image</p>
              <p>Add a Job</p>
              <a
                onClick={() => navigate("/projects/")}
                style={{
                  cursor: "pointer",
                }}
              >
                Cancel
              </a>
            </>
          )
        } else {
          return <></>
        }
      default:
        return <></>
    }
  }

  return (
    <>
      {activeUser ? (
        <>
          <div>
            <TopMenu activeUser={activeUser} modelData={modelData} />
          </div>
          <div>
            <Grid centered className='pageStyle'>
              <Grid.Row>
                <Grid.Column
                  largeScreen={8}
                  widescreen={10}
                  computer={8}
                  tablet={8}
                  mobile={8}
                  className='pageContainer'
                  style={{ minWidth: "70%" }}
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
