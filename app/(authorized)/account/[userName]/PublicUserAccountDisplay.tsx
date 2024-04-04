"use client"

import { useParams } from "next/navigation"
import React, { useState } from "react"
import Link from "next/link"
import { Grid, Header, Segment } from "semantic-ui-react"
import { truncate } from "@/utils/helpers/uiHelpers"

const PublicAccountDisplay = ({
  activeUser,
  modelData,
  projectData,
  projectModelData,
}: {
  activeUser: any
  modelData: any
  projectData: any
  projectModelData: any
}) => {
  const { userName } = useParams<{ userName: string }>()
  const activeUsername = activeUser.username
  const activeUserId = activeUser.id
  const [sortOption, setSortOption] = useState("name")
  const projectsToRender: JSX.Element[] = []
  const sharedProjects = projectData.filter((project: any) => {
    return project.shared_with?.includes(activeUserId)
  })

  const sortedProjects = [...sharedProjects].sort((a: any, b: any) => {
    if (sortOption === "nameA") {
      return a.name.localeCompare(b.name)
    } else if (sortOption === "nameZ") {
      return b.name.localeCompare(a.name)
    } else if (sortOption === "date") {
      return b.created_at.localeCompare(a.created_at)
    } else {
      return b.created_at.localeCompare(a.created_at)
    }
  })

  sortedProjects.forEach((project: any) => {
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
            <Header as='h3' className='project-header'>
              {project.name}
            </Header>
          </Link>
          <div style={{ fontSize: "1.2em !important" }}>
            {truncate(project.description, 300, 150)}
          </div>
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
            <Segment className='darkBg' padded='very'>
              {activeUsername === userName ? (
                <>
                  <div>
                    {activeUser[0].name}
                    <br />
                    {activeUser[0].email}
                  </div>
                </>
              ) : (
                <>
                  <Header as='h2'>Shared Projects from {userName}</Header>
                  <br />
                  <Grid.Row>
                    <Grid.Column style={{ maxWidth: "1700px" }}>
                      <Grid columns={2} padded>
                        {projectsToRender}
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </>
              )}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default PublicAccountDisplay
