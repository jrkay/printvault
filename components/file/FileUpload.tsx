import React, { useState } from "react"
import { Modal, Button, Input, Container, Segment } from "semantic-ui-react"
import { uploadFile } from "@/api/api/fileApi"
import { ModelProps } from "@/utils/appTypes"
import { User } from "@supabase/supabase-js"

const FileUpload = ({
  activeModel,
  activeUser,
  modalDisplay,
  onUpload: onFileUpload,
}: {
  activeModel: ModelProps
  activeUser: User
  modalDisplay: React.ReactElement
  onUpload: () => void
}) => {
  const [open, setOpen] = useState(false)
  const [fileData, setFileData] = useState(null)

  const handleUploadFile = async () => {
    try {
      setOpen(false)
      await uploadFile(activeUser, activeModel, fileData)
      onFileUpload()
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  const handleChange = (e: any) => {
    setFileData(e)
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
          Upload a file for {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <Segment color='violet' padded='very'>
              <Input
                type='file'
                accept='.stl, .ctb, .cli, .lys, .vdt, .vxp'
                onChange={(e) => {
                  handleChange(e)
                }}
              />
              <Container style={{ fontSize: "1.2em", marginTop: "1em" }}>
                Select a file to upload
                <br />
                Supported formats: .stl, .ctb, .cli, .lys, .vdt, .vxp
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
            content='Upload File'
            labelPosition='right'
            icon='checkmark'
            onClick={handleUploadFile}
            positive
            disabled={!fileData}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default FileUpload
