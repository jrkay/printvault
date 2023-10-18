import React, { useState, useCallback } from "react"
import {
  Header,
  Form,
  TextArea,
  Table,
  Container,
  Checkbox,
} from "semantic-ui-react"
import {
  addProjectClient,
  addProjectFilesClient,
} from "../../app/helpers/updateHelpers"
import { Dropdown, DropdownProps } from "semantic-ui-react"
import { truncate } from "@/app/helpers/pageHelpers"
import { getProjects } from "../../app/helpers/helpers"

const statusOptions = [
  { key: "1", text: "Not Started", value: "Not Started" },
  { key: "2", text: "In Progress", value: "In Progress" },
  { key: "3", text: "Paused", value: "Paused" },
  { key: "4", text: "Complete", value: "Complete" },
]

const AddProject = ({
  userData,
  fileData,
}: {
  userData: any
  fileData: any
}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [status, setStatus] = useState("")
  const [comments, setComments] = useState("")
  const [userId, setUserId] = useState("")
  const [projectFiles, setProjectFiles] = useState([])
  const [fileId, setFileId] = useState("")
  const [projectId, setFileUrl] = useState("")

  const activeUser = userData[0].id

  const [submittedData, setSubmittedData] = useState({
    submittedName: "",
    submittedDescription: "",
    submittedStartDate: "",
    submittedEndDate: "",
    submittedStatus: "",
    submittedComments: "",
    submittedUserId: "",
  })

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: any }) => {
      switch (name) {
        case "name":
          setName(value)
          break
        case "description":
          setDescription(value)
          break
        case "start_date":
          setStartDate(value)
          break
        case "end_date":
          setEndDate(value)
          break
        case "status":
          setStatus(value)
          break
        case "comments":
          setComments(value)
          break
        default:
          break
      }
    },
    []
  )

  const handleSubmit = async (e: any) => {
    setUserId(activeUser || "")

    e.preventDefault()
    setSubmittedData({
      submittedName: name ?? "",
      submittedDescription: description ?? "",
      submittedStartDate: startDate ?? "",
      submittedEndDate: endDate ?? "",
      submittedStatus: status ?? "",
      submittedComments: comments ?? "",
      submittedUserId: activeUser,
    })

    // Get new project id after submitting form,
    // and send to addProjectFilesClient
    const newProject = await addProjectClient({
      id: null,
      name,
      description,
      startDate,
      endDate,
      status,
      comments,
      userId: activeUser,
    })

    // Get the project details
    // const projectDetails = await getProjects()

    // if (projectDetails) {
    //   // Sort the project details based on creation date in descending order
    //   projectDetails?.sort(
    //     (a, b) =>
    //       new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    //   )
    // }

    // // Access the ID of the newest created project

    // const newProjectId = projectDetails![0].id

    // // Use the new project ID as needed
    // await addProjectFilesClient({
    //   id: null,
    //   fileId,
    //   projectId: newProjectId,
    // })

    setName("")
    setDescription("")
    setStartDate("")
    setEndDate("")
    setComments("")
    setStatus("")
    setProjectFiles([])

    // window.location.reload()
  }

  const handleFilesTableClick = (id: string) => {
    console.log("id", id)
  }

  // return a Table of fileData.map.
  const projectFilesTable = (fileData: any) => {
    if (fileData) {
      return (
        <Table selectable inverted>
          <Table.Header>
            <Table.Row>{/* Add table header columns here */}</Table.Row>
          </Table.Header>
          <Table.Body>
            {fileData.map((file: any) => (
              <Table.Row
                key={file.id}
                onClick={() => {
                  handleFilesTableClick(file.id)
                }}
              >
                <Table.Cell>
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>{file.name}</Table.Cell>
                <Table.Cell>{truncate(file.description, 100, 300)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    }
    return <></>
  }

  return (
    console.log("fileData-----------------", fileData),
    (
      <>
        <Form onSubmit={handleSubmit}>
          <Header as='h4'>Project Name</Header>
          <Form.Input
            id='form-name'
            name='name'
            value={name}
            onChange={(e) =>
              handleChange(e, { name: "name", value: e.target.value })
            }
          />
          <Header as='h4'>Description</Header>
          <Form.Field
            id='form-description'
            name='description'
            control={TextArea}
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
          />
          <Header as='h4'>Status</Header>
          <Dropdown
            selection
            name='form-status'
            options={statusOptions}
            placeholder={status}
            onChange={(e: any, { value }: DropdownProps) =>
              setStatus(value as string)
            }
            value={status}
          />
          <Header as='h4'>Start Date</Header>
          <Form.Input
            id='form-startdate'
            name='startdate'
            value={startDate}
            onChange={(e) =>
              handleChange(e, { name: "start_date", value: e.target.value })
            }
          />
          <Header as='h4'>End Date</Header>
          <Form.Input
            id='form-enddate'
            name='enddate'
            value={endDate}
            onChange={(e) =>
              handleChange(e, { name: "end_date", value: e.target.value })
            }
          />
          <Header as='h4'>Comments</Header>
          <Form.Input
            id='form-comments'
            name='comments'
            value={comments}
            onChange={(e) =>
              handleChange(e, { name: "comments", value: e.target.value })
            }
          />
          <Header as='h4'>Project Files</Header>
          <Container
            bordered
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              border: "1px solid rgb(255,255,255,.15",
              height: "250px",
              overflow: "scroll",
            }}
          >
            {projectFilesTable(fileData)} <br />
          </Container>
          <Form.Button type='submit'>Add New Project</Form.Button>
        </Form>
      </>
    )
  )
}

export default AddProject
