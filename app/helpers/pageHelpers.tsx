import { Link, useParams } from "react-router-dom"
import { Divider, Header, Image } from "semantic-ui-react"
import { Grid, Table } from "semantic-ui-react"

export const FilePage = ({
  fileData,
  projectData,
  imageData,
}: {
  fileData: any
  projectData: any
  imageData: any
}) => {
  return (
    <>
      <Header as='h2'>Files</Header>
      <FileTable fileData={fileData} />
    </>
  )
}

const truncate = (str: string, max: number, len: number) => {
  return str.length > max ? str.substring(0, len) + "..." : str
}

const FileTable = ({ fileData }: { fileData: any[] }) => (
  <Table celled selectable>
    <Table.Body>
      {fileData.map((file: any) => (
        <Table.Row key={file.id}>
          <Table.Cell>{/* <Image alt='' src={image.href} /> */}</Table.Cell>
          <Table.Cell>
            <Link to={"/files/" + file.id}>{file.name}</Link>
          </Table.Cell>
          <Table.Cell>{truncate(file.description, 100, 100)}</Table.Cell>
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
  // const { id } = useParams<{ id: string }>()
  // const activeProject = projectData.find((project: any) => project.id === id)

  const filesIncluded = (projectData: any) => {
    const projectFiles = projectData?.files
    if (Array.isArray(projectFiles)) {
      return fileData
        .filter((file: any) => projectFiles.includes(file.id))
        .map((file: any) => file)
    }
    return []
  }

  const fileDisplay = () => {
    const files = filesIncluded(projectData)

    return (
      <div>
        {files.map((file: any) => (
          <div key={file.id}>
            <span>{file.name}</span>
            <br />
          </div>
        ))}
      </div>
    )
  }

  return (
    console.log(projectData),
    (
      <>
        <Header as='h2'>Projects</Header>
        {projectData.map((project: any) => (
          <Link to={"/projects/" + project.id} key={project.id}>
            <Grid.Row className='fileRow' style={{}}>
              <Grid.Column width={8} style={{}}>
                <Header as='h4'>{project.name}</Header>
                <Grid.Row></Grid.Row>
                <p>{project.description}</p>
                <p>Includes:</p>
              </Grid.Column>
              <Grid.Column width={4}>{fileDisplay()}</Grid.Column>
            </Grid.Row>
          </Link>
        ))}
      </>
    )
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
}: {
  fileData: any
  projectData: any
  imageData: any
}) => {
  return (
    <>
      <Header as='h2'>Home Page</Header>
      <br />
      <br />
      {FilePage({ fileData, projectData, imageData })}
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
