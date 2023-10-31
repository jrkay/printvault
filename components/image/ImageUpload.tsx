import React, { useState } from "react"
import { Modal, Button, Input } from "semantic-ui-react"
import { uploadImage } from "@/app/helpers/updateHelpers"
import { useNavigate } from "react-router-dom"

const ImageUpload = ({
  activeModel,
  activeUser,
  modalDisplay,
}: {
  activeModel: any
  activeUser: any
  modalDisplay: any
}) => {
  const [open, setOpen] = useState(false)
  const [imageData, setImageData] = useState(null) // Initialize imageData state with null

  const navigate = useNavigate()

  const handleUpload = async () => {
    try {
      setOpen(false)
      uploadImage(activeUser[0].id, activeModel.id, imageData)
    } catch (error) {
      console.error(error)
    }
    window.location.reload()
    navigate("/models/" + activeModel.id)
  }

  const handleChange = (e: any) => {
    setImageData(e)
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
          Upload an Image - {activeModel?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Modal.Description>
            <Input
              type='file'
              onChange={(e) => {
                handleChange(e)
              }}
            />
            <p>
              Select an image to upload
              <br />
              Supported formats: jpg, jpeg, png
            </p>
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
            content='Upload Image'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleUpload()}
            positive
            disabled={!imageData}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ImageUpload
