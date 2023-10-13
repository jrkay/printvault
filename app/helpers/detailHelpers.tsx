import { useState } from "react"
import { useParams } from "react-router-dom"
import {
  Button,
  Grid,
  Header,
  Image,
  Input,
  Form,
  TextArea,
} from "semantic-ui-react"
import { updateFileClient } from "./updateHelpers"

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

  const EditForm = () => {
    const [name, setName] = useState(activeFile.name)
    const [description, setDescription] = useState(activeFile.description)
    const [submittedName, setSubmittedName] = useState("")
    const [submittedDescription, setSubmittedDescription] = useState("")

    const licenseOptions = [
      {
        key: "1",
        text: "Creative Commons - Public Domain",
        value: "Creative Commons - Public Domain",
      },
      {
        key: "2",
        text: "Creative Commons - Attribution",
        value: "Creative Commons - Attribution",
      },
      {
        key: "3",
        text: "Creative Commons - Attribution-ShareAlike",
        value: "Creative Commons - Attribution-ShareAlike",
      },
      {
        key: "4",
        text: "Creative Commons - Attribution-NoDerivs",
        value: "Creative Commons - Attribution-NoDerivs",
      },
      {
        key: "5",
        text: "Creative Commons - Attribution-NonCommercial",
        value: "Creative Commons - Attribution-NonCommercial",
      },
      {
        key: "6",
        text: "Creative Commons - Attribution-NonCommercial-NoDerivs",
        value: "Creative Commons - Attribution-NonCommercial-NoDerivs",
      },
      {
        key: "7",
        text: "Creative Commons - Attribution-NonCommercial-ShareAlike",
        value: "Creative Commons - Attribution-NonCommercial-ShareAlike",
      },
      {
        key: "8",
        text: "GNU General Public License v2.0",
        value: "GNU General Public License v2.0",
      },
      {
        key: "9",
        text: "GNU Lesser General Public License v2.1",
        value: "GNU Lesser General Public License v2.1",
      },
    ]

    const typeOptions = [
      { key: "1", text: "FDM & Resin", value: "FDM & Resin" },
      { key: "2", text: "Resin", value: "Resin" },
      { key: "3", text: "FDM", value: "FDM" },
    ]

    const handleChange = (
      e: any,
      { name, value }: { name: string; value: string }
    ) => {
      if (name === "name") {
        setName(value)
      } else if (name === "description") {
        setDescription(value)
      }
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault()

      setSubmittedName(name)
      setSubmittedDescription(description)

      // Call the updateFileClient function here
      await updateFileClient({ id: activeFile.id, name, description })
    }

    return (
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            label='File Name'
            id='form-name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Field
            id='form-description'
            name='description'
            control={TextArea}
            label='Description'
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
          {/* <Form.Group widths={2}>
            <Form.Select
              fluid
              label='Type'
              options={typeOptions}
              placeholder='Print Type'
            />
            <Form.Input
              label='File Tags'
              id='form-tag'
              name='tag'
              value={activeFile.tags}
              onChange={(e, { name, value }) =>
                handleChange(e, { name, value })
              }
            />
          </Form.Group>
          <Form.Select
            fluid
            label='License'
            options={licenseOptions}
            placeholder='License'
          /> */}
          <Form.Button type='submit'>Update</Form.Button>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, description }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>
          {JSON.stringify({ submittedName, submittedDescription }, null, 2)}
        </pre>
      </>
    )
  }

  if (isEdit) {
    return <EditForm />
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
