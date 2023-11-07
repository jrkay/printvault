import React, { useState, useCallback, useEffect } from "react"
import {
  Header,
  Form,
  TextArea,
  Table,
  Checkbox,
  Container,
  Segment,
  Dropdown,
  DropdownProps,
} from "semantic-ui-react"
import { updateProject } from "@/api/project/_updateProject"
import { addProjectModels } from "@/api/projectModel/_addProjectModels"
import { deleteProjectModels } from "@/api/projectModel/_deleteProjectModels"
import { useParams, useRouter } from "next/navigation"
import { truncate } from "@/api/pageHelpers"
import {
  ModelData,
  ProjectData,
  ProjectModelData,
} from "@/utils/AppRoutesProps"
import { statusOptions } from "@/utils/const"

const EditProject = ({
  projectData,
  modelData,
  projectModelData,
}: {
  projectData: ProjectData[]
  modelData: ModelData[]
  projectModelData: ProjectModelData[]
}) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((model: any) => model.id === id)
  const router = useRouter()

  let existingProjectModelIds: string[] = projectModelData
    .filter((row: any) => row.project_id === activeProject?.id)
    .map((row: any) => row.model_id)

  let selectedIds: string[] = []
  const [projectId, setProjectId] = useState<string>(activeProject?.id || "")
  const [name, setName] = useState<string>(activeProject?.name || "")
  const [description, setDescription] = useState<string>(
    activeProject?.description || ""
  )
  const [startDate, setStartDate] = useState<string>(
    activeProject?.start_date || ""
  )
  const [status, setStatus] = useState<string>(activeProject?.status || "")
  const [comments, setComments] = useState<string>(
    activeProject?.comments || ""
  )

  useEffect(() => {
    if (activeProject) {
      setProjectId(activeProject.id)
      setName(activeProject.name || "")
      setDescription(activeProject.description || "")
      setStartDate(activeProject.start_date || "")
      setStatus(activeProject.status || "")
      setComments(activeProject.comments || "")
    }
  }, [])

  // Deleted models are those which are in existingProjectModelIds and also selectedIds.
  // This indicated the 'selection' has unchecked the model.
  const getDeletedModels = () => {
    const setDeleteModels = (ids: string[]) => {}

    const removedIds = existingProjectModelIds.filter((id) =>
      selectedIds.includes(id)
    )

    setDeleteModels(removedIds)

    return removedIds
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

    await updateProjectData()
    const removeModels = getDeletedModels()
    await deleteProjectModelsData(removeModels)
    await addProjectModelsData()

    //  navigate("/projects/" + id)
    window.location.reload()
  }

  const updateProjectData = async () => {
    await updateProject({
      id,
      name,
      description,
      start_date: startDate,
      status,
      comments,
    })
  }

  const addProjectModelsData = async (): Promise<void> => {
    const selectedIdsToAdd = Array.from(selectedIds)

    for (let i = 0; i < selectedIdsToAdd.length; i++) {
      if (!existingProjectModelIds.includes(selectedIdsToAdd[i])) {
        await addProjectModels({
          id: crypto.randomUUID(),
          modelId: selectedIdsToAdd[i],
          projectId: projectId,
        })
      } else {
        console.log("Error")
      }
    }
  }

  const deleteProjectModelsData = async (
    modelsToRemove: string[]
  ): Promise<void> => {
    modelsToRemove.forEach(async (modelId) => {
      const projectModelToDelete = projectModelData?.find(
        (model: any) =>
          model.model_id === modelId && model.project_id === activeProject?.id
      )

      if (projectModelToDelete) {
        await deleteProjectModels({
          id: projectModelToDelete.id,
        })
      }
    })
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
                  <Checkbox
                    defaultChecked={existingProjectModelIds.includes(model.id)}
                    onChange={() => toggleSelectedId(model.id)}
                  />
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
  }

  function toggleSelectedId(selectedId: string) {
    if (selectedIds.includes(selectedId)) {
      selectedIds.splice(selectedIds.indexOf(selectedId), 1)
    } else {
      selectedIds.push(selectedId)
    }
  }

  return (
    <>
      <Segment
        color='teal'
        style={{ background: "rgb(0, 0, 0, .35)" }}
        padded='very'
      >
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
          <Form.Button type='submit'>Update Project</Form.Button>
        </Form>
      </Segment>
    </>
  )
}

export default EditProject
