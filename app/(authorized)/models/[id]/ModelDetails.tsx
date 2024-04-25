"use client"

import React, { useState, useEffect } from "react"
import {
  Grid,
  Header,
  Table,
  Tab,
  TabPane,
  Button,
  Icon,
} from "semantic-ui-react"
import { useParams } from "next/navigation"
import JobUpload from "@/components/job/JobUpload"
import JobView from "@/components/job/JobView"
import {
  FileProps,
  ImageProps,
  ModelProps,
  PrinterProps,
  ProjectProps,
  UserProps,
  JobProps,
  ModelTagProps,
} from "@/utils/appTypes"
import Link from "next/link"
import CancelButton from "@/components/CancelButton"
import { getPrintJobs } from "@/api/api/printJobApi"
import EditModel from "@/components/model/EditModel"
import ImageGallery from "react-image-gallery"
import { getModelTags } from "@/api/api/modelTagApi"
import { formattedDate } from "@/utils/helpers/uiHelpers"

export default function ModelDetailDisplay({
  modelData,
  projectData,
  imageData,
  printerData,
  fileData,
  userData,
  activeUser,
}: {
  modelData: ModelProps[]
  projectData: ProjectProps[]
  imageData: ImageProps[]
  printerData: PrinterProps[]
  fileData: FileProps[]
  userData: UserProps[]
  activeUser?: string
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [jobData, setJobData] = useState<JobProps[]>([])
  const { id } = useParams<{ id: string }>()
  const [modelTags, setModelTags] = useState<ModelTagProps[]>([])
  const [activeModelTags, setActiveModelTags] = useState<string[]>([])
  const [isLoadingModelTags, setIsLoadingModelTags] = useState(false)

  const activeModel =
    modelData && modelData.find((model: any) => model.id === id)

  useEffect(() => {
    if (activeModel) {
      getPrintJobs(activeModel.id)
        .then((printjobs: JobProps[]) => {
          setJobData(printjobs)
        })
        .catch((error) => {
          console.error("Error fetching model tags:", error)
        })
      setIsLoadingModelTags(true)

      getModelTags(activeModel.id)
        .then((modelTagData: any[]) => {
          const tagNames = modelTagData.map((tagData) => tagData.name)
          setActiveModelTags(tagNames)
        })
        .catch((error) => {
          console.error("Error fetching model tags:", error)
        })
        .finally(() => {
          setIsLoadingModelTags(false)
        })
    }
  }, [activeModel])

  const SideLinks = () => {
    if (isEdit) {
      return <></>
    } else {
      return (
        <>
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  }

  const jobLink = (linkTitle: string, id: string, userId: string) => {
    const activeJob = jobData.find((job: JobProps) => job.id === id)

    //  If job is activeUser, display edit, otherwise display readonly
    if (activeUser === userId) {
      return (
        <JobView
          activeModel={activeModel}
          modalDisplay={linkTitle}
          activeJob={activeJob}
          activeUser={activeUser}
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

  // Filter images related to the active model
  const activeImages =
    imageData?.filter(
      (image: ImageProps) => image.model_id === activeModel?.id
    ) || []

  if (isEdit) {
    return (
      <EditModel
        modelData={modelData}
        modelTags={modelTags}
        imageData={imageData}
        fileData={fileData}
        activeUser={activeUser}
      />
    )
  }

  // Render model tags as spans with styling
  const renderModelTags = () => {
    if (activeModelTags.length === 0) {
      return <span>No Tags</span>
    } else {
      return activeModelTags.map((tag) => (
        <span
          key={tag}
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            padding: "2px 5px",
            borderRadius: "5px",
            margin: "0 3px",
            fontSize: "14px",
          }}
          className='bg-255-1'
        >
          {tag}
        </span>
      ))
    }
  }

  // Map images to format suitable for ImageGallery component
  const imageArray = activeImages.map((image: ImageProps) => ({
    original: image.href,
    alt: image.id,
    thumbnail: image.href,
  }))

  // Generate download links for associated files
  const renderDownloadFiles = () => {
    const modelFiles = fileData
      .filter((file) => file.model_id === activeModel?.id)
      .map((file, index) => {
        const extension = file.href.match(/\.(\w{3})(?=\?|$)/)?.[1]
        return (
          <div key={index}>
            <a href={file.href} download>
              {activeModel?.name} - {extension}
            </a>
            <br />
          </div>
        )
      })

    return modelFiles.length === 0 ? "No files" : modelFiles
  }

  return (
    <>
      <Grid
        centered
        largeScreen={12}
        widescreen={12}
        computer={12}
        tablet={12}
        mobile={12}
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Grid.Row>
          <Grid.Column textAlign='right'>
            {activeUser == null ? (
              <Button fluid basic color='violet' disabled>
                Edit Model
              </Button>
            ) : isEdit ? (
              <></>
            ) : activeModel?.user_id == activeUser ? (
              <Button
                basic
                size='large'
                color='violet'
                onClick={() => setIsEdit(true)}
              >
                Edit Model
              </Button>
            ) : (
              <></>
            )}

            {isEdit ? <CancelButton /> : <></>}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Grid.Row>
              {activeModel ? (
                <Grid>
                  <Grid.Row centered>
                    <Grid.Column
                      largeScreen={8}
                      widescreen={8}
                      computer={8}
                      tablet={15}
                      mobile={15}
                    >
                      {activeImages.length > 0 ? (
                        <ImageGallery
                          items={imageArray}
                          showFullscreenButton={false}
                          showPlayButton={false}
                          showNav={true}
                          showThumbnails={true}
                        />
                      ) : (
                        <div
                          style={{
                            padding: "70px",
                            background: "rgb(0,0,0,.05)",
                            textAlign: "center",
                          }}
                        >
                          <Icon name='cube' size='huge' />
                        </div>
                      )}
                    </Grid.Column>
                    <Grid.Column
                      largeScreen={8}
                      widescreen={8}
                      computer={8}
                      tablet={16}
                      mobile={16}
                    >
                      <Header as='h3'>{activeModel.name}</Header>
                      <p style={{ margin: "0", fontSize: ".8em" }}>
                        <Icon name='cloud upload' />
                        Uploaded on {formattedDate(
                          activeModel.created_at
                        )} by{" "}
                        {userData.length ? (
                          userData
                            .filter((user) => user.id === activeModel.user_id)
                            .map((user) => (
                              <span key={user.id} style={{ marginLeft: "3px" }}>
                                <Link href={`/account/${user.username}`}>
                                  {user.username}
                                </Link>
                              </span>
                            ))
                        ) : (
                          <span>PrintVault User</span>
                        )}
                        <br />
                        {activeModel.last_updated && (
                          <>
                            <Icon name='edit' />
                            Last Updated on{" "}
                            <span style={{ fontWeight: "500" }}>
                              {formattedDate(activeModel.last_updated)}
                            </span>
                          </>
                        )}
                      </p>
                      <Icon name='tags' />
                      {renderModelTags()}
                      <Grid.Row>
                        <Tab panes={panes} style={{ margin: "20px 0" }} />
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              ) : (
                <></>
              )}
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2} style={{}}>
          <Grid.Column style={{}}>
            <Header as='h5' dividing>
              Print Jobs
            </Header>
            {activeModel?.id ? (
              <Table collapsing style={{ width: "100%", fontSize: "0.8em" }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Created</Table.HeaderCell>
                    <Table.HeaderCell>Duration</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {jobData.length > 0 ? (
                    <>
                      {jobData.map((job: JobProps) => (
                        <Table.Row key={job.id}>
                          <Table.Cell>{formatDate(job.created_at)}</Table.Cell>
                          <Table.Cell>
                            {job.duration
                              ? job.duration + "mins"
                              : "Not Recorded"}
                          </Table.Cell>
                          <Table.Cell>{job.status}</Table.Cell>
                          <Table.Cell>
                            {jobLink("Details", job.id, job.user_id)}
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
            ) : (
              <></>
            )}
          </Grid.Column>
          <Grid.Column style={{}}>
            <Header as='h5' dividing>
              Files
            </Header>
            12333
            <Header as='h5' dividing>
              Print Settings
            </Header>
            54654654
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
