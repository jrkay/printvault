import {Link } from 'react-router-dom'
import { Divider, Header } from 'semantic-ui-react'
import { Grid, Table } from 'semantic-ui-react'


 export const FilePage = ({ fileData, projectData }: { fileData: any, projectData: any }) => {

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as='h2'>Files</Header>
          </Grid.Column>
        </Grid.Row>
          <FileTable fileData={fileData} />
      </Grid>
    );
}


const FileTable = ({ fileData }: { fileData: any[] }) => (

  <Table celled selectable>
      <Table.Body>
        {fileData.map((file: any) => (
          <Table.Row key={file.id}>
            <Table.Cell>
              <Link to={'/files/' + file.id}>{file.name}</Link>
            </Table.Cell>
            <Table.Cell>{file.description}</Table.Cell>
            <Table.Cell>{file.url}</Table.Cell>
            <Table.Cell>{file.user_id}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
  
  export default FileTable


export const ProjectPage = ({ fileData, projectData }: { fileData: any, projectData: any }) => {

    return (
      <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header as='h2'>Projects</Header>
        </Grid.Column>
      </Grid.Row>
      {projectData.map((project: any) => (
        <Link to={'/projects/' + project.id} key={project.id}>
        <Grid.Row className='fileRow' style={{ }}>
          <Grid.Column width={16}>
            <Header as='h4'>{project.name}</Header>
            <span>{project.description}</span><br />
            <span>{project.user_id}</span>
          </Grid.Column>
        </Grid.Row>
        </Link>
      ))}
    </Grid>
    );
}
  

export const AccountPage = ({ data, userData }: { data: any, userData: any }) => {
  const [activeUser] = userData;
  
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <div>
           <Header as='h3'>Name: </Header>
           {activeUser?.name}
          </div>
          <br />
          <div>
            <Header as='h3'>Email: </Header>
           {activeUser?.email}
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}


export const ToolsPage = ({ fileData, projectData }: { fileData: any, projectData: any }) => {

  return (
      <>
          <Header as='h2'>Tools Details</Header>
          <span>Tools Name</span><br />
      </>
  );
}



export const HomePage = ({ fileData, projectData }: { fileData: any, projectData: any }) => {

  return (
      <>
          <Header as='h2'>Home Page</Header><br /><br />
          {FilePage({ fileData, projectData })}<br /><br />
          <Divider />
          {ProjectPage({ fileData, projectData })}<br /><br />
          <Divider />
          {ToolsPage({ fileData, projectData })}
      </>
  );
}