import Head from "next/head"
import { Link, useParams } from "react-router-dom"
import { Divider, Header, Image } from "semantic-ui-react"
import { Grid, Table } from "semantic-ui-react"

const truncate = (str: string, max: number, len: number) => {
  return str && str.length > max ? str.substring(0, len) + "..." : str
}

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
  const activeProject = projectData.map((project: any) => {
    return {
      id: project.id,
      files: project.files,
    }
  })

  const FileDisplay = () => {
    return (
      <>
        {fileData
          .filter((file: any) =>
            activeProject.some(
              (project: any) =>
                Array.isArray(project.files) && project.files.includes(file.id)
            )
          )
          .map((file: any) => (
            <div
              key={file.id}
              style={{ marginBottom: "10px", fontSize: "0.8em" }}
            >
              {file.name}
            </div>
          ))}
      </>
    )
  }

  return (
    console.log("ACTIVE PROJECT----------", activeProject),
    console.log("FILEDISPLAY----------", FileDisplay()),
    (
      <>
        <Header as='h2'>Projects</Header>
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

        <Grid columns={2} padded>
          {projectData.map((project: any) => (
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
              <Grid.Column
                width={7}
                textAlign='right'
                style={{ marginTop: "10px" }}
              >
                Files Included:
                <FileDisplay />
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
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
