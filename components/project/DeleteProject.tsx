import React, { useState } from "react"
import { Modal, Button, Message, List } from "semantic-ui-react"
import { useRouter } from "next/navigation"
import { deleteProject } from "@/api/api/projectApi"
import { deleteProjectModels } from "@/api/api/projectModelApi"
import { ProjectProps, ProjectModelProps, ModelProps } from "@/utils/appTypes"

const DeleteProject = ({
  activeProject,
  projectModelData,
  modelData,
  disabled,
}: {
  activeProject: ProjectProps
  projectModelData: ProjectModelProps[]
  modelData: ModelProps[]
  disabled?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [assignedModels, setAssignedModels] = useState<ModelProps[]>([])
  const router = useRouter()

  const handleDeleteProject = async () => {
    try {
      setOpen(false)

      // Find all project models with the same project id
      const matchingProjectModels = projectModelData.filter(
        (model: ProjectModelProps) => model.project_id === activeProject.id
      )

      // If any matching project models exist, delete them
      if (matchingProjectModels.length > 0) {
        // Wait for deleteProjectModels to complete before calling deleteProject
        await Promise.all(
          matchingProjectModels.map(async (model: ProjectModelProps) => {
            await deleteProjectModels(model)
          })
        )
      }

      // Delete the project
      await deleteProject(activeProject.id)
      router.replace("/projects/")
    } catch (error) {
      console.error("Error deleting project:", error)
    }
  }

  const handleModalClose = () => {
    setOpen(false)
  }

  const handleModalOpen = async () => {
    setOpen(true)

    // Fetch models assigned to the project
    const projectModels = projectModelData.filter(
      (model: ProjectModelProps) => model.project_id === activeProject.id
    )

    // Map the project models to the full model data
    const models = projectModels
      .map((pm) => modelData.find((m) => m.id === pm.model_id))
      .filter((model): model is ModelProps => model !== undefined)
    setAssignedModels(models)
  }

  return (
    <>
      <Modal
        onClose={handleModalClose}
        onOpen={handleModalOpen}
        open={open}
        trigger={
          <Button
            basic
            color='violet'
            fluid
            disabled={disabled}
            onClick={handleModalOpen}
          >
            Delete Project
          </Button>
        }
      >
        <Modal.Header className='.bg-000-95'>
          Delete Project - {activeProject?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <p>Are you sure you want to delete this project?</p>
            {assignedModels.length > 0 && (
              <Message>
                <Message.Header>
                  This project includes the following models:
                </Message.Header>
                <Message.Content>
                  <List>
                    {assignedModels.map((model) => (
                      <List.Item key={model.id}>{model.name}</List.Item>
                    ))}
                  </List>
                </Message.Content>
              </Message>
            )}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          <Button
            basic
            color='violet'
            content='Cancel'
            onClick={handleModalClose}
          />
          <Button
            basic
            color='violet'
            content='Delete Project'
            labelPosition='right'
            icon='checkmark'
            onClick={handleDeleteProject}
            negative
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default DeleteProject
