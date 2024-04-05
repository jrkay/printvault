"use client"

import React, { useState, useEffect } from "react"
import { Checkbox, Grid, Header, Table, Tab, TabPane } from "semantic-ui-react"
import { useParams } from "next/navigation"
import DeleteModel from "@/components/model/DeleteModel"
import JobUpload from "@/components/job/JobUpload"
import JobView from "@/components/job/JobView"
import {
  FileData,
  ImageData,
  ModelData,
  PrinterData,
  ProjectData,
  UserData,
  JobData,
} from "@/utils/appTypes"
import JobEdit from "@/components/job/JobEdit"
import Link from "next/link"
import CancelButton from "@/components/CancelButton"
import { ModelDetailFields } from "./ModelDetailFields"
import { getPrintJobs } from "@/api/api/printJobApi"

export default function ModelDetailDisplay({
  modelData,
  projectData,
  imageData,
  printerData,
  fileData,
  userData,
  activeUser,
}: {
  modelData: ModelData[]
  projectData: ProjectData[]
  imageData: ImageData[]
  printerData: PrinterData[]
  fileData: FileData[]
  userData: UserData[]
  activeUser?: string
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [jobData, setJobData] = useState<JobData[]>([])

  const { id } = useParams<{ id: string }>()
  const activeModel =
    modelData && modelData.find((model: any) => model.id === id)

  useEffect(() => {
    if (activeModel) {
      getPrintJobs(activeModel.id)
        .then((printjobs: JobData[]) => {
          setJobData(printjobs)
        })
        .catch((error) => {
          console.error("Error fetching model tags:", error)
        })
    }
  }, [activeModel])

  const SideLinks = () => {
    if (isEdit) {
      return <></>
    } else {
      return (
        <>
          <br />
          {/* TODO: Implement with new modal UI
              <FileUpload
                activeModel={activeModel}
                activeUser={activeUser}
                modalDisplay={"Upload File"}
              />
              <br />
              <ImageUpload
                activeModel={activeModel}
                activeUser={activeUser}
                modalDisplay={"Upload Image"}
              />
              <br /> */}
          <JobUpload
            userData={activeUser}
            activeModel={activeModel}
            printerData={printerData}
          />
          <br />
        </>
      )
    }
  }

  const BackLink = () => {
    if (isEdit) {
      return CancelButton()
    } else {
      return <></>
    }
  }

  const EditLink = () => {
    if (isEdit) {
      return <></>
    } else {
      return (
        <a onClick={() => setIsEdit(true)} style={{ cursor: "pointer" }}>
          Edit Model
        </a>
      )
    }
  }

  const getDeleteLink = () => {
    if (isEdit) {
      return <></>
    } else {
      return (
        <div style={{ fontWeight: "bold", marginTop: "20px" }}>
          <DeleteModel activeModel={activeModel} projectData={projectData} />
        </div>
      )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  const jobLink = (linkTitle: string, id: string, userId: string) => {
    //  If job is activeUser, display edit, otherwise display readonly
    if (activeUser === userId) {
      return (
        <JobEdit
          activeModel={activeModel}
          printerData={printerData}
          modalDisplay={linkTitle}
          jobData={jobData}
          activeJob={id}
        />
      )
    } else {
      return (
        <JobView
          activeModel={activeModel}
          modalDisplay={linkTitle}
          jobData={jobData}
          activeJob={id}
        />
      )
    }
  }

  const panes = [
    {
      menuItem: "Details",
      render: () => (
        <TabPane>{activeModel?.description ?? "No Description"}</TabPane>
      ),
    },
    {
      menuItem: "Comments",
      render: () => <TabPane>{activeModel?.comments ?? "No Comments"}</TabPane>,
    },
  ]

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column
            largeScreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            style={{ maxWidth: "200px" }}
          >
            <Grid stackable padded style={{ padding: "50px 0 0 0" }}>
              {activeModel && activeModel.user_id == activeUser && (
                <>
                  {EditLink()}
                  <br />
                  {SideLinks()}
                  <br />
                  {getDeleteLink()}
                  <br />
                  {BackLink()}
                </>
              )}
            </Grid>
          </Grid.Column>
          <Grid.Column
            largeScreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row style={{ padding: "20px" }}>
              <ModelDetailFields
                modelData={modelData}
                imageData={imageData}
                activeUser={activeUser}
                isEdit={isEdit}
                fileData={fileData}
                userData={userData}
              />
            </Grid.Row>
            <Grid.Row>
              <Tab panes={panes} style={{ margin: "0px 20px" }} />
            </Grid.Row>
            {activeModel?.id ? (
              <Grid.Row>
                <div
                  style={{
                    padding: "20px",
                    fontSize: "14px",
                    width: "100%",
                    margin: "10px auto",
                  }}
                >
                  <Header as='h4'>Print Jobs</Header>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Successful</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {jobData.length > 0 ? (
                        <>
                          {jobData.map((job: JobData) => (
                            <Table.Row key={job.id}>
                              <Table.Cell>
                                {jobLink(
                                  formatDate(job.created_at),
                                  job.id,
                                  job.user_id
                                )}
                              </Table.Cell>
                              <Table.Cell>{job.duration} min</Table.Cell>
                              <Table.Cell>{job.status}</Table.Cell>
                              <Table.Cell>
                                <Checkbox
                                  checked={!job.fail_comment}
                                  disabled
                                />
                              </Table.Cell>
                              <Table.Cell>
                                {userData.map((user: UserData) => {
                                  if (
                                    user.id === job.user_id &&
                                    user.username
                                  ) {
                                    return (
                                      <Link
                                        key={user.id}
                                        href={`/account/${user.username}`}
                                      >
                                        {user.username}
                                      </Link>
                                    )
                                  }
                                  return null
                                })}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </>
                      ) : (
                        <Table.Row>
                          <Table.Cell>No print jobs found</Table.Cell>
                        </Table.Row>
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
