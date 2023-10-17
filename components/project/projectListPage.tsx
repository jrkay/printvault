import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Header, Dropdown, DropdownProps } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"

export const ProjectList = ({
  fileData,
  projectData,
  projectFiles,
}: {
  fileData: any
  projectData: any
  projectFiles: any
}) => {
  const [sortOption, setSortOption] = useState("name")
  const projectsToRender: JSX.Element[] = []

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value)
  }

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

    if (project.files) {
      const filteredFiles = project.files
        .filter((fileId: string) =>
          fileData.some((file: any) => file.id === fileId)
        )
        .map((fileId: string) => {
          const file = fileData.find((file: any) => file.id === fileId)
          return { id: fileId, name: file.name }
        })

      filesToRender = filteredFiles.map(
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
        placeholder='Sort by'
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
