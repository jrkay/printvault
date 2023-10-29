"use client"

import React, { useState } from "react"
import { Grid, Header, Card, Item } from "semantic-ui-react"
import { Link } from "react-router-dom"
import TopMenu from "../../components/TopMenu"
import DetailsExpanded from "./DetailsExpanded"
import { useParams } from "react-router-dom"
import DeleteModel from "../../components/model/DeleteModel.tsx"
import DeleteProject from "../../components/project/DeleteProject.tsx"
import LoginHome from "@/components/LoginHome.tsx"
import { useNavigate } from "react-router-dom"
import ImageUpload from "@/components/ImageUpload.tsx"
import JobUpload from "@/components/JobUpload.tsx"
import FileUpload from "@/components/FileUpload.tsx"
import {
  JobData,
  ModelData,
  PrinterData,
  ProjectModelData,
  UserData,
} from "../AppRoutesProps.tsx"
import JobEdit from "@/components/JobEdit.tsx"

export default function Details({
  userData,
  modelData,
  projectData,
  projectModelData,
  jobData,
  imageData,
  page,
  activeUser,
  modelTags,
  printerData,
  fileData,
}: {
  userData: UserData[]
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
  jobData: JobData[]
  imageData: ImageData[]
  page?: string
  activeUser: any
  modelTags: any
  printerData: PrinterData[]
  fileData: any
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { id } = useParams<{ id: string }>()
  const activeModel =
    modelData && modelData.find((model: any) => model.id === id)
  const activeProject =
    projectData && projectData.find((model: any) => model.id === id)

  const SideLinks = () => {
    const type = page

    switch (type) {
      case "Models":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <>
              <br />
              <FileUpload activeModel={activeModel} activeUser={activeUser} />
              <br />
              <ImageUpload activeModel={activeModel} activeUser={activeUser} />
              <br />
              <JobUpload activeModel={activeModel} printerData={printerData} />
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
      case "Models":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
              Add New Model
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
      case "Models":
        if (isAdd || isEdit) {
          return (
            <a
              onClick={() => navigate("/models/")}
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
      case "Models":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <a onClick={() => setIsEdit(true)} style={{ cursor: "pointer" }}>
              Edit Model
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
      case "Models":
        if (isAdd || isEdit) {
          return <></>
        } else {
          return (
            <div style={{ fontWeight: "bold", marginTop: "20px" }}>
              {}
              <DeleteModel activeModel={activeModel} />
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
                projectModelData={projectModelData}
              />
            </div>
          )
        }
      default:
        ;<></>
    }
  }

  const filteredJobData = jobData.filter(
    (job: any) => job.model_id === activeModel?.id
  )

  function formatDate(dateString: string): string {
    const date = new Date(dateString)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()

    return `${month}/${day}/${year}`
  }

  const jobEditLink = (linkTitle: string) => {
    return (
      <JobEdit
        activeModel={activeModel}
        printerData={printerData}
        linkTitle={linkTitle}
      />
    )
  }

  return (
    console.log("fileData ", fileData),
    (
      <>
        {activeUser.user.id ? (
          <>
            <div>
              <TopMenu activeUser={activeUser} />
            </div>
            {/* can add padded back here to add some space below navbar*/}
            <Grid centered stackable>
              <Grid.Row>
                <Grid.Column
                  largeScreen={2}
                  widescreen={1}
                  computer={2}
                  tablet={14}
                  mobile={14}
                  className='pageContainer'
                >
                  <div>{EditLink()}</div>
                  <div>{AddLink()}</div>
                  <div>{SideLinks()}</div>
                  <div>{getDeleteLink()}</div>
                  <div>{BackLink()}</div>
                </Grid.Column>
                <Grid.Column
                  largeScreen={7}
                  widescreen={7}
                  computer={7}
                  tablet={7}
                  mobile={7}
                  className='pageContainer'
                  style={{ minWidth: "700px" }}
                >
                  <DetailsExpanded
                    userData={userData}
                    modelData={modelData}
                    projectData={projectData}
                    projectModelData={projectModelData}
                    jobData={jobData}
                    imageData={imageData}
                    page={page}
                    isEdit={isEdit}
                    isAdd={isAdd}
                    modelTags={modelTags}
                    fileData={fileData}
                  />
                </Grid.Column>
                <Grid.Column
                  largeScreen={2}
                  widescreen={3}
                  computer={14}
                  tablet={14}
                  mobile={16}
                  className='pageContainer'
                >
                  <div
                    style={{
                      backgroundColor: "rgb(255,255,255,.05)",
                      padding: "20px",
                      fontSize: "14px",
                      width: "100%",
                    }}
                  >
                    <Header as='h4'>Print Jobs</Header>
                    <Item.Group divided>
                      {filteredJobData.length > 0 ? (
                        <>
                          {jobData
                            .filter(
                              (job: any) => job.model_id === activeModel?.id
                            )
                            .map((job: any) => (
                              <Item key={job.id}>
                                <Item.Content>
                                  <Item.Description>
                                    <div style={{ fontSize: "13px" }}>
                                      <p style={{ fontWeight: "bold" }}>
                                        {jobEditLink(
                                          formatDate(job.created_at)
                                        )}
                                      </p>
                                      {job.duration} min on {job.printer}
                                      <br />
                                      Notes: {job.comments}
                                    </div>
                                  </Item.Description>
                                  <Item.Extra>Status: {job.status}</Item.Extra>
                                </Item.Content>
                              </Item>
                            ))}
                        </>
                      ) : (
                        <span>No print jobs found.</span>
                      )}
                    </Item.Group>{" "}
                  </div>
                </Grid.Column>
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
  )
}
