import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { deleteFile } from "@/api/file/_deleteFile"
import { useRouter } from "next/navigation"

const FileDelete = ({
  modalDisplay,
  file,
  activeUser,
  activeModel,
}: {
  modalDisplay: any
  file: any
  activeUser: any
  activeModel: any
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDeleteFile = async () => {
    try {
      setOpen(false)
      await deleteFile(file, activeUser)

      //  navigate("/models/" + activeModel.id)
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
            {modalDisplay}
          </a>
        }
      >
        <Modal.Header
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          Delete Image
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

export default FileDelete
