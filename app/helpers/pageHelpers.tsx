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
}: {
  fileData: any
  imageData: any
  userData: any
  isAdd?: any
}) => {
  return (
    <>
      <Header as='h2'>Files</Header>
      <FilesList
        fileData={fileData}
        imageData={imageData}
        userData={userData}
        isAdd={isAdd}
      />
    </>
  )
}

export const ProjectPage = ({
  fileData,
  projectData,
}: {
  fileData: any
  projectData: any
}) => {
  return (
    <>
      <Header as='h2'>Projects</Header>
      <ProjectList fileData={fileData} projectData={projectData} />
    </>
  )
}

export const AccountPage = ({
  data,
  userData,
}: {
  data: any
  userData: any
}) => {
  const [activeUser] = userData

  return (
    <>
      <Header as='h2'>Account Details</Header>
      <div>
        <Header as='h4'>Name: </Header>
        {activeUser?.name}
      </div>
      <br />
      <div>
        <Header as='h4'>Email: </Header>
        {activeUser?.email}
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
  isAdd,
}: {
  fileData: any
  projectData: any
  imageData: any
  userData: any
  isAdd?: any
}) => {
  return (
    <>
      <Header as='h2'>Home Page</Header>
      <Grid columns={3} padded textAlign='center'>
        <Grid.Column>
          Total Projects
          <br />
          ##
          <br />
        </Grid.Column>
        <Grid.Column>
          Total Files
          <br />
          ##
          <br />
        </Grid.Column>
        <Grid.Column>
          Total Tools
          <br />
          ##
          <br />
        </Grid.Column>
      </Grid>
      {FilePage({ fileData, imageData, userData, isAdd })}
      <br />
      <br />
      <Divider />
      {ProjectPage({ fileData, projectData })}
      <br />
      <br />
      <Divider />
      {ToolsPage({ fileData, projectData })}
    </>
  )
}
