"use client"

import React, { useState } from "react"
import { Button, Checkbox, Grid, Header, Tab, Table } from "semantic-ui-react"
import DetailsExpanded from "@/components/DetailsExpanded"
import { useParams } from "next/navigation"
import DeleteModel from "@/components/model/DeleteModel"
import ImageUpload from "@/components/image/ImageUpload.tsx"
import JobUpload from "@/components/job/JobUpload.tsx"
import FileUpload from "@/components/file/FileUpload.tsx"
import JobView from "@/components/job/JobView"
import {
  FileData,
  ModelData,
  ModelTags,
  PrinterData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import JobEdit from "@/components/job/JobEdit.tsx"
import Link from "next/link"

export default function ModelDetailDisplay({
  activeUser,
  modelData,
  projectData,
  projectModelData,
  jobData,
  imageData,
  page,
  modelTags,
  printerData,
  fileData,
  userData,
}: {
  activeUser: UserData[]
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
  jobData: any
  imageData: ImageData[]
  page?: string
  modelTags: ModelTags[]
  printerData: PrinterData[]
  fileData: FileData[]
  userData: any
}) {
  const [isEdit, setIsEdit] = useState(false)

  const { id } = useParams<{ id: string }>()
  const activeModel =
    modelData && modelData.find((model: any) => model.id === id)

  const SideLinks = () => {
    const type = page

    switch (type) {
      case "Models":
        if (isEdit) {
          return <></>
        } else {
          return (
            <>
              <br />
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
              <br />
              <JobUpload
                userData={activeUser}
                activeModel={activeModel}
                printerData={printerData}
              />
              <br />
            </>
          )
        }

      default:
        return <></>
    }
  }

  const refresh = () => {
    window.location.reload()
  }

  const BackLink = () => {
    if (isEdit) {
      return (
        <Button
          basic
          color='violet'
          content='Cancel'
          href={`/models/${activeModel?.id}`}
          onClick={() => refresh()}
          className='sideNavButton'
          compact
        />
      )
    } else {
      return <></>
    }
  }
  const EditLink = () => {
    const type = page
    switch (type) {
      case "Models":
        if (isEdit) {
          return <></>
        } else {
          return (
            <a onClick={() => setIsEdit(true)} style={{ cursor: "pointer" }}>
              Edit Model
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
        if (isEdit) {
          return <></>
        } else {
          return (
            <div style={{ fontWeight: "bold" }}>
              <DeleteModel
                activeModel={activeModel}
                projectData={projectData}
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

  const jobLink = (linkTitle: string, id: string, userId: string) => {
    // If job is activeUser, display edit, otherwise display readonly
    if (activeUser[0].id === userId) {
      return (
        <JobEdit
          activeModel={activeModel}
          printerData={printerData}
          modalDisplay={linkTitle}
          jobData={filteredJobData}
          activeJob={id}
        />
      )
    } else {
      return (
        <JobView
          activeModel={activeModel}
          printerData={printerData}
          modalDisplay={linkTitle}
          jobData={filteredJobData}
          activeJob={id}
        />
      )
    }
  }

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
              {activeModel?.user_id === activeUser[0].id && (
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
              <DetailsExpanded
                activeUser={activeUser}
                modelData={modelData}
                projectData={projectData}
                projectModelData={projectModelData}
                imageData={imageData}
                page={page}
                isEdit={isEdit}
                modelTags={modelTags}
                fileData={fileData}
                userData={userData}
              />
            </Grid.Row>
            {activeModel?.id ? (
              <Grid.Row style={{ padding: "20px 15px 20px 20px" }}>
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
                      {filteredJobData.length > 0 ? (
                        <>
                          {filteredJobData.map((job: any) => (
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
                                {userData.map((user: any) => {
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
