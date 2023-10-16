import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Grid, Modal, Button, Header } from "semantic-ui-react"
import { deleteFileClient } from "../../app/helpers/updateHelpers"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const displayModal = ({ fileData }: { fileData: any }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleDeleteFile = async () => {
    try {
      setOpen(false)
      //   await deleteFileClient(fileData.id)

      // Redirect to the /files/ route
      //      navigate("/files/")
      //    window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
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
        Delete File - {fileData?.name}
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
        <Button color='black' onClick={() => setOpen(false)}>
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
  )
}

function DeleteLink(fileData: any) {
  displayModal(fileData)
  console.log("fileData--DeleteLink-------------", fileData)
}

export default DeleteLink
