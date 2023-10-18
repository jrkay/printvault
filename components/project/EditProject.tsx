import React, { useState, useCallback, useEffect } from "react"
import {
  Header,
  Form,
  TextArea,
  Table,
  Checkbox,
  Container,
} from "semantic-ui-react"
import {
  updateProjectClient,
  addProjectFilesClient,
} from "../../app/helpers/updateHelpers"
import { useParams } from "react-router-dom"
import { Dropdown, DropdownProps } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"
import { truncate } from "../../app/helpers/pageHelpers"

const statusOptions = [
  { key: "1", text: "Not Started", value: "Not Started" },
  { key: "2", text: "In Progress", value: "In Progress" },
  { key: "3", text: "Paused", value: "Paused" },
  { key: "4", text: "Complete", value: "Complete" },
]

export const EditProject = ({
  projectData,
  fileData,
  projectFileData,
}: {
  projectData: any
  fileData: any
  projectFileData: any
}) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((file: any) => file.id === id)
  const navigate = useNavigate()

  // Ids from database that have been previously added
  let previousIds: string[] = projectFileData
    .filter((row: any) => row.project_id === activeProject.id)
    .map((row: any) => row.file_id)

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [name, setName] = useState(activeProject?.name)
  const [description, setDescription] = useState(activeProject?.description)
  const [startDate, setStartDate] = useState(activeProject?.tags)
  const [endDate, setEndDate] = useState(activeProject?.license)
  const [status, setStatus] = useState(activeProject?.url)
  const [comments, setComments] = useState(activeProject?.comments)
  const [submittedData, setSubmittedData] = useState({
    submittedName: "",
    submittedDescription: "",
    submittedStartDate: "",
    submittedEndDate: "",
    submittedStatus: "",
    submittedComments: "",
  })

  useEffect(() => {
    if (activeProject) {
      if (activeProject.name) {
        setName(activeProject.name)
      }
      if (activeProject.description) {
        setDescription(activeProject.description)
      }
      if (activeProject.start_date) {
        setStartDate(activeProject.start_date)
      }
      if (activeProject.end_date) {
        setEndDate(activeProject.end_date)
      }
      if (activeProject.status) {
        setStatus(activeProject.status)
      }
      if (activeProject.comments) {
        setComments(activeProject.comments)
      }
    }

    console.log("activeProject Id------------", activeProject.Id)
    toggleSelectedId(
      [...selectedIds, ...previousIds].map((id: any) => id).toString()
    )
  }, [])

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
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
    e.preventDefault()
    setSubmittedData({
      submittedName: name ?? "",
      submittedDescription: description ?? "",
      submittedStartDate: startDate ?? "",
      submittedEndDate: endDate ?? "",
      submittedStatus: status ?? "",
      submittedComments: comments ?? "",
    })

    await updateProjectClient({
      // id: activeProject.id,
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
      comments,
    })

    for (const selectedId of selectedIds) {
      await addProjectFilesClient({
        id: null,
        fileId: selectedIds[0].toString(),
        projectId: activeProject.Id,
      })
    }

    setName("")
    setDescription("")
    setStartDate("")
    setEndDate("")
    setComments("")
    setStatus("")

    // navigate("/projects/" + id)
    // window.location.reload()
  }

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
                  <Checkbox
                    checked={selectedIds.includes(file.id)}
                    onChange={() => toggleSelectedId(file.id)}
                  />
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

    function handleFilesTableClick(id: string) {
      console.log("id", id)
      console.log(
        "selectedIds",
        selectedIds.map((id: any) => id)
      )
    }
  }

  function toggleSelectedId(selectedId: string) {
    if (selectedIds.includes(selectedId)) {
      setSelectedIds(selectedIds.filter((id) => id !== selectedId))
    } else {
      setSelectedIds([...selectedIds, selectedId])
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Header as='h4'>File Name</Header>
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
        <Header as='h4'>Project Status</Header>
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
        {/* Hide if not 'Complete */}
        <Header as='h4'>End Date</Header>
        <Form.Input
          id='form-enddate'
          name='enddate'
          value={endDate}
          onChange={(e) =>
            handleChange(e, { name: "end_date", value: e.target.value })
          }
        />
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
        <Form.Button type='submit'>Update Project</Form.Button>
      </Form>
    </>
  )
}
