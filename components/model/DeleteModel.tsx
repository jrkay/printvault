import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { deleteModel } from "@/api/model/_deleteModel"
import { useRouter } from "next/navigation"

const DeleteModel = ({ activeModel }: { activeModel: any }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("")

  const handleDeleteModel = async () => {
    try {
      // setOpen(false)
      await deleteModel(activeModel.id)

      // Redirect to the /models/ route
      // router.push("/models/")
      // window.location.reload()
    } catch (error: Error | any) {
      console.error(error)
      setErrorMessage(error.message)
      console.log("errorMessage", errorMessage)
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
            Remove Model
          </a>
        }
      >
        <Modal.Header
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          Delete Model - {activeModel?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Modal.Description>
            <p>Are you sure you want to delete this model?</p>
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
