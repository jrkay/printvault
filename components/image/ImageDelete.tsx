import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { deleteImage } from "@/api/imageApi"
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

      window.location.reload()
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Modal
        onClose={() => toggleModal()}
        onOpen={() => toggleModal()}
        open={open}
        trigger={
          <a onClick={() => null} style={{ cursor: "pointer" }}>
            {modalDisplay}
          </a>
        }
      >
        <Modal.Header className='.bg-000-95'>Delete Image</Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <p>Are you sure you want to delete this image?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          <Button
            basic
            color='violet'
            content='Visit Original'
            onClick={() => toggleModal()}
          />
          <Button
            basic
            color='violet'
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
