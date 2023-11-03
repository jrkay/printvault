import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import {
  deleteProjectClient,
  deleteProjectModelsClient,
} from "@/api/updateHelpers"
import { useNavigate } from "react-router-dom"
import { ProjectModelData } from "@/utils/AppRoutesProps"

const DeleteProject = ({
  activeProject,
  projectModelData,
}: {
  activeProject: any
  projectModelData: ProjectModelData[]
}) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleDeleteProject = async () => {
    try {
      //      setOpen(false)
      await deleteProjectClient(activeProject)

      // find all project models with the same project id
      const matchingProjectModels = projectModelData.filter(
        (model: any) => model.project_id === activeProject.id
      )

      await matchingProjectModels.forEach(async (model: any) => {
        await deleteProjectModelsClient(model)
      })

      // Redirect to the /projects/ route
      navigate("/projects/")
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const handleModalClose = () => {
    setOpen(false)
  }
  const handleModalOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Modal
        onClose={() => handleModalClose()}
        onOpen={() => handleModalOpen()}
        open={open}
        trigger={
          <a onClick={() => null} style={{ cursor: "pointer" }}>
            Remove Project
          </a>
        }
      >
        <Modal.Header
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          Delete Project - {activeProject?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Modal.Description>
            <p>Are you sure you want to delete this project?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Button color='black' onClick={() => handleModalClose()}>
            Cancel
          </Button>
          <Button
            content='Delete Project'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleDeleteProject()}
            negative
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default DeleteProject
