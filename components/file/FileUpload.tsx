import React, { useState } from "react"
import { Modal, Button, Input, Container, Segment } from "semantic-ui-react"
import { uploadFile } from "@/api/file/_uploadFile"
import { useRouter } from "next/navigation"

const FileUpload = ({
  activeModel,
  activeUser,
  modalDisplay,
}: {
  activeModel: any
  activeUser: any
  modalDisplay: any
}) => {
  const [open, setOpen] = useState(false)
  const [fileData, setFileData] = useState(null)

  const router = useRouter()

  const handleUpload = async () => {
    try {
      setOpen(false)
      uploadFile(activeUser[0].id, activeModel.id, fileData)

      window.location.reload()
      //  navigate("/models/" + activeModel.id)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e: any) => {
    setFileData(e)
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
          Upload a file for {activeModel?.name}
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
                onChange={(e) => {
                  handleChange(e)
                }}
              />
              <Container style={{ fontSize: "1.2em", marginTop: "1em" }}>
                Select a file to upload
                <br />
                Supported formats: stl, ctb
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
            content='Upload Model File'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleUpload()}
            positive
            disabled={!fileData}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default FileUpload
