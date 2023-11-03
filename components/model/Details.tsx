"use client"

import React, { useState } from "react"
import { Grid, Header, Item, Table } from "semantic-ui-react"
import TopMenu from "@/components/TopMenu"
import DetailsExpanded from "@/components/nav/DetailsExpanded"
import { useParams } from "react-router-dom"
import DeleteModel from "@/components/model/DeleteModel"
import DeleteProject from "@/components/project/DeleteProject"
import LoginHome from "@/components/LoginHome"
import { useNavigate } from "react-router-dom"
import ImageUpload from "@/components/image/ImageUpload.tsx"
import JobUpload from "@/components/job/JobUpload.tsx"
import FileUpload from "@/components/file/FileUpload.tsx"
import {
  JobData,
  ModelData,
  PrinterData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import JobEdit from "@/components/job/JobEdit.tsx"
import Footer from "@/components/Footer.tsx"

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
              <FileUpload
                activeModel={activeModel}
                activeUser={userData}
                modalDisplay={"Upload File"}
              />
              <br />
              <ImageUpload
                activeModel={activeModel}
                activeUser={userData}
                modalDisplay={"Upload Image"}
              />
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

  // const AddLink = () => {
  //   const type = page
  //   switch (type) {
  //     case "Models":
  //       if (isAdd || isEdit) {
  //         return <></>
  //       } else {
  //         return (
  //           <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
  //             Add New Model
  //           </a>
  //         )
  //       }
  //     case "Projects":
  //       if (isAdd || isEdit) {
  //         return <></>
  //       } else {
  //         return (
  //           <a onClick={() => setIsAdd(true)} style={{ cursor: "pointer" }}>
  //             Add New Project
  //           </a>
  //         )
  //       }
  //     default:
  //       return <></>
  //   }
  // }

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

  const modelJobs = filteredJobData.find((job: any) => job.id === id)
  const activeJob = filteredJobData.find((job: any) => job.id === id)?.id

  const jobEditLink = (linkTitle: string, id: string) => {
    return (
      <JobEdit
        activeModel={activeModel}
        printerData={printerData}
        modalDisplay={linkTitle}
        jobData={filteredJobData}
        activeJob={id}
      />
    )
  }

  return (
    <>
      {activeUser.user.id ? (
        <>
          <div>
            <TopMenu activeUser={activeUser} modelData={modelData} />
          </div>
          <Grid
            centered
            padded
            style={{
              margin: "0 auto",
              width: "100%",
            }}
          >
            <Grid.Row style={{ padding: "0 20px 20px 20px" }}>
              <Grid.Column
                largeScreen={2}
                widescreen={1}
                computer={2}
                tablet={14}
                mobile={14}
                className='pageContainer'
                style={{}}
              >
                <div style={{ padding: "50px 0 0 10px" }}>
                  {EditLink()}
                  <br />
                  {SideLinks()}
                  <br />
                  {getDeleteLink()}
                  <br />
                  {BackLink()}
                </div>
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
                <Grid.Row style={{ paddingTop: "50px" }}>
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
                </Grid.Row>
                {activeModel?.id ? (
                  <Grid.Row>
                    <div
                      style={{
                        backgroundColor: "rgb(255,255,255,.05)",
                        padding: "20px",
                        fontSize: "14px",
                        width: "100%",
                        margin: "10px auto",
                      }}
                    >
                      <Header as='h4'>Print Jobs</Header>
                      <Table inverted>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Created</Table.HeaderCell>
                            <Table.HeaderCell>Duration</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Notes</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {filteredJobData.length > 0 ? (
                            <>
                              {filteredJobData.map((job: any) => (
                                <Table.Row key={job.id}>
                                  <Table.Cell>
                                    {jobEditLink(
                                      formatDate(job.created_at),
                                      job.id
                                    )}
                                  </Table.Cell>
                                  <Table.Cell>{job.duration} min</Table.Cell>
                                  <Table.Cell>{job.status}</Table.Cell>
                                  <Table.Cell>{job.comments}</Table.Cell>
                                </Table.Row>
                              ))}
                            </>
                          ) : (
                            <span>No print jobs found.</span>
                          )}
                        </Table.Body>
                      </Table>
                    </div>
                  </Grid.Row>
                ) : (
                  <></>
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
