import React, { useState } from "react"
import { Modal, Button, Input, Segment, Container } from "semantic-ui-react"
import { uploadImage } from "@/api/image/_uploadImage"
import { useRouter } from "next/navigation"

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
  const [imageData, setImageData] = useState(null)

  const router = useRouter()

  const handleUpload = async () => {
    try {
      setOpen(false)
      uploadImage(activeUser[0].id, activeModel.id, imageData)
    } catch (error) {
      console.error(error)
    }
    window.location.reload()
    // navigate("/models/" + activeModel.id)
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
          Upload an Image for {activeModel?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Modal.Description>
            <Segment
              color='teal'
              style={{ background: "rgb(0, 0, 0, .35)" }}
              padded='very'
            >
              <Input
                type='file'
                accept='image/jpg, image/png, image/jpeg'
                onChange={(e) => {
                  handleChange(e)
                }}
              />
              <Container style={{ fontSize: "1.2em", marginTop: "1em" }}>
                Select an image to upload
                <br />
                Supported formats: .jpg, .png
              </Container>
            </Segment>
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
