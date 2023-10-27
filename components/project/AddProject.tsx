import React, { useState, useCallback, useEffect } from "react"
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
  addProjectModelsClient,
} from "../../app/helpers/updateHelpers"
import { Dropdown, DropdownProps } from "semantic-ui-react"
import { truncate } from "@/app/helpers/pageHelpers"

const statusOptions = [
  { key: "1", text: "Not Started", value: "Not Started" },
  { key: "2", text: "In Progress", value: "In Progress" },
  { key: "3", text: "Paused", value: "Paused" },
  { key: "4", text: "Complete", value: "Complete" },
]

const AddProject = ({
  userData,
  modelData,
}: {
  userData: any
  modelData: any
}) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [status, setStatus] = useState("")
  const [comments, setComments] = useState("")
  const [userId, setUserId] = useState("")
  const [projectId, setProjectId] = useState("")

  const activeUser = userData.user
  let selectedIds: string[] = []

  useEffect(() => {
    setProjectId(crypto.randomUUID())
  }, [])

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
    setUserId(userData[0]?.id || null)

    e.preventDefault()

    await addProjectClient({
      id: projectId,
      name,
      description,
      startDate,
      status,
      comments,
      userId: userId,
    })

    for (let i = 0; i < selectedIds.length; i++) {
      await addProjectModelsClient({
        id: crypto.randomUUID(),
        modelId: selectedIds[i],
        projectId: projectId,
      })
    }

    setName("")
    setDescription("")
    setStartDate("")
    setComments("")
    setStatus("")

    //    window.location.reload()
  }

  const projectModelsTable = (modelData: any) => {
    if (modelData) {
      return (
        <Table selectable inverted>
          <Table.Header>
            <Table.Row></Table.Row>
          </Table.Header>
          <Table.Body>
            {modelData.map((model: any) => (
              <Table.Row key={model.id}>
                <Table.Cell>
                  <Checkbox onChange={() => toggleSelectedId(model.id)} />
                </Table.Cell>
                <Table.Cell>{model.name}</Table.Cell>
                <Table.Cell>{truncate(model.description, 100, 300)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    }
    return <></>

    function toggleSelectedId(selectedId: string) {
      if (selectedIds.includes(selectedId)) {
        selectedIds = selectedIds.filter((id: string) => id !== selectedId)
      } else {
        selectedIds = selectedIds.concat(selectedId)
      }
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Header as='h4'>Project Name</Header>
        <Form.Input
          id='form-name'
          name='name'
          value={name}
          required
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
          required
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
        <Header as='h4'>Comments</Header>
        <Form.Input
          id='form-comments'
          name='comments'
          value={comments}
          onChange={(e) =>
            handleChange(e, { name: "comments", value: e.target.value })
          }
        />
        <Header as='h4'>Project Models</Header>
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
          {projectModelsTable(modelData)} <br />
        </Container>
        <Form.Button type='submit'>Add New Project</Form.Button>
      </Form>
    </>
  )
}

export default AddProject
