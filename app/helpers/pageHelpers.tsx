import React from "react"
import { Grid, Divider, Header } from "semantic-ui-react"
import { ProjectList } from "../../components/project/projectListPage.tsx"
import { FilesList } from "../../components/file/fileListPage.tsx"

export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}

export const FilePage = ({
  fileData,
  imageData,
  userData,
  isAdd,
  activeUser,
}: {
  fileData: any
  imageData: any
  userData: any
  isAdd?: boolean
  activeUser: any
}) => {
  return (
    <>
      <Header as='h2'>Files</Header>
      <FilesList
        fileData={fileData}
        imageData={imageData}
        userData={userData}
        isAdd={isAdd}
        activeUser={activeUser}
      />
    </>
  )
}

export const ProjectPage = ({
  fileData,
  projectData,
  projectFileData,
}: {
  fileData: any
  projectData: any
  projectFileData: any
}) => {
  return (
    <>
      <Header as='h2'>Projects</Header>
      <ProjectList
        fileData={fileData}
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
  fileData,
  projectData,
}: {
  fileData: any
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
  fileData,
  projectData,
  imageData,
  userData,
  projectFileData,
  isAdd,
  activeUser,
}: {
  fileData: any
  projectData: any
  imageData: any
  userData: any
  projectFileData: any
  isAdd?: boolean
  activeUser: any
}) => {
  const getUserProjectsCount = (projectData: any): number => {
    if (!projectData) {
      return 0
    }

    return projectData.length
  }

  const getUserFilesCount = (fileData: any): number => {
    if (!fileData) {
      return 0
    }

    return fileData.length
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
          {getUserFilesCount(fileData)}
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
        fileData={fileData}
        imageData={imageData}
        userData={userData}
        isAdd={isAdd}
        activeUser={activeUser}
      />
      <br />
      <br />
      <Divider />
      <ProjectPage
        fileData={fileData}
        projectData={projectData}
        projectFileData={projectFileData}
      />
      <br />
      <br />
      <Divider />
      <ToolsPage fileData={fileData} projectData={projectData} />
    </>
  )
}
