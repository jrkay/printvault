import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { deleteProjectClient } from "../../app/helpers/updateHelpers"
import { useNavigate } from "react-router-dom"

const DisplayModal = ({ activeFile }: { activeFile: any }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleDeleteFile = async () => {
    try {
      setOpen(false)
      await deleteProjectClient(activeFile)

      // Redirect to the /files/ route
      navigate("/files/")
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
            Remove File
          </a>
        }
      >
        <Modal.Header
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          Delete File - {activeFile?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Modal.Description>
            <p>Are you sure you want to delete this file?</p>
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
            content='Delete File'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleDeleteFile()}
            negative
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default DisplayModal
