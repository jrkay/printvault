"use client"

import React, { useState, useEffect } from "react"
import {
  ModelData,
  ProjectData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import { Grid, Divider, Header, Card, Segment, Image } from "semantic-ui-react"
import Link from "next/link"
import { truncate } from "@/utils/const"

const HomescreenGrid = ({
  projectData,
  projectModelData,
  modelData,
  imageData,
}: {
  projectData: ProjectData[]
  projectModelData: ProjectModelData[]
  modelData: ModelData[]
  imageData: ImageData[]
}) => {
  const [sortedModelData, setSortedModelData] = useState<ModelData[]>([])

  useEffect(() => {
    setSortedModelData(getRecentModels(modelData))
  }, [modelData])

  const getUserProjectsCount = (projectData: ProjectData[]): number => {
    if (!projectData) {
      return 0
    }

    return projectData.length
  }

  const getUserModelsCount = (modelData: any): number => {
    if (!modelData) {
      return 0
    }

    return modelData.length
  }

  // Return 5 most recent created_at models
  const getRecentModels = (modelData: ModelData[]) => {
    if (!modelData) {
      return []
    }

    // order by created_at
    const sortedModelData = [...modelData].sort((a, b) => {
      return b.created_at.localeCompare(a.created_at)
    })

    // return 5 most recent
    return sortedModelData.slice(0, 5)
  }

  // Return 5 most recent created_at projects
  const getRecentProjects = (projectData: ProjectData[]) => {
    if (!projectData) {
      return []
    }

    // order by created_at
    const sortedProjectData = [...projectData].sort((a, b) => {
      return b.created_at.localeCompare(a.created_at)
    })

    // return 5 most recent
    return sortedProjectData.slice(0, 5)
  }

  const projectsToRender: JSX.Element[] = []

  getRecentProjects(projectData).forEach((project: any) => {
    let modelsToRender: JSX.Element[] = []

    if (projectModelData) {
      const matchingProjectModels = projectModelData.filter(
        (row: any) => row.project_id === project.id
      )
      const modelIds = matchingProjectModels.map((row: any) => row.model_id)

      const mappedModelIds = modelIds.map((id: any) => ({ id }))

      const matchingModels = modelData.filter((row: any) =>
        mappedModelIds.some((modelId: any) => modelId.id === row.id)
      )

      modelsToRender = matchingModels.map(
        (model: { id: string; name: string }) => (
          <>
            <Link
              href={"/models/" + model.id}
              key={model.id}
              style={{ marginBottom: "10px", fontSize: "0.8em" }}
            >
              {model.name}
            </Link>
            <br />
          </>
        )
      )
    }

    projectsToRender.push(
      <Grid.Row
        key={project.id}
        style={{ borderTop: "1px solid rgb(0,0,0,.15)" }}
      >
        <Grid.Column width={9}>
          <Link href={"/projects/" + project.id}>
            <Header as='h4' style={{ marginBottom: "10px" }}>
              {project.name}
            </Header>
            {truncate(project.description, 300, 150)}
          </Link>
        </Grid.Column>
        <Grid.Column width={7} textAlign='right'>
          Models Included:
          <br />
          {modelsToRender.length > 0 ? (
            modelsToRender
          ) : (
            <span style={{ fontSize: "0.8em" }}>No Models</span>
          )}
        </Grid.Column>
      </Grid.Row>
    )
  })

  const renderImage = (model: ModelData) => {
    const filteredImages = imageData.filter(
      (image: any) => image.model_id === model.id
    )

    if (filteredImages.length > 0) {
      return (
        <>
          {filteredImages.slice(0, 1).map((image: any) => (
            <Image
              key={image.id}
              alt=''
              src={image.href}
              fluid
              style={{
                minWidth: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />
          ))}
        </>
      )
    } else {
      return (
        <p
          style={{
            padding: "115px",
            background: "rgb(0,0,0,.05)",
            textAlign: "center",
          }}
        >
          No Image
        </p>
      )
    }
  }

  return (
    <>
      <Grid centered>
        <Grid.Row>
          <Grid.Column
            largeScreen={13}
            widescreen={13}
            computer={12}
            tablet={12}
            mobile={14}
            style={{ maxWidth: "1700px" }}
          >
            <Header as='h2' textAlign='center'>
              PrintVault
            </Header>
            <Grid columns={3} padded textAlign='center'>
              <Grid.Column style={{ display: "contents" }}>
                <Card.Group centered>
                  <Card
                    style={{
                      border: "1px solid purple",
                      boxShadow: "none",
                    }}
                    href='/models'
                  >
                    <Card.Content>
                      <Card.Header>{getUserModelsCount(modelData)}</Card.Header>
                      <Card.Description>Total Models</Card.Description>
                    </Card.Content>
                  </Card>
                  <Card
                    style={{
                      border: "1px solid purple",
                      boxShadow: "none",
                    }}
                    href='/projects'
                  >
                    <Card.Content>
                      <Card.Header>
                        {" "}
                        {getUserProjectsCount(projectData)}
                      </Card.Header>
                      <Card.Description>Total Projects</Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>
            </Grid>
            <Header as='h5'>Recent Models</Header>
            <Segment className='darkBg' padded={"very"}>
              <br />
              <br />
              <Grid>
                <Grid.Column>
                  <Card.Group centered>
                    {sortedModelData.map((model: any) => (
                      <Card
                        image={renderImage(model)}
                        header={model.name}
                        description={truncate(model.description, 100, 200)}
                        key={model.id}
                        href={"/models/" + model.id}
                        style={{
                          fontSize: "14px",
                          margin: "10px !important",
                        }}
                      />
                    ))}
                  </Card.Group>
                </Grid.Column>
              </Grid>
            </Segment>
            <br />
            <br />
            <Divider />
            <Header as='h5'>Recent Projects</Header>
            <Segment className='darkBg' padded='very'>
              <Grid columns={2} padded>
                {projectsToRender}
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default HomescreenGrid
