import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Grid, Divider, Header, Image } from "semantic-ui-react"
import { truncate } from "../../app/helpers/pageHelpers"

export const ProjectList = ({
  fileData,
  projectData,
}: {
  fileData: any
  projectData: any
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
      return a.created_at.localeCompare(b.created_at)
    } else {
      return 0
    }
  })

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
      <select value={sortOption} onChange={handleSortChange}>
        <option value='nameA'>Sort by Name A-Z</option>
        <option value='nameZ'>Sort by Name Z-A</option>
        <option value='date'>Sort by Date Created</option>
      </select>
      <Grid columns={2} padded>
        {projectsToRender}
      </Grid>
    </>
  )
}
