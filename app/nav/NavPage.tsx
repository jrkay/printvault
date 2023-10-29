"use client"

import { Grid } from "semantic-ui-react"
import React, { useState } from "react"
import TopMenu from "../../components/TopMenu.tsx"
import DataDisplay from "./DataDisplay.tsx"
import Footer from "@/components/Footer.tsx"
import LoginHome from "@/components/LoginHome.tsx"
import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"
import {
  ModelData,
  ModelTags,
  ProjectModelData,
  UserData,
} from "../AppRoutesProps.tsx"

const NavPage = ({
  userData,
  projectData,
  projectModelData,
  modelData,
  imageData,
  page,
  activeUser,
  modelTags,
}: {
  userData: UserData[]
  projectData: any
  projectModelData: ProjectModelData[]
  modelData: ModelData[]
  imageData: ImageData[]
  page?: any
  activeUser: any
  modelTags: ModelTags[]
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
            <TopMenu activeUser={activeUser} />
          </div>
          <div>
            {/* can add padded back here */}
            <Grid centered className='pageStyle'>
              <Grid.Row>
                {/* <Grid.Column width={1} className='pageContainer'>
                  {SideLinks()}
                </Grid.Column> */}
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
                  />
                </Grid.Column>
                {/* <Grid.Column width={1} className='pageContainer'></Grid.Column> */}
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
