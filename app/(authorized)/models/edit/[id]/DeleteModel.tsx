import React, { useState } from "react"
import { Modal, Button, Message, List } from "semantic-ui-react"
import { deleteModel } from "@/api/api/modelApi"
import { useRouter } from "next/navigation"
import { ModelProps, ProjectProps } from "@/utils/appTypes"
import { User } from "@supabase/supabase-js"

const DeleteModel = ({
  activeModel,
  projectData,
  disabled,
  activeUser,
  imageData,
  fileData,
}: {
  activeModel: ModelProps
  projectData: ProjectProps[]
  disabled?: boolean
  activeUser: User
  imageData: any
  fileData: any
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDeleteModel = async () => {
    try {
      setOpen(false)
      await deleteModel({ id: activeModel.id }, activeUser, imageData, fileData)

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
  }

  const renderProjectNames = (projects: ProjectProps[]) => {
    return projects.map((project) => (
      <List.Item key={project.id}>{project.name}</List.Item>
    ))
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
            {projectData && projectData.length > 0 && (
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
                  <List>{renderProjectNames(projectData)}</List>
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
