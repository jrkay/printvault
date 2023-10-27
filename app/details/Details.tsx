"use client"

import React, { useState } from "react"
import { Grid } from "semantic-ui-react"
import TopMenu from "../../components/TopMenu"
import DetailsExpanded from "./DetailsExpanded"
import { useParams } from "react-router-dom"
import DeleteFile from "../../components/file/DeleteFile.tsx"
import DeleteProject from "../../components/project/DeleteProject.tsx"
import LoginHome from "@/components/LoginHome.tsx"
import { useNavigate } from "react-router-dom"
import ImageUpload from "@/components/ImageUpload.tsx"
import JobUpload from "@/components/JobUpload.tsx"

export default function Details({
  userData,
  fileData,
  projectData,
  projectFileData,
  jobData,
  imageData,
  page,
  activeUser,
  modelTags,
  printerData,
}: {
  userData: any
  fileData: any
  projectData: any
  projectFileData: any
  jobData: any
  imageData: any
  page?: string
  activeUser: any
  modelTags: any
  printerData: any
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()
  const activeFile = fileData && fileData.find((file: any) => file.id === id)
  const activeProject =
    projectData && projectData.find((file: any) => file.id === id)

  const SideLinks = () => {
    const type = page

    switch (type) {
      case "Files":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <>
              <br />
              <ImageUpload activeFile={activeFile} activeUser={activeUser} />
              <br />
              <JobUpload activeFile={activeFile} printerData={printerData} />
              <br />
            </>
          )
        }

      default:
        return <></>
    }
  }

  const AddLink = () => {
    const type = page
    switch (type) {
      case "Files":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
              Add New File
            </a>
          )
        }
      case "Projects":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
              Add New Project
            </a>
          )
        }
      default:
        return <></>
    }
  }

  const BackLink = () => {
    const type = page
    switch (type) {
      case "Files":
        if (isAdd || isEdit) {
          return (
            <a
              onClick={() => navigate("/files/")}
              style={{ cursor: "pointer" }}
            >
              Cancel
            </a>
          )
        } else {
          return <></>
        }
      case "Projects":
        if (isAdd || isEdit) {
          return (
            <a
              onClick={() => navigate("/projects/")}
              style={{ cursor: "pointer" }}
            >
              Cancel
            </a>
          )
        } else {
          return <></>
        }
      default:
        ;<></>
    }
  }

  const EditLink = () => {
    const type = page
    switch (type) {
      case "Files":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <a onClick={() => setIsEdit(true)} style={{ cursor: "pointer" }}>
              Edit File
            </a>
          )
        }

      case "Projects":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <a onClick={() => setIsEdit(true)} style={{ cursor: "pointer" }}>
              Edit Project
            </a>
          )
        }
      default:
        ;<></>
    }
  }

  const getDeleteLink = () => {
    const type = page
    switch (type) {
      case "Files":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <div style={{ fontWeight: "bold", marginTop: "20px" }}>
              {}
              <DeleteFile activeFile={activeFile} />
            </div>
          )
        }

      case "Projects":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <div style={{ fontWeight: "bold", marginTop: "20px" }}>
              {}
              <DeleteProject
                activeProject={activeProject}
                projectFileData={projectFileData}
              />
            </div>
          )
        }
      default:
        ;<></>
    }
  }

  return (
    <>
      {activeUser.user.id ? (
        <>
          <div>
            <TopMenu activeUser={activeUser} />
          </div>
          <Grid padded centered>
            <Grid.Row>
              <Grid.Column width={2} className='pageContainer'>
                <div>{EditLink()}</div>
                <div>{AddLink()}</div>
                <div>{SideLinks()}</div>
                <div>{getDeleteLink()}</div>
                <div>{BackLink()}</div>
              </Grid.Column>
              <Grid.Column
                width={8}
                className='pageContainer'
                style={{ minWidth: "700px" }}
              >
                <DetailsExpanded
                  userData={userData}
                  fileData={fileData}
                  projectData={projectData}
                  projectFileData={projectFileData}
                  jobData={jobData}
                  imageData={imageData}
                  page={page}
                  isEdit={isEdit}
                  isAdd={isAdd}
                  modelTags={modelTags}
                />
              </Grid.Column>
              <Grid.Column width={1} className='pageContainer'></Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        <>
          <LoginHome />
        </>
      )}
    </>
  )
}
