import React from "react"
import { Grid, Divider, Header } from "semantic-ui-react"
import { ProjectList } from "../../components/project/projectListPage.tsx"
import { ModelsList } from "../../components/model/modelListPage.tsx"
import { ModelData, ProjectModelData, UserData } from "../AppRoutesProps.tsx"

export const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}

export const ModelPage = ({
  modelData,
  imageData,
  userData,
  isAdd,
  activeUser,
  modelTags,
}: {
  modelData: ModelData[]
  imageData: ImageData[]
  userData: UserData[]
  isAdd?: boolean
  activeUser: any
  modelTags: any
}) => {
  return (
    <>
      <Header as='h2'>Models</Header>
      <ModelsList
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
  projectModelData,
}: {
  modelData: ModelData[]
  projectData: any
  projectModelData: ProjectModelData[]
}) => {
  return (
    <>
      <Header as='h2'>Projects</Header>
      <ProjectList
        modelData={modelData}
        projectData={projectData}
        projectModelData={projectModelData}
      />
    </>
  )
}

export const AccountPage = ({
  userData,
  activeUser,
}: {
  userData: UserData[]
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
  modelData: ModelData[]
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
  projectModelData,
  isAdd,
  activeUser,
  modelTags,
}: {
  modelData: ModelData[]
  projectData: any
  imageData: ImageData[]
  userData: UserData[]
  projectModelData: ProjectModelData[]
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

  const getUserModelsCount = (modelData: any): number => {
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
          Total Models
          <br />
          {getUserModelsCount(modelData)}
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
      <ModelPage
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
        projectModelData={projectModelData}
      />
      <br />
      <br />
      <Divider />
      <ToolsPage modelData={modelData} projectData={projectData} />
    </>
  )
}
