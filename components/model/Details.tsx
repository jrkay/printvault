"use client"

import React, { useState } from "react"
import { Grid, Header, Table } from "semantic-ui-react"
import DetailsExpanded from "@/components/nav/DetailsExpanded"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import DeleteModel from "@/components/model/DeleteModel"
import DeleteProject from "@/components/project/DeleteProject"
import ImageUpload from "@/components/image/ImageUpload.tsx"
import JobUpload from "@/components/job/JobUpload.tsx"
import FileUpload from "@/components/file/FileUpload.tsx"
import {
  FileData,
  JobData,
  ModelData,
  ModelTags,
  PrinterData,
  ProjectData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import JobEdit from "@/components/job/JobEdit.tsx"

export default function Details({
  userData,
  modelData,
  projectData,
  projectModelData,
  jobData,
  imageData,
  page,
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
  modelTags: ModelTags[]
  printerData: PrinterData[]
  fileData: FileData[]
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const router = useRouter()

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

  const BackLink = () => {
    const type = page
    switch (type) {
      case "Models":
        if (isAdd || isEdit) {
          return (
            <a
              //   onClick={() => navigate("/models/")}
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
              //   onClick={() => navigate("/projects/")}
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
            <div style={{ fontWeight: "bold" }}>
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
      <Grid centered>
        <Grid.Row style={{}}>
          <Grid.Column
            largeScreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            className='pageContainer'
            style={{ maxWidth: "200px" }}
          >
            <Grid stackable padded style={{ padding: "50px 0 0 0" }}>
              {EditLink()}
              <br />
              {SideLinks()}
              <br />
              {getDeleteLink()}
              <br />
              {BackLink()}
            </Grid>
          </Grid.Column>
          <Grid.Column
            largeScreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            className='pageContainer'
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row style={{ paddingTop: "50px" }}>
              <DetailsExpanded
                userData={userData}
                modelData={modelData}
                projectData={projectData}
                projectModelData={projectModelData}
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
    </>
  )
}
