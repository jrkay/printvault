"use client"

import React, { useState } from "react"
import { Button, Grid, Header, Icon, Segment, Image } from "semantic-ui-react"
import { useParams } from "next/navigation"
import DeleteProject from "@/components/project/DeleteProject"
import { ModelData, ProjectModelData } from "@/utils/AppRoutesProps.tsx"
import Link from "next/link"
import EditProject from "@/components/project/EditProject"
import ShareButton from "@/components/ShareButton"

export default function ProjectDetailDisplay({
  modelData,
  projectData,
  projectModelData,
  imageData,
}: {
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
  imageData: any
}) {
  const [isEdit, setIsEdit] = useState(false)

  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((model: any) => model.id === id)

  const limitedProjectModels = projectModelData?.filter(
    (row: any) => row.project_id === activeProject?.id
  )

  const refresh = () => {
    window.location.reload()
  }

  const BackLink = () => {
    if (isEdit) {
      return (
        <Button
          href={`/projects/${activeProject.id}`}
          onClick={() => refresh()}
          style={{}}
          className='sideNavButton'
          compact
        >
          Cancel
        </Button>
      )
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
          Edit Project
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
          {}
          <DeleteProject
            activeProject={activeProject}
            projectModelData={projectModelData}
          />
        </div>
      )
    }
  }

  const renderImage = (model: ModelData) => {
    const filteredImage = imageData.find(
      (image: any) => image.model_id === model.id
    )

    if (filteredImage) {
      return (
        <>
          <Image
            key={filteredImage.id}
            alt=''
            src={filteredImage.href}
            fluid
            style={{
              height: "200px",
              width: "200px",
              objectFit: "cover",
            }}
          />
        </>
      )
    } else {
      return (
        <p
          style={{
            background: "rgb(255,255,255,.05)",
            textAlign: "center",
            height: "185px",
            width: "185px",
          }}
        >
          {/* <Icon name='picture' /> */}
        </p>
      )
    }
  }

  const findMatchingIds = () => {
    let modelsToRender: JSX.Element[] = []

    if (limitedProjectModels) {
      const matchingModels = modelData.filter((row: any) =>
        limitedProjectModels.some((modelId: any) => modelId.model_id === row.id)
      )

      modelsToRender = matchingModels.map((model: any) => (
        <>
          <Grid>
            <Grid.Row style={{}}>
              <Grid.Column width={4} style={{}}>
                {renderImage(model)}
              </Grid.Column>
              <Grid.Column width={12} style={{}}>
                <Header as='h4'>
                  <Link
                    href={"/models/" + model.id}
                    key={model.id}
                    style={{
                      marginBottom: "10px",
                      fontSize: "0.8em",
                    }}
                  >
                    {model.name}
                  </Link>
                </Header>
                <Button
                  onClick={() => window.open(model.url, "_blank")}
                  style={{ fontSize: "0.7em" }}
                >
                  Visit Original
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ))
      return modelsToRender
    }
  }

  const createdAt = activeProject?.created_at
  const lastUpdated = activeProject?.last_updated
  const formattedDate = (date: any) => {
    return new Date(date).toLocaleDateString(undefined)
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
            style={{ maxWidth: "1500px", paddingTop: "50px" }}
          >
            {isEdit ? (
              <EditProject
                projectData={projectData}
                modelData={modelData}
                projectModelData={projectModelData}
              />
            ) : (
              <>
                <Grid.Row>
                  {activeProject ? (
                    <>
                      <Grid padded>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <div>
                              <Header as='h3'>{activeProject.name}</Header>
                              <p style={{ margin: "0", fontSize: ".8em" }}>
                                <Icon name='cloud upload' />
                                Created on{" "}
                                <span style={{ fontWeight: "500" }}>
                                  {formattedDate(createdAt)}
                                </span>
                                <br />
                                {activeProject.last_updated ? (
                                  <>
                                    <Icon name='edit' />
                                    Last Updated on{" "}
                                    <span style={{ fontWeight: "500" }}>
                                      {formattedDate(lastUpdated)}
                                    </span>
                                  </>
                                ) : (
                                  <> </>
                                )}
                              </p>
                              <span style={{ padding: "20px" }}>
                                <ShareButton activeProject={activeProject} />
                              </span>
                              <div style={{ marginTop: "10px" }}>
                                {activeProject.description}
                              </div>
                            </div>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Segment
                            style={{
                              background: "rgb(0, 0, 0, .35)",
                              fontSize: "1em",
                              width: "100%",
                            }}
                          >
                            <Header
                              as='h5'
                              style={{
                                margin: "0  0 10px 0",
                              }}
                            >
                              <Icon name='file outline' />
                              Included Models
                            </Header>
                            {limitedProjectModels.length ? (
                              <>
                                <div style={{ marginTop: "10px" }}>
                                  {findMatchingIds()}
                                </div>
                              </>
                            ) : (
                              "None"
                            )}
                          </Segment>
                        </Grid.Row>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                </Grid.Row>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}
