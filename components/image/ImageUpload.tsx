import React, { useState } from "react"
import { Modal, Button, Input, Segment, Container } from "semantic-ui-react"
import { uploadImage } from "@/api/api/imageApi"
import { ModelProps } from "@/utils/appTypes"
import { User } from "@supabase/supabase-js"

const ImageUpload = ({
  activeModel,
  activeUser,
  modalDisplay,
  onImageUpload: onImageUpload,
}: {
  activeModel: ModelProps
  activeUser: User
  modalDisplay: React.ReactElement
  onImageUpload: () => void
}) => {
  const [open, setOpen] = useState(false)
  const [imageData, setImageData] = useState(null)

  const handleUploadImage = async () => {
    try {
      setOpen(false)
      await uploadImage(activeUser, activeModel.id, imageData)
      onImageUpload()
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  const handleChange = (e: any) => {
    setImageData(e)
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
        <Modal.Header className='.bg-000-95'>
          Upload an Image for {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <Segment color='violet' padded='very'>
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
                Supported formats: .jpg, .png, .gif
              </Container>
            </Segment>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          <Button
            basic
            color='violet'
            content='Cancel'
            onClick={() => toggleModal()}
          />
          <Button
            basic
            color='violet'
            content='Upload Image'
            labelPosition='right'
            icon='checkmark'
            onClick={handleUploadImage}
            positive
            disabled={!imageData}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ImageUpload
