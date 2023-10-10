import {Link, useParams } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'

export const BackLink = () => (
    <Link to={'/'}>Back</Link>
  );


 export const FileDetailFields = ({ fileData, projectData }: { fileData: any, projectData: any }) => {
    const { id } = useParams<{ id: string }>();
    const activeFile = fileData.find((file: any) => file.id === id);

    return (
        <>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={8}>
            <span>Image 213</span>
          </Grid.Column>
          <Grid.Column width={8}>
            <div>
              <p>{activeFile.name}</p>
              <p>{activeFile.url}</p>      
              <p>{activeFile.created_at}</p>
              <p>{activeFile.type}</p>       
            </div>
          </Grid.Column>
          <Grid.Column width={1}>
            <></>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <p>{activeFile.description}</p>
        </Grid.Row>
      </Grid>
        </>
    );
}


export const ProjectDetailFields = ({ fileData, projectData }: { fileData: any, projectData: any }) => {
    const { id } = useParams<{ id: string }>();
    const activeProject = projectData.find((file: any) => file.id === id);

    return (
        <>
            <Header as='h2'>Project Details</Header>
            <span>Project Name</span><br />
            {activeProject.name}<br />
            <span>Project Description</span><br />
            {activeProject.description}
        </>
    );
}
  

export const ToolsDetailFields = ({ fileData, projectData }: { fileData: any, projectData: any }) => {
  const { id } = useParams<{ id: string }>();
  const activeProject = projectData.find((file: any) => file.id === id);

  return (
      <>
          <Header as='h2'>ToolS Details 123123123</Header>
          <span>Project Name</span><br />
          {activeProject.name}<br />
          <span>Project Description</span><br />
          {activeProject.description}
      </>
  );
}


export const AccountDetailFields = ({ fileData, projectData }: { fileData: any, projectData: any }) => {
  const { id } = useParams<{ id: string }>();
  const activeProject = projectData.find((file: any) => file.id === id);

  return (
      <>
          <Header as='h2'>Project Details</Header>
          <span>Project Name</span><br />
          {activeProject.name}<br />
          <span>Project Description</span><br />
          {activeProject.description}
      </>
  );
}