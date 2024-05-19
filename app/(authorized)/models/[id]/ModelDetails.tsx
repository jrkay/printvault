"use client"

import React, { useState, useEffect, Fragment } from "react"
import {
  Grid,
  Header,
  Table,
  Tab,
  TabPane,
  Button,
  Icon,
  Card,
} from "semantic-ui-react"
import { useParams } from "next/navigation"
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
import { getFiles } from "@/api/api/fileApi"
import {
  formattedDate,
  formatDateForModel,
  truncate,
} from "@/utils/helpers/uiHelpers"
import { getProjectsForModel } from "@/api/api/projectApi"

export default function ModelDetailDisplay({
  modelData,
  imageData,
  printerData,
  userData,
  activeUser,
}: {
  modelData: ModelProps[]
  imageData: ImageProps[]
  printerData: PrinterProps[]
  userData: UserProps[]
  activeUser?: string
}) {
  const [isEdit, setIsEdit] = useState(false)
  const [jobData, setJobData] = useState<JobProps[]>([])
  const { id } = useParams<{ id: string }>()
  const [modelTags, setModelTags] = useState<ModelTagProps[]>([])
  const [activeModelTags, setActiveModelTags] = useState<string[]>([])
  const [fileData, setFileData] = useState<FileProps[]>([])
  const [projects, setProjects] = useState<ProjectProps[]>([])

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

      getModelTags(activeModel.id)
        .then((modelTagData: any[]) => {
          const tagNames = modelTagData.map((tagData) => tagData.name)
          setActiveModelTags(tagNames)
        })
        .catch((error) => {
          console.error("Error fetching model tags:", error)
        })

      getFiles(activeModel.id)
        .then((modelFiles: any[]) => {
          setFileData(modelFiles)
        })
        .catch((error: any) => {
          console.error("Error fetching model files:", error)
        })

      getProjectsForModel(activeModel.id)
        .then((modelProjects: any[]) => {
          setProjects(modelProjects)
        })
        .catch((error: any) => {
          console.error("Error fetching model files:", error)
        })
    }
  }, [activeModel])

  const jobLink = (linkTitle: string, id: string) => {
    const activeJob = jobData.find((job: JobProps) => job.id === id)

    return (
      <JobView
        activeModel={activeModel}
        modalDisplay={linkTitle}
        activeJob={activeJob}
        activeUser={activeUser}
      />
    )
  }

  const panes = [
    {
      menuItem: "Details",
      render: () => (
        <TabPane
          attached={false}
          style={{
            maxHeight: "24em",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {activeModel?.description ?? "No Description"}
        </TabPane>
      ),
    },
    {
      menuItem: "Comments",
      render: () => (
        <TabPane
          attached={false}
          style={{
            maxHeight: "24em",
            overflowY: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          <span style={{ whiteSpace: "pre-wrap" }}>
            {activeModel?.comments ?? "No Comments"}
          </span>
        </TabPane>
      ),
    },
  ]

  const TabExampleSecondaryPointing = () => (
    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
  )

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
      return <span style={{ padding: "6px 10px" }}>No Tags</span>
    } else {
      return activeModelTags.map((tag) => (
        <span
          key={tag}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            margin: "0 3px",
            fontSize: ".85em",
            boxShadow: "0 0 0 1px #6435c9 inset !important",
            color: "#6435c9",
            background: "lightgrey",
          }}
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
    const modelFiles = fileData.map((file, index) => {
      const extension = file.href.match(/\.(\w{3})(?=\?|$)/)?.[1]

      // Sequential numbering (starts from 2 for the second file)
      const fileNumber = index > 0 ? " (" + (index + 1) + ")" : ""

      return (
        <Grid.Row
          key={index}
          style={{
            background: "#f9fafb",
            margin: "5px 20px",
            borderRadius: "5px",
          }}
        >
          <Grid.Column
            largescreen={3}
            widescreen={3}
            computer={3}
            tablet={4}
            mobile={6}
            style={{
              margin: "0",
              alignContent: "space-evenly",
            }}
          >
            {activeUser ? (
              <Button
                basic
                size='mini'
                color='violet'
                as={Link}
                href={file.href}
                style={{ width: "auto" }}
              >
                {"Download"}
              </Button>
            ) : (
              <Button
                basic
                size='mini'
                color='violet'
                style={{ width: "auto" }}
                disabled
              >
                {"Download"}
              </Button>
            )}
          </Grid.Column>
          <Grid.Column
            largescreen={13}
            widescreen={13}
            computer={13}
            tablet={12}
            mobile={10}
          >
            <span style={{ fontWeight: "bold", fontSize: "0.9em" }}>
              {activeModel?.name}
              {fileNumber}.{extension}
            </span>
            <br />
            <span style={{ fontSize: ".8em" }}>
              Published {formattedDate(file.created_at)}
            </span>
          </Grid.Column>
        </Grid.Row>
      )
    })

    return (
      <Fragment>
        {modelFiles.length === 0 ? (
          <span
            style={{
              marginLeft: "10px",
            }}
          >
            No files uploaded
          </span>
        ) : (
          modelFiles
        )}
      </Fragment>
    )
  }

  return (
    <>
      <Grid
        centered
        largescreen={12}
        widescreen={12}
        computer={12}
        tablet={12}
        mobile={12}
        style={{
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Grid.Row style={{ paddingBottom: "0px" }}>
          <Grid.Column textAlign='right'>
            {activeModel?.url && (
              <Button
                basic
                size='large'
                color='violet'
                content='Visit Original Model'
                onClick={() => {
                  const fullUrl = activeModel.url?.startsWith("http")
                    ? activeModel.url
                    : `http://${activeModel.url}`
                  window.open(fullUrl, "_blank")
                }}
              />
            )}

            {activeUser === undefined ? (
              <Button basic size='large' color='violet' disabled>
                Edit Model
              </Button>
            ) : activeModel?.user_id === activeUser ? (
              isEdit ? (
                <>
                  <CancelButton />
                </>
              ) : (
                <>
                  <Button
                    basic
                    size='large'
                    color='violet'
                    onClick={() => setIsEdit(true)}
                  >
                    Edit Model
                  </Button>
                </>
              )
            ) : null}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: "0px" }}>
          <Grid.Column>
            <Grid.Row>
              {activeModel ? (
                <Grid>
                  <Grid.Row centered>
                    <Grid.Column
                      largescreen={8}
                      widescreen={8}
                      computer={8}
                      tablet={15}
                      mobile={15}
                      style={{}}
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
                            margin: "50px",
                          }}
                        >
                          <Icon name='cube' size='huge' />
                        </div>
                      )}
                    </Grid.Column>
                    <Grid.Column
                      largescreen={8}
                      widescreen={8}
                      computer={8}
                      tablet={16}
                      mobile={16}
                      style={{ paddingTop: "10px" }}
                    >
                      <Grid.Row style={{}}>
                        <Grid.Column>
                          <Header as='h3'>{activeModel.name}</Header>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row
                        columns={2}
                        style={{ display: "flex", marginTop: "20px" }}
                      >
                        <Grid.Column
                          largescreen={2}
                          widescreen={2}
                          computer={2}
                          tablet={2}
                          mobile={2}
                          style={{
                            padding: "10px 5px 5px 10px",
                            alignContent: "center",
                            border: "1px solid rgb(0,0,0,.1)",
                            borderRadius: "5px 0 0 5px",
                          }}
                        >
                          <span
                            style={{
                              margin: "0 auto",
                            }}
                          >
                            <Icon name='user circle' size='big' />
                          </span>
                        </Grid.Column>
                        <Grid.Column
                          largescreen={6}
                          widescreen={6}
                          computer={6}
                          tablet={6}
                          mobile={6}
                          style={{
                            padding: "5px 10px",
                            border: "1px solid rgb(0,0,0,.1)",
                            borderLeft: "none",
                            borderRadius: "0 5px 5px 0",
                          }}
                        >
                          <div style={{ margin: "0 auto" }}>
                            {userData.length ? (
                              userData
                                .filter(
                                  (user) => user.id === activeModel.user_id
                                )
                                .map((user) => (
                                  <span
                                    key={user.id}
                                    style={{
                                      fontSize: "1.1em",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {user.username === "Guest" ? (
                                      user.username
                                    ) : (
                                      <Link href={`/account/${user.username}`}>
                                        {user.username}
                                      </Link>
                                    )}
                                  </span>
                                ))
                            ) : (
                              <span>PrintVault User</span>
                            )}
                          </div>
                          <Icon name='cloud upload' />
                          <span style={{ fontSize: ".9em" }}>
                            Uploaded {formattedDate(activeModel.created_at)}
                          </span>
                          <span style={{ fontSize: ".9em", display: "block" }}>
                            {activeModel.last_updated && (
                              <>
                                <Icon name='edit' />
                                Edited{" "}
                                <span style={{}}>
                                  {formattedDate(activeModel.last_updated)}
                                </span>
                              </>
                            )}
                          </span>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        {TabExampleSecondaryPointing()}
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
            <div style={{}}>
              <Header as='h5' dividing style={{ marginBottom: "10px" }}>
                Tags
              </Header>
              <Grid>
                <Icon
                  name='tags'
                  style={{ margin: "5px 10px 0 0", padding: "0px 25px" }}
                />{" "}
                {renderModelTags()}
              </Grid>
            </div>
            <Header as='h5' dividing>
              Print Jobs
            </Header>
            <div
              style={{
                padding: "10px 5px",
              }}
            >
              {activeModel?.id ? (
                <Table
                  collapsing
                  style={{
                    width: "100%",
                    fontSize: "0.8em",
                  }}
                >
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
                            <Table.Cell>
                              {formatDateForModel(job.created_at)}
                            </Table.Cell>
                            <Table.Cell>
                              {job.duration
                                ? job.duration + "mins"
                                : "Not Recorded"}
                            </Table.Cell>
                            <Table.Cell>{job.status}</Table.Cell>
                            <Table.Cell>
                              {jobLink("Details", job.id)}
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
            </div>
          </Grid.Column>
          <Grid.Column style={{}}>
            <div style={{}}>
              <Header as='h5' dividing style={{ marginBottom: "10px" }}>
                Files
              </Header>
              <Grid style={{}}>{renderDownloadFiles()}</Grid>
            </div>

            <div style={{ marginTop: "40px" }}>
              <Header as='h5' dividing style={{ marginBottom: "10px" }}>
                Print Settings
              </Header>
              <span
                style={{
                  margin: "5px 10px",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                Recommended with{" "}
                {activeModel?.type ? (
                  <>
                    {activeModel?.type}
                    {"."}
                  </>
                ) : (
                  "either Resin or Filament."
                )}
              </span>
              {activeModel?.print_settings ? (
                <span style={{ margin: "5px 10px", display: "block" }}>
                  {activeModel?.print_settings}
                </span>
              ) : (
                <span
                  style={{
                    margin: "5px 10px",
                    display: "block",
                  }}
                >
                  No recommended print settings
                </span>
              )}
            </div>
            <div style={{ marginTop: "40px" }}>
              <Header as='h5' dividing style={{ marginBottom: "10px" }}>
                Projects
              </Header>
              {projects.length > 0 ? (
                <>
                  {projects.map((project: ProjectProps) => (
                    <Card
                      key={project.id}
                      style={{ display: "inline-block", margin: "10px" }}
                    >
                      <Card.Content>
                        <Card.Header
                          style={{
                            fontSize: "1em",
                            fontWeight: "700",
                            textAlign: "center",
                          }}
                          as={Link}
                          href={`/projects/${project.id}`}
                        >
                          {project.name}
                          <span
                            style={{
                              fontSize: ".85em",
                              fontWeight: "400",
                              display: "block",
                            }}
                          >
                            {truncate(project.description, 100, 100)}
                          </span>
                          <span
                            style={{
                              display: "block",
                              fontWeight: "400",
                              fontSize: ".7em",
                            }}
                          >
                            {formattedDate(project.created_at)}
                          </span>
                        </Card.Header>
                      </Card.Content>
                    </Card>
                  ))}
                </>
              ) : (
                <span
                  style={{
                    padding: "5px 10px",
                  }}
                >
                  No projects found
                </span>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
