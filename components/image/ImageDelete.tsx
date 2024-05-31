import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { deleteImage } from "@/api/api/imageApi"
import { useRouter } from "next/navigation"
import { ImageProps } from "@/utils/appTypes"
import { User } from "@supabase/supabase-js"

const ImageDelete = ({
  modalDisplay,
  image,
  activeUser,
  onImageDelete,
}: {
  modalDisplay: React.ReactElement
  image: ImageProps
  activeUser: User
  onImageDelete: () => void
}) => {
  const [open, setOpen] = useState(false)

  const handleDeleteImage = async () => {
    try {
      setOpen(false)
      await deleteImage(image, activeUser)
      onImageDelete()
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
