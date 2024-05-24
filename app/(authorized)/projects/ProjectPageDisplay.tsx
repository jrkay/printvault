"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Grid, Button, Card, Icon } from "semantic-ui-react"
import { truncate } from "@/utils/helpers/uiHelpers"
import {
  ModelProps,
  ProjectProps,
  ProjectModelProps,
  UserProps,
} from "@/utils/appTypes"
import { sortOptions } from "@/utils/uiConstants"

const MAX_MODELS_DISPLAYED = 3

const ProjectListDisplay = ({
  modelData,
  projectData,
  projectModelData,
  userData,
  activeUser,
}: {
  modelData: ModelProps[]
  projectData: ProjectProps[]
  projectModelData: ProjectModelProps[]
  userData: UserProps[]
  activeUser: any
}) => {
  const [sortOption, setSortOption] = useState("nameA")

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

  const sortInput = (
    <div>
      {sortOptions.map((option) => (
        <Button
          basic
          color={sortOption === option.value ? "teal" : "violet"}
          content={option.text}
          key={option.value}
          onClick={() => setSortOption(option.value)}
          style={{ marginRight: "5px" }}
          className={`sort-button ${
            sortOption === option.value ? "active" : ""
          }`}
        />
      ))}
    </div>
  )

  return (
    <Grid
      centered
      style={{
        maxWidth: "1700px",
        margin: "0 auto",
      }}
    >
      <Grid.Row columns={2} style={{ margin: "0 75px" }}>
        <Grid.Column textAlign='left' verticalAlign='middle'>
          {sortInput}
        </Grid.Column>
        <Grid.Column textAlign='right'>
          {activeUser != null ? (
            <Button
              basic
              color='violet'
              as={Link}
              href='/projects/add'
              size='large'
            >
              Upload Project
            </Button>
          ) : (
            <Button
              basic
              color='violet'
              as={Link}
              href='/'
              disabled
              size='large'
            >
              Upload Project
            </Button>
          )}
        </Grid.Column>
      </Grid.Row>

      <Card.Group itemsPerRow={3}>
        {sortedProjects.map((project, index) => {
          const projectUser = userData.find(
            (user) => user.id === project.user_id
          )
          const projectModels = projectModelData.filter(
            (pm) => pm.project_id === project.id
          )
          const modelsToRender = modelData.filter((model) =>
            projectModels.some((pm) => pm.model_id === model.id)
          )

          const limitedModels = modelsToRender.slice(0, MAX_MODELS_DISPLAYED)

          return (
            <Card
              key={project.id}
              style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}
            >
              <Card.Content>
                <Card.Header>
                  <Link href={`/projects/${project.id}`}>{project.name}</Link>
                </Card.Header>
                <Card.Meta>
                  <span style={{ fontSize: "0.8em" }}>
                    Created on{" "}
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                  <br />
                  <span style={{ fontSize: "0.8em" }}>
                    <Icon name='user' /> Project by{" "}
                    {projectUser ? (
                      <Link href={`/account/${projectUser.username}`}>
                        {projectUser.username}
                      </Link>
                    ) : (
                      "PrintVault User"
                    )}
                  </span>
                </Card.Meta>
                <Card.Description>
                  {truncate(project.description, 200, 200)}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name='box' /> Models Included ({modelsToRender.length})
                <ul style={{ textAlign: "left" }}>
                  {limitedModels.length > 0 ? (
                    limitedModels.map((model) => (
                      <li key={model.id}>
                        <Link href={`/models/${model.id}`}>{model.name}</Link>
                      </li>
                    ))
                  ) : (
                    <li>No Models</li>
                  )}
                  {modelsToRender.length > MAX_MODELS_DISPLAYED && (
                    <Link
                      href={`/projects/${project.id}`}
                      style={{ fontStyle: "italic", fontSize: "0.9em" }}
                    >
                      More models ...
                    </Link>
                  )}
                </ul>
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    </Grid>
  )
}

export default ProjectListDisplay
