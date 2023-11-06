import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { deleteImage } from "@/api/image/_deleteImage"
import { useRouter } from "next/navigation"

const ImageDelete = ({
  modalDisplay,
  image,
  activeUser,
}: {
  modalDisplay: any
  image: any
  activeUser: any
}) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDeleteImage = async () => {
    try {
      setOpen(false)
      await deleteImage(image, activeUser)

      // // Redirect to the /models/ route
      //  navigate("/models/")
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
            <p>Are you sure you want to delete this image?</p>
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
            content='Delete Image'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleDeleteImage()}
            negative
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ImageDelete
