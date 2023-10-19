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
  deleteProjectFilesClient,
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

  let existingProjectFileIds: string[] = projectFileData
    .filter((row: any) => row.project_id === activeProject.id)
    .map((row: any) => row.file_id)

  let selectedIds: string[] = []
  const [projectId, setProjectId] = useState<string>(activeProject?.id || "")
  const [name, setName] = useState<string>(activeProject?.name || "")
  const [description, setDescription] = useState<string>(
    activeProject?.description || ""
  )
  const [startDate, setStartDate] = useState<string>(activeProject?.tags || "")
  const [endDate, setEndDate] = useState<string>(activeProject?.license || "")
  const [status, setStatus] = useState<string>(activeProject?.url || "")
  const [comments, setComments] = useState<string>(
    activeProject?.comments || ""
  )
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (activeProject) {
      setProjectId(activeProject.id)
      setName(activeProject.name || "")
      setDescription(activeProject.description || "")
      setStartDate(activeProject.start_date || "")
      setEndDate(activeProject.end_date || "")
      setStatus(activeProject.status || "")
      setComments(activeProject.comments || "")
    }

    addExistingProjectFileIds()

    toggleSelectedId(selectedIds.map((id: any) => id).toString())
    console.log("existingProjectFileIds--------------", existingProjectFileIds)
    console.log("selectedIds - Toggle Selected Ids--------------", selectedIds)
  }, [])

  const addExistingProjectFileIds = () => {
    selectedIds = [...existingProjectFileIds]
  }

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

    await updateProjectClient({
      id,
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
      comments,
    })

    await Promise.all(
      selectedIds.map((id) =>
        addProjectFilesClient({
          id: null,
          fileId: id,
          projectId: projectId,
        })
      )
    )

    await Promise.all(
      getDeletedFiles().map((id) =>
        deleteProjectFilesClient({
          id,
        })
      )
    )

    setName("")
    setDescription("")
    setStartDate("")
    setEndDate("")
    setComments("")
    setStatus("")
    //    setSelectedIds([])

    // navigate("/projects/" + id)
    // window.location.reload()
  }

  // todo: this is probably broken -> adding all existingProjectFileIds
  // Return array of existingProjectFileIds that are not present in selectedIds// Return array of existingProjectFileIds that are not present in selectedIds
  const getDeletedFiles = () => {
    const deletedFiles = existingProjectFileIds.filter(
      (id) => !selectedIds.includes(id)
    )
    console.log("deletedFiles", deletedFiles)
    return deletedFiles
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
              <Table.Row key={file.id}>
                <Table.Cell>
                  <Checkbox
                    //defaultChecked={initialChecked(file.id)}
                    defaultChecked={existingProjectFileIds.includes(file.id)}
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
  }

  function toggleSelectedId(selectedId: string) {
    if (selectedIds.includes(selectedId)) {
      selectedIds = selectedIds.filter((id: string) => id !== selectedId)
    } else {
      selectedIds.push(selectedId)
    }
    setChecked((prevChecked) => !prevChecked)
  }

  return (
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
        {/* Hide if not 'Complete' */}
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
