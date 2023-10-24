"use client"

import { Grid } from "semantic-ui-react"
import React, { useState } from "react"
import TopMenu from "../../components/TopMenu.tsx"
import DataDisplay from "./DataDisplay.tsx"
import Footer from "@/components/Footer.tsx"
import LoginHome from "@/components/LoginHome.tsx"
import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"

const NavPage = ({
  userData,
  projectData,
  projectFileData,
  fileData,
  imageData,
  page,
  activeUser,
}: {
  userData: any
  projectData: any
  projectFileData: any
  fileData: any
  imageData: any
  page?: any
  activeUser: any
}) => {
  const [isAdd, setIsAdd] = useState(false)

  const AddLink = () => {
    const type = page
    switch (type) {
      case "Files":
        return (
          <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
            Add New File
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
      case "Files":
        if (isAdd) {
          return (
            <>
              <a
                onClick={() => navigate("/files/")}
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
            <Grid padded centered className='pageStyle'>
              <Grid.Row>
                <Grid.Column width={1} className='pageContainer'>
                  {SideLinks()}
                </Grid.Column>
                <Grid.Column
                  width={8}
                  className='pageContainer'
                  style={{ minWidth: "700px" }}
                >
                  <DataDisplay
                    userData={userData}
                    fileData={fileData}
                    projectData={projectData}
                    imageData={imageData}
                    projectFileData={projectFileData}
                    page={page}
                    isAdd={isAdd}
                    activeUser={activeUser}
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
      ) : (
        <>
          <LoginHome />
        </>
      )}
    </>
  )
}

export default NavPage
