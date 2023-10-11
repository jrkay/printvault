import { Link } from "react-router-dom"
import { Divider, Header } from "semantic-ui-react"
import { Grid, Table } from "semantic-ui-react"

export const FilePage = ({
  fileData,
  projectData,
}: {
  fileData: any
  projectData: any
}) => {
  return (
    <>
      <Header as='h2'>Files</Header>
      <FileTable fileData={fileData} />
    </>
  )
}

const FileTable = ({ fileData }: { fileData: any[] }) => (
  <Table celled selectable>
    <Table.Body>
      {fileData.map((file: any) => (
        <Table.Row key={file.id}>
          <Table.Cell>
            <Link to={"/files/" + file.id}>{file.name}</Link>
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
      {projectData.map((project: any) => (
        <Link to={"/projects/" + project.id} key={project.id}>
          <Grid.Row className='fileRow' style={{}}>
            <Grid.Column width={16}>
              <Header as='h4'>{project.name}</Header>
              <span>{project.description}</span>
              <br />
              <span>{project.user_id}</span>
            </Grid.Column>
          </Grid.Row>
        </Link>
      ))}
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
}: {
  fileData: any
  projectData: any
}) => {
  return (
    <>
      <Header as='h2'>Home Page</Header>
      <br />
      <br />
      {FilePage({ fileData, projectData })}
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
