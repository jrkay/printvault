import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { deleteModel } from "@/api/model/deleteModel"
import { useRouter } from "next/navigation"
import { getModelProjects } from "@/api/model/getModelProjects"

const DeleteModel = ({
  activeModel,
  projectData,
}: {
  activeModel: any
  projectData: any
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [errorMessageIds, setErrorMessageIds] = useState("")

  const handleDeleteModel = async () => {
    try {
      setOpen(false)
      await deleteModel({ id: activeModel.id, projects: errorMessageIds })

      // Redirect to the /models/ route
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
    await getModelProjects(activeModel.id, (projectIds) => {
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
      .filter((project: any) => errorMessageIds.includes(project.id))
      .map((project: any) => `<p>${project.name}</p>`)

    return <div dangerouslySetInnerHTML={{ __html: projectNames.join("") }} />
  }

  return (
    <>
      <Modal
        onClose={() => handleModalClose()}
        onOpen={() => handleModalOpen()}
        open={open}
        trigger={
          <a onClick={() => null} style={{ cursor: "pointer" }}>
            Remove Model
          </a>
        }
      >
        <Modal.Header className='.bg-000-95'>
          Delete Model - {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <p
              style={{
                fontSize: "1.2em",
              }}
            >
              Are you sure you want to delete this model?
            </p>
            {errorMessageIds && errorMessageIds.length > 0 && (
              <div
                style={{
                  border: "1px solid rgb(0, 0, 0, .95)",
                  padding: "15px",
                  fontSize: "1.2em",
                }}
              >
                <b>
                  This model will be removed from the following projects upon
                  deletion:
                </b>
                <br />
                <br />
                {getProjectNames(errorMessageIds)}
              </div>
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
