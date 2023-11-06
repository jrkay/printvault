import React from "react"
import { Grid, Divider, Header, Card } from "semantic-ui-react"
import ProjectList from "@/components/project/projectListPage"
import ModelsList from "@/components/model/modelListPage"

import {
  ModelData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps.tsx"

export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}

export const ModelPage = ({
  modelData,
  imageData,
  userData,
  isAdd,
  displaySort,
}: {
  modelData: ModelData[]
  imageData: ImageData[]
  userData: UserData[]
  isAdd?: boolean
  displaySort?: any
}) => {
  if (displaySort === undefined) {
    displaySort = true
  }

  return (
    <>
      <ModelsList
        modelData={modelData}
        imageData={imageData}
        userData={userData}
        isAdd={isAdd}
        displaySort={displaySort}
      />
    </>
  )
}

export const ProjectPage = ({
  modelData,
  projectData,
  projectModelData,
  displaySort,
  isAdd,
  userData,
}: {
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
  displaySort?: any
  isAdd?: boolean
  userData: any
}) => {
  // leave sort in for main model page, remove for homepage
  if (displaySort === undefined) {
    displaySort = true
  }

  return (
    <>
      <ProjectList
        modelData={modelData}
        projectData={projectData}
        projectModelData={projectModelData}
        displaySort={displaySort}
        isAdd={isAdd}
        userData={userData}
      />
    </>
  )
}

export const AccountPage = ({ activeUser }: { activeUser: any }) => {
  return (
    <>
      <Header as='h2'>Account Details</Header>
      <div>
        <Header as='h4'>Name: </Header>
      </div>
      <br />
      <div>
        <Header as='h4'>Email: </Header>
        {activeUser?.user.email}
      </div>
    </>
  )
}

export const ToolsPage = () => {
  return (
    <>
      <Header as='h2'>Tools Details</Header>
      <div>
        <Header as='h4'>Name: </Header>
      </div>
    </>
  )
}

export const HomePage = ({
  modelData,
  projectData,
  imageData,
  userData,
  projectModelData,
  isAdd,
  activeUser,
  modelTags,
  fileData,
}: {
  modelData: ModelData[]
  projectData: any
  imageData: ImageData[]
  userData: UserData[]
  projectModelData: ProjectModelData[]
  isAdd?: boolean
  activeUser: any
  modelTags: any
  fileData: any
}) => {
  const getUserProjectsCount = (projectData: any): number => {
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

  // Return 5 most recent created_at files
  const getRecentFiles = (modelData: ModelData[]) => {
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

  // Return 5 most recent created_at files
  const getRecentProjects = (projectData: any) => {
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

  return (
    <>
      <Header as='h2' textAlign='center'>
        PrintVault
      </Header>
      <Grid columns={3} padded textAlign='center'>
        <Grid.Column style={{ display: "contents" }}>
          <Card.Group
            centered
            style={{ background: "rgba(0,0,0,0.5) !important" }}
          >
            <Card
              style={{
                background: "black",
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
                background: "black",
                border: "1px solid purple",
                boxShadow: "none",
              }}
              href='/projects'
            >
              <Card.Content>
                <Card.Header> {getUserProjectsCount(projectData)}</Card.Header>
                <Card.Description>Total Projects</Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Column>
      </Grid>
      <Header as='h5'>Recent Models</Header>
      <ModelPage
        modelData={getRecentFiles(modelData)}
        imageData={imageData}
        userData={userData}
        isAdd={isAdd}
        displaySort={false}
      />
      <br />
      <br />
      <Divider />
      <Header as='h5'>Recent Projects</Header>
      <ProjectPage
        modelData={modelData}
        projectData={getRecentProjects(projectData)}
        projectModelData={projectModelData}
        displaySort={false}
        isAdd={isAdd}
        userData={userData}
      />
    </>
  )
}
