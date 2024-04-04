import React, { useState, useCallback } from "react"
import {
  Form,
  TextArea,
  Table,
  Checkbox,
  Segment,
  DropdownProps,
  Divider,
} from "semantic-ui-react"
import { updateProject } from "@/api/projectApi"
import { addProjectModel, deleteProjectModels } from "@/api/projectModelApi"
import { useParams, useRouter } from "next/navigation"
import { truncate } from "@/utils/helpers/uiHelpers"
import { ModelData, ProjectData, ProjectModelData } from "@/utils/appTypes"
import { statusOptions } from "@/utils/uiConstants"
import { v4 as uuidv4 } from "uuid"

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
  const [status, setStatus] = useState<string>(activeProject?.status || "")
  const [comments, setComments] = useState<string>(
    activeProject?.comments || ""
  )

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
    const removeModels = getDeletedModels()

    await updateProjectData()
    await deleteProjectModelsData(removeModels)
    await addProjectModelsData()

    router.replace("/projects/" + id)
  }

  const updateProjectData = async () => {
    await updateProject({
      id: activeProject?.id,
      name: name,
      description: description,
      status: status,
      comments: comments,
    })
  }

  const addProjectModelsData = async (): Promise<void> => {
    const selectedIdsToAdd = Array.from(selectedIds)

    for (let i = 0; i < selectedIdsToAdd.length; i++) {
      if (!existingProjectModelIds.includes(selectedIdsToAdd[i])) {
        await addProjectModel({
          id: uuidv4,
          model_id: selectedIdsToAdd[i],
          project_id: projectId,
        })
      } else {
        console.error("Error in addProjectModelsData:", "Model already added")
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
        <Table selectable>
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
      <Segment className='darkBg' color='violet' padded='very'>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths={"equal"}>
            <Form.Input
              id='form-name'
              name='name'
              label='Project Name'
              value={name}
              required
              onChange={(e) =>
                handleChange(e, { name: "name", value: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Field
              id='form-description'
              name='description'
              label='Description'
              control={TextArea}
              value={description}
              required
              onChange={(e: any) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Dropdown
              selection
              required
              name='form-status'
              label='Project Status'
              options={statusOptions}
              placeholder={status}
              onChange={(e: any, { value }: DropdownProps) =>
                setStatus(value as string)
              }
              value={status}
            />
          </Form.Group>
          <Form.Field
            id='form-comments'
            name='comments'
            control={TextArea}
            value={comments}
            label='Comments'
            onChange={(e: any) => setComments(e.target.value)}
          />
          <Divider horizontal />
          <Form.Group widths={"equal"}>
            <Form.Field label='Models to Include' />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Segment
              color='blue'
              className='darkBg'
              style={{
                maxHeight: "300px",
                overflow: "scroll",
              }}
              padded='very'
            >
              {projectModelsTable(modelData)} <br />
            </Segment>
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Button
              basic
              color='violet'
              content='Update Project'
              fluid
              type='submit'
              className='buttonStyle'
            />
          </Form.Group>
        </Form>
      </Segment>
    </>
  )
}

export default EditProject
