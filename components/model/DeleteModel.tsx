import React, { useState } from "react"
import { Modal, Button, Message, List } from "semantic-ui-react"
import { deleteModel, getModelProjects } from "@/api/api/modelApi"
import { useRouter } from "next/navigation"
import { ModelProps, ProjectProps } from "@/utils/appTypes"

const DeleteModel = ({
  activeModel,
  projectData,
  disabled,
}: {
  activeModel?: ModelProps
  projectData: ProjectProps[]
  disabled?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [errorMessageIds, setErrorMessageIds] = useState("")

  const handleDeleteModel = async () => {
    try {
      setOpen(false)
      await deleteModel({ id: activeModel?.id, projects: errorMessageIds })

      router.replace("/models/")
    } catch (error: Error | any) {
      console.error("Error deleting model:", error)
    }
  }

  const handleModalClose = () => {
    setOpen(false)
  }
  const handleModalOpen = async () => {
    setOpen(true)

    // Display assigned projects, if any
    await getModelProjects(activeModel?.id, (projectIds) => {
      if (projectIds) {
        setErrorMessageIds(projectIds)
      } else {
        ;<></>
      }
    })
  }

  const getProjectNames = (ids: any) => {
    // Get project names from projectData using errorMessageIds
    const projectNames = projectData
      .filter((project: ProjectProps) => errorMessageIds.includes(project.id))
      .map(
        (project: ProjectProps) =>
          `<List.Item key={project.id}>${project.name}</List.Item>`
      )

    return <div dangerouslySetInnerHTML={{ __html: projectNames.join("") }} />
  }

  return (
    <>
      <Modal
        onClose={() => handleModalClose()}
        onOpen={() => handleModalOpen()}
        open={open}
        trigger={
          <Button
            basic
            color='violet'
            fluid
            disabled={disabled}
            onClick={() => handleModalOpen()}
          >
            Delete Model
          </Button>
        }
      >
        <Modal.Header className='.bg-000-95'>
          Delete Model - {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <p>Are you sure you want to delete this model?</p>
            {errorMessageIds && errorMessageIds.length > 0 && (
              <Message
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.95)",
                  padding: "15px",
                }}
              >
                <Message.Header>
                  This model will be removed from the following projects upon
                  deletion:
                </Message.Header>
                <Message.Content>
                  <List>{getProjectNames(errorMessageIds)}</List>
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
            onClick={() => handleModalClose()}
          />
          <Button
            basic
            color='violet'
            content='Delete Model'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleDeleteModel()}
            negative
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default DeleteModel
