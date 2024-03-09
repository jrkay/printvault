"use client"

import React from "react"
import {
  ModelData,
  ProjectData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"
import { Grid, Divider, Header, Card, Segment, Image } from "semantic-ui-react"
import Link from "next/link"
import { truncate } from "@/utils/const"
import StatCard from "./StatCard"
import NewestModelCard from "./NewestModelCard"

const HomescreenGrid = ({
  projectData,
  projectModelData,
  modelData,
  imageData,
}: {
  projectData: ProjectData[]
  projectModelData: ProjectModelData[]
  modelData: ModelData[]
  imageData: any
}) => {
  const getUserProjectsCount = (projectData: ProjectData[]): number =>
    projectData?.length ?? 0

  const getUserModelsCount = (modelData: ModelData[]): number =>
    modelData?.length ?? 0

  const getNewestModels = (modelData: ModelData[]) => {
    if (!modelData) {
      return []
    }
    return modelData
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 5)
  }

  const getNewestProjects = (projectData: ProjectData[]) => {
    if (!projectData) {
      return []
    }
    return projectData
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 5)
  }

  const projectsToRender: JSX.Element[] = []

  getNewestProjects(projectData).forEach((project: any) => {
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
                  <StatCard
                    title='Total Models'
                    count={getUserModelsCount(modelData)}
                    href='/models'
                  />
                  <StatCard
                    title='Total Projects'
                    count={getUserProjectsCount(projectData)}
                    href='/projects'
                  />
                </Card.Group>
              </Grid.Column>
            </Grid>
            <Header as='h5'>Newest Models</Header>
            <Segment className='darkBg' padded={"very"}>
              <br />
              <br />
              <Grid>
                <Grid.Column>
                  <Card.Group centered>
                    {getNewestModels(modelData).map((model) => (
                      <NewestModelCard
                        key={model.id}
                        model={model}
                        imageData={imageData}
                      />
                    ))}
                  </Card.Group>
                </Grid.Column>
              </Grid>
            </Segment>
            <br />
            <br />
            <Divider />
            <Header as='h5'>Newest Projects</Header>
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
