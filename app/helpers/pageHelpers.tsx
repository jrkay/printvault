import React from "react"
import { Grid, Divider, Header } from "semantic-ui-react"
import { ProjectList } from "../../components/project/projectListPage.tsx"
import { FilesList } from "../../components/file/fileListPage.tsx"

export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}

export const FilePage = ({
  modelData,
  imageData,
  userData,
  isAdd,
  activeUser,
  modelTags,
}: {
  modelData: any
  imageData: any
  userData: any
  isAdd?: boolean
  activeUser: any
  modelTags: any
}) => {
  return (
    <>
      <Header as='h2'>Files</Header>
      <FilesList
        modelData={modelData}
        imageData={imageData}
        userData={userData}
        isAdd={isAdd}
        activeUser={activeUser}
        modelTags={modelTags}
      />
    </>
  )
}

export const ProjectPage = ({
  modelData,
  projectData,
  projectFileData,
}: {
  modelData: any
  projectData: any
  projectFileData: any
}) => {
  return (
    <>
      <Header as='h2'>Projects</Header>
      <ProjectList
        modelData={modelData}
        projectData={projectData}
        projectFileData={projectFileData}
      />
    </>
  )
}

export const AccountPage = ({
  userData,
  activeUser,
}: {
  userData: any
  activeUser: any
}) => {
  return (
    <>
      <Header as='h2'>Account Details</Header>
      <div>
        <Header as='h4'>Name: </Header>
        {/* {activeUser?.name} */}
      </div>
      <br />
      <div>
        <Header as='h4'>Email: </Header>
        {activeUser?.user.email}
      </div>
    </>
  )
}

export const ToolsPage = ({
  modelData,
  projectData,
}: {
  modelData: any
  projectData: any
}) => {
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
  projectFileData,
  isAdd,
  activeUser,
  modelTags,
}: {
  modelData: any
  projectData: any
  imageData: any
  userData: any
  projectFileData: any
  isAdd?: boolean
  activeUser: any
  modelTags: any
}) => {
  const getUserProjectsCount = (projectData: any): number => {
    if (!projectData) {
      return 0
    }

    return projectData.length
  }

  const getUserFilesCount = (modelData: any): number => {
    if (!modelData) {
      return 0
    }

    return modelData.length
  }

  return (
    <>
      <Header as='h2'>Home Page</Header>
      <Grid columns={3} padded textAlign='center'>
        <Grid.Column>
          Total Projects
          <br />
          {getUserProjectsCount(projectData)}
          <br />
        </Grid.Column>
        <Grid.Column>
          Total Files
          <br />
          {getUserFilesCount(modelData)}
          <br />
          <br />
        </Grid.Column>
        <Grid.Column>
          Total Tools
          <br />
          ##
          <br />
        </Grid.Column>
      </Grid>
      <FilePage
        modelData={modelData}
        imageData={imageData}
        userData={userData}
        isAdd={isAdd}
        activeUser={activeUser}
        modelTags={modelTags}
      />
      <br />
      <br />
      <Divider />
      <ProjectPage
        modelData={modelData}
        projectData={projectData}
        projectFileData={projectFileData}
      />
      <br />
      <br />
      <Divider />
      <ToolsPage modelData={modelData} projectData={projectData} />
    </>
  )
}
