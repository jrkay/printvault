import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Grid,
  Header,
  Dropdown,
  DropdownProps,
  Button,
} from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"
import { ModelData, ProjectModelData } from "@/app/AppRoutesProps"

export const ProjectList = ({
  modelData,
  projectData,
  projectModelData,
  displaySort,
  header,
}: {
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
  displaySort?: boolean
  header: string
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

  const sortOptions = [
    { key: "1", text: "Sort by Name A-Z", value: "nameA" },
    { key: "2", text: "Sort by Name Z-A", value: "nameZ" },
    { key: "3", text: "Newest Created", value: "date" },
  ]

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
              to={"/models/" + model.id}
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
          <Link to={"/projects/" + project.id}>
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
    <>
      {displaySort ? sortInput : null}

      <br />
      <br />
      <Grid columns={2} padded>
        {projectsToRender}
      </Grid>
    </>
  )
}
