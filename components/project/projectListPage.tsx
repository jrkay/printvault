import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Header, Dropdown, DropdownProps } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"

export const ProjectList = ({
  fileData,
  projectData,
  projectFileData,
}: {
  fileData: any
  projectData: any
  projectFileData: any
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
    let filesToRender: JSX.Element[] = []

    if (projectFileData) {
      const matchingProjectFiles = projectFileData.filter(
        (row: any) => row.project_id === project.id
      )
      const fileIds = matchingProjectFiles.map((row: any) => row.file_id)

      const mappedFileIds = fileIds.map((id: any) => ({ id }))

      const matchingFiles = fileData.filter((row: any) =>
        mappedFileIds.some((fileId: any) => fileId.id === row.id)
      )

      filesToRender = matchingFiles.map(
        (file: { id: string; name: string }) => (
          <>
            <Link
              to={"/files/" + file.id}
              key={file.id}
              style={{ marginBottom: "10px", fontSize: "0.8em" }}
            >
              {file.name}
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
          Files Included:
          <br />
          {filesToRender.length > 0 ? (
            filesToRender
          ) : (
            <span style={{ fontSize: "0.8em" }}>No Files</span>
          )}
        </Grid.Column>
      </Grid.Row>
    )
  })

  return (
    <>
      <Dropdown
        selection
        name='dropdown-sort-projects'
        options={sortOptions}
        placeholder={sortOptions[2].text}
        onChange={(e: any, { value }: DropdownProps) =>
          setSortOption(value as string)
        }
        value={sortOption}
      />
      <br />
      <br />
      <Grid columns={2} padded>
        {projectsToRender}
      </Grid>
    </>
  )
}
