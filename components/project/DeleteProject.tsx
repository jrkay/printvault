import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { useRouter } from "next/navigation"
import { deleteProject } from "@/api/project/_deleteProject"
import { deleteProjectModels } from "@/api/projectModel/_deleteProjectModels"
import { ProjectData, ProjectModelData } from "@/utils/AppRoutesProps"

const DeleteProject = ({
  activeProject,
  projectModelData,
}: {
  activeProject: ProjectData
  projectModelData: ProjectModelData[]
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleDeleteProject = async () => {
    try {
      setOpen(false)

      // find all project models with the same project id
      const matchingProjectModels = projectModelData.filter(
        (model: any) => model.project_id === activeProject.id
      )

      // If any matching project models exist, delete them
      if (matchingProjectModels.length > 0) {
        // wait for deleteProjectModels to complete before calling deleteProject
        await Promise.all(
          matchingProjectModels.map(async (model: any) => {
            await deleteProjectModels(model)
          })
        )
        await deleteProject(activeProject.id)
      } else {
        // If no matching project models exist, delete the project directly
        await deleteProject(activeProject.id)
      }

      // Redirect to the /projects/ route
      router.replace("/projects/")
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
          }}
          className='.bg-000-95'
        >
          Delete Project - {activeProject?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
          }}
          className='.bg-000-95'
        >
          <Modal.Description>
            <p>Are you sure you want to delete this project?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions
          style={{
            color: "black !important",
          }}
          className='.bg-000-95'
        >
          <Button
            basic
            color='violet'
            content='Cancel'
            onClick={() => handleModalClose()}
          />
          <Button
            basic
            color='violet'
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
