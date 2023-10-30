import React, { useState } from "react"
import { Modal, Button, Input } from "semantic-ui-react"
import { uploadFile } from "@/app/helpers/updateHelpers"

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

  const handleUpload = async () => {
    try {
      setOpen(false)
      uploadFile(activeUser.user.id, activeModel.id, fileData)
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
          Upload a file to {activeModel?.name}
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
              Select a file to upload
              <br />
              Supported formats: stl, ctb
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
            content='Upload Model File'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleUpload()}
            positive
            // disabled={!imageData}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default FileUpload
