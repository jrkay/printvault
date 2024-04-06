"use client"

import React from "react"
import {
  ModelProps,
  ProjectProps,
  ProjectModelProps,
  ImageProps,
} from "@/utils/appTypes"
import { Grid, Divider, Header, Card, Segment } from "semantic-ui-react"
import Link from "next/link"
import { truncate } from "@/utils/helpers/uiHelpers"
import StatCard from "./StatCard"
import NewestModelCard from "./NewestModelCard"

const HomescreenGrid = ({
  projectData,
  projectModelData,
  modelData,
  imageData,
}: {
  projectData: ProjectProps[]
  projectModelData: ProjectModelProps[]
  modelData: ModelProps[]
  imageData: ImageProps[]
}) => {
  const getUserProjectsCount = (projectData: ProjectProps[]): number =>
    projectData?.length ?? 0

  const getUserModelsCount = (modelData: ModelProps[]): number =>
    modelData?.length ?? 0

  const getNewestModels = (modelData: ModelProps[]): ModelProps[] => {
    if (!modelData || modelData.length === 0) return []
    const modelDataWithLatestFirst = [...modelData].sort((a, b) =>
      b.created_at.localeCompare(a.created_at)
    )
    return modelDataWithLatestFirst.slice(0, 5)
  }
  const getProjectModels = (
    projectModelData: ProjectModelProps[],
    projectId: string
  ): string[] =>
    projectModelData
      .filter((row) => row.project_id === projectId)
      .map((row) => row.model_id)

  const getProjectsToRender = (
    projectData: ProjectProps[],
    projectModelData: ProjectModelProps[]
  ): JSX.Element[] =>
    projectData
      .slice()
      .sort((a, b) => b.created_at.localeCompare(a.created_at))
      .slice(0, 5)
      .map((project) => {
        const models = getProjectModels(projectModelData, project.id)

        const modelsToRender =
          models.length > 0 ? (
            models.map((id) => (
              <div key={id}>
                <Link
                  href={`/models/${id}`}
                  key={id}
                  style={{ fontSize: "0.8em" }}
                >
                  {modelData.find((model) => model.id === id)?.name}
                </Link>
                <br />
              </div>
            ))
          ) : (
            <span style={{ fontSize: "0.8em" }}>No Models</span>
          )

        return (
          <Grid.Row
            key={project.id}
            style={{ borderTop: "1px solid rgb(0,0,0,.15)" }}
          >
            <Grid.Column width={9}>
              <Link href={`/projects/${project.id}`}>
                <Header as='h4' style={{ marginBottom: "10px" }}>
                  {project.name}
                </Header>
                {truncate(project.description, 300, 150)}
              </Link>
            </Grid.Column>
            <Grid.Column width={7} textAlign='right'>
              Models Included:
              <br />
              {modelsToRender}
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
                {getProjectsToRender(projectData, projectModelData)}
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default HomescreenGrid
