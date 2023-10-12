import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Grid, Header, Image, Input, Form } from "semantic-ui-react"
import { Link } from "react-router-dom"

export const FileDetailFields = ({
  fileData,
  projectData,
  jobData,
  imageData,
  isEdit,
}: {
  fileData: any
  projectData: any
  jobData: any
  imageData: any
  isEdit?: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeFile = fileData.find((file: any) => file.id === id)
  const activeImage = imageData.find(
    (image: any) => image.file_id === activeFile.id
  )

  if (isEdit) {
    return (
      <>
        <span>This will be a form</span>
      </>
    )
  }

  // Maps images from imageData to an Image component
  // const imageDisplay = () => {
  //   return (
  //     Array.isArray(activeImage) &&
  //     imageData.map((image: any) => (
  //       <div key={image.id}>
  //         <Image alt='' src={image.href} />
  //         <p>{image.file_id}</p>
  //       </div>
  //     ))
  //   )
  // }

  return (
    console.log(activeImage),
    (
      <>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={8}>
              <Image alt='' src={activeImage?.href ? activeImage.href : ""} />
              {/* <Image alt='' src='https://bit.ly/placeholder-img' /> */}
            </Grid.Column>
            <Grid.Column width={8}>
              <div>
                <Header as='h3'>{activeFile.name}</Header>
                <p>
                  Tags:
                  <br /> (
                  {activeFile.tags ? activeFile.tags.join(", ") : "None"})
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
            <p>
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
            </p>
          </Grid.Row>
        </Grid>
      </>
    )
  )
}

export const ProjectDetailFields = ({
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

  const [name, setName] = useState(activeProject.name)
  const [description, setDescription] = useState(activeProject.description)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  if (isEdit) {
    return (
      <>
        <Form>
          <Header as='h2'>Project Details</Header>
          <Form.Field>
            <span>Project Name</span>
            <Input value={name} onChange={handleChangeName} />
          </Form.Field>
          <Form.Field>
            <span>Project Description</span>
            <Input value={description} onChange={handleChangeDescription} />
          </Form.Field>
        </Form>
      </>
    )
  }

  return (
    console.log("ACTIVE PROJECT----------", activeProject.files),
    (
      <>
        <Grid padded>
          <Grid.Row>
            <Grid.Column width={16}>
              <div>
                <Header as='h3'>{activeProject.name}</Header>
                <p>
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
                            {/* <Link to={"/files/" + file.id}>{file.name}</Link> */}
                          </div>
                        ))
                    : "None"}
                </p>
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
