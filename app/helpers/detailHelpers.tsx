import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Grid, Header, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { EditFile } from "../../components/file/EditFile.tsx"
import AddFile from "../../components/file/AddFile.tsx"
import AddProject from "../../components/project/AddProject.tsx"
import { EditProject } from "../../components/project/EditProject.tsx"

export const FileDetailFields = ({
  fileData,
  projectData,
  jobData,
  imageData,
  userData,
  isEdit,
  isAdd,
}: {
  fileData: any
  projectData: any
  jobData: any
  imageData: any
  userData: any
  isEdit?: any
  isAdd?: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeFile = fileData.find((file: any) => file.id === id)

  const activeImage = imageData.find(
    (image: any) => image.file_id === activeFile.id
  )

  if (isEdit) {
    return <EditFile fileData={fileData} />
  }
  if (isAdd) {
    return <AddFile userData={userData} />
  }

  return (
    <>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={8}>
            <Image alt='' src={activeImage?.href ? activeImage.href : ""} />
          </Grid.Column>
          <Grid.Column width={8}>
            <div>
              <Header as='h3'>{activeFile.name}</Header>
              <p>
                Tags:
                <br /> {activeFile.tags ? activeFile.tags : "No Tags"}
              </p>

              <Button>Download</Button>
            </div>
          </Grid.Column>
          <Grid.Column width={1}>
            <></>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <p>
            Description: <br />
            {activeFile.description}
          </p>
          <div>
            Print Jobs with this file: <br />
            {jobData
              .filter((job: any) => job.file_id === activeFile.id)
              .map((job: any) => (
                <div key={job.id}>
                  Date: <span>{job.created_at}</span>
                  <br />
                  Duration: <span>{job.duration}</span>
                  <br />
                  Printer: <span>{job.printer}</span> |{" "}
                  <span>{job.material_type}</span>
                  <br />
                  Status: <span>{job.status}</span>
                  <br />
                </div>
              ))}
          </div>
        </Grid.Row>
      </Grid>
    </>
  )
}

export const ProjectDetailFields = ({
  fileData,
  projectData,
  userData,
  isEdit,
  isAdd,
}: {
  fileData: any
  projectData: any
  userData: any
  isEdit?: any
  isAdd?: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((file: any) => file.id === id)

  const [name, setName] = useState(activeProject?.name)
  const [description, setDescription] = useState(activeProject?.description)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  if (isEdit) {
    return <EditProject projectData={projectData} />
  }
  if (isAdd) {
    return <AddProject userData={userData} />
  }

  return (
    <>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <div>
              <Header as='h3'>{activeProject.name}</Header>
              <div>
                Files:
                <br />
                {activeProject.files
                  ? fileData
                      .filter((file: any) =>
                        activeProject.files.includes(file.id)
                      )
                      .map((file: any) => (
                        <div key={file.id} style={{ marginTop: "10px" }}>
                          {file.name}
                          <br />
                          <Link to={"/files/" + file.id}>{file.name}</Link>
                        </div>
                      ))
                  : "None"}
              </div>
            </div>
          </Grid.Column>
          <Grid.Column width={1}>
            <></>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <p>
            Description: <br />
            {activeProject.description}
          </p>
        </Grid.Row>
      </Grid>
    </>
  )
}

export const ToolsDetailFields = ({
  fileData,
  projectData,
  isEdit,
}: {
  fileData: any
  projectData: any
  isEdit?: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((file: any) => file.id === id)

  return (
    <>
      <Header as='h2'>Tools Details</Header>
      <span>Tools Name</span>
      <br />
      {activeProject.name}
      <br />
      <span>Tools Description</span>
      <br />
      {activeProject.description}
    </>
  )
}

export const AccountDetailFields = ({
  fileData,
  projectData,
  isEdit,
}: {
  fileData: any
  projectData: any
  isEdit?: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((file: any) => file.id === id)

  return (
    <>
      <Header as='h2'>Account Details</Header>
      <span>Account Name</span>
      <br />
      {activeProject.name}
      <br />
      <span>Account Description</span>
      <br />
      {activeProject.description}
    </>
  )
}
