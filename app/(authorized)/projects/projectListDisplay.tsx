"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Grid, Header, Button, Segment } from "semantic-ui-react"
import { truncate } from "@/utils/const"
import {
  ModelData,
  ProjectData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps"
import { sortOptions } from "@/utils/const"
import { getUserData } from "@/api/helpers"

const ProjectListDisplay = ({
  modelData,
  projectData,
  projectModelData,
  displaySort,
  userData,
}: {
  modelData: ModelData[]
  projectData: ProjectData[]
  projectModelData: ProjectModelData[]
  displaySort?: boolean
  userData: UserData[]
}) => {
  const [sortOption, setSortOption] = useState("name")
  const projectsToRender: JSX.Element[] = []

  const sortedProjects = [...projectData].sort((a: any, b: any) => {
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
        style={{ borderTop: "1px solid rgb(255,255,255,.15)" }}
      >
        <Grid.Column width={9}>
          <Link href={"/projects/" + project.id}>
            <Header as='h3' style={{}} className='project-header'>
              {project.name}
            </Header>
          </Link>
          <div style={{ fontSize: "1.2em !important" }}>
            {truncate(project.description, 300, 150)}
          </div>
          <div style={{ fontSize: "1em" }}>
            Project by{" "}
            <b>
              {userData
                .filter((user: any) => user.id === project.user_id)
                .map((user: any) => user.username)}
            </b>
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

  const sortInput = (
    <div>
      {sortOptions.map((option) => (
        <Button
          key={option.value}
          onClick={() => setSortOption(option.value)}
          style={{ marginRight: "5px" }}
          className={`sort-button ${
            sortOption === option.value ? "active" : ""
          }`}
        >
          {option.text}
        </Button>
      ))}
    </div>
  )

  return (
    console.log("usernames", userData),
    (
      <>
        <Grid centered className='pageStyle'>
          <Grid.Row>
            <Grid.Column
              largeScreen={13}
              widescreen={13}
              computer={12}
              tablet={12}
              mobile={14}
              className='pageContainer'
              style={{ maxWidth: "1700px" }}
            >
              <Segment
                style={{ background: "rgb(0, 0, 0, .35)" }}
                padded='very'
              >
                {displaySort ? sortInput : null}
                <br />
                <br />
                <Grid columns={2} padded>
                  {projectsToRender}
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    )
  )
}

export default ProjectListDisplay
