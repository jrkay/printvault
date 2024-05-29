import React, { useState, useCallback, useEffect } from "react"
import {
  Form,
  TextArea,
  Table,
  Checkbox,
  Segment,
  DropdownProps,
  Divider,
  Grid,
  Message,
  Button,
} from "semantic-ui-react"
import { updateProject } from "@/api/api/projectApi"
import { addProjectModel, deleteProjectModels } from "@/api/api/projectModelApi"
import { useParams, useRouter } from "next/navigation"
import { truncate } from "@/utils/helpers/uiHelpers"
import { ModelProps, ProjectProps, ProjectModelProps } from "@/utils/appTypes"
import { statusOptions } from "@/utils/uiConstants"
import { v4 as uuidv4 } from "uuid"
import CancelButton from "@/components/CancelButton"
import DeleteProject from "./DeleteProject"

const EditProject = ({
  projectData,
  modelData,
  projectModelData,
}: {
  projectData: ProjectProps[]
  modelData: ModelProps[]
  projectModelData: ProjectModelProps[]
}) => {
  const { id } = useParams<{ id: string }>()
  const activeProject = projectData.find((p) => p.id === id)!
  const router = useRouter()

  const existingProjectModelIds: string[] = projectModelData
    .filter((row) => row.project_id === activeProject.id)
    .map((row) => row.model_id)

  const [selectedIds, setSelectedIds] = useState<string[]>(
    existingProjectModelIds
  )
  const [name, setName] = useState<string>(activeProject.name)
  const [description, setDescription] = useState<string>(
    activeProject.description
  )
  const [status, setStatus] = useState<string>(activeProject.status ?? "")
  const [comments, setComments] = useState<string>(activeProject.comments ?? "")
  const [hasChanges, setHasChanges] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const getDeletedModels = () => {
    return existingProjectModelIds.filter((id) => !selectedIds.includes(id))
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

  useEffect(() => {
    const hasFormChanged =
      name !== activeProject.name ||
      description !== activeProject.description ||
      status !== activeProject.status ||
      comments !== activeProject.comments ||
      JSON.stringify(selectedIds.sort()) !==
        JSON.stringify(existingProjectModelIds.sort())

    setHasChanges(hasFormChanged)
  }, [
    name,
    description,
    status,
    comments,
    selectedIds,
    activeProject,
    existingProjectModelIds,
  ])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const removeModels = getDeletedModels()

    await updateProjectData()
    await deleteProjectModelsData(removeModels)
    await addProjectModelsData()

    setSuccessMessage("Project updated successfully!")
    setHasChanges(false)
  }

  const updateProjectData = async () => {
    await updateProject({
      id: activeProject.id,
      name: name,
      description: description,
      status: status,
      comments: comments,
    })
  }

  const addProjectModelsData = async (): Promise<void> => {
    const selectedIdsToAdd = selectedIds.filter(
      (id) => !existingProjectModelIds.includes(id)
    )

    for (const modelId of selectedIdsToAdd) {
      await addProjectModel({
        id: uuidv4(),
        model_id: modelId,
        project_id: id,
      })
    }
  }

  const deleteProjectModelsData = async (
    modelsToRemove: string[]
  ): Promise<void> => {
    for (const modelId of modelsToRemove) {
      const projectModelToDelete = projectModelData?.find(
        (p: ProjectModelProps) =>
          p.model_id === modelId && p.project_id === activeProject.id
      )

      if (projectModelToDelete) {
        await deleteProjectModels({
          id: projectModelToDelete.id,
        })
      }
    }
  }

  const projectModelsTable = (modelData: ModelProps[]) => {
    if (modelData) {
      return (
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Select</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {modelData.map((model: ModelProps) => (
              <Table.Row key={model.id}>
                <Table.Cell>
                  <Checkbox
                    checked={selectedIds.includes(model.id)}
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

  const toggleSelectedId = (selectedId: string) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(selectedId)
        ? prevSelectedIds.filter((id) => id !== selectedId)
        : [...prevSelectedIds, selectedId]
    )
  }

  const handleReturnToProject = () => {
    location.reload()
  }

  return (
    <>
      <Grid centered style={{ paddingTop: "50px", border: "1px solid red" }}>
        <Grid.Row>
          <Grid.Column
            largescreen={2}
            widescreen={2}
            computer={2}
            tablet={2}
            mobile={14}
            style={{ maxWidth: "200px" }}
          >
            <Grid.Row style={{ marginBottom: "20px" }}>
              <Button
                color='violet'
                content='Return to Project'
                fluid
                onClick={handleReturnToProject}
              />
            </Grid.Row>
            {/* <Grid.Row style={{ marginBottom: "20px" }}>
              <CancelButton />
            </Grid.Row> */}
            <Grid.Row>
              <DeleteProject
                projectModelData={projectModelData}
                activeProject={activeProject}
                modelData={modelData}
              />
            </Grid.Row>
          </Grid.Column>

          <Grid.Column
            largescreen={11}
            widescreen={11}
            computer={11}
            tablet={11}
            mobile={14}
            style={{ maxWidth: "1500px" }}
          >
            <Grid.Row>
              <Segment color='violet' padded='very'>
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
                      onChange={(e: any) =>
                        handleChange(e, {
                          name: "description",
                          value: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Dropdown
                      selection
                      required
                      name='status'
                      label='Project Status'
                      options={statusOptions}
                      placeholder='Select Status'
                      onChange={(e: any, { value }: DropdownProps) =>
                        handleChange(e, {
                          name: "status",
                          value: value as string,
                        })
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
                    onChange={(e: any) =>
                      handleChange(e, {
                        name: "comments",
                        value: e.target.value,
                      })
                    }
                  />
                  <Divider horizontal />
                  <Form.Group widths={"equal"}>
                    <Form.Field label='Models to Include' />
                  </Form.Group>
                  <Form.Group widths={"equal"}>
                    <Segment
                      color='violet'
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
                      disabled={!hasChanges}
                      style={{
                        width: "50%",
                        margin: "20px 0 0 0",
                        maxWidth: "250px",
                      }}
                    />
                  </Form.Group>
                  {successMessage && (
                    <Message positive>
                      <Message.Header>Success</Message.Header>
                      <p>{successMessage}</p>
                    </Message>
                  )}
                </Form>
              </Segment>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default EditProject
