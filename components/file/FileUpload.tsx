import React, { useState } from "react"
import { Modal, Button, Input, Container, Segment } from "semantic-ui-react"
import { uploadFile } from "@/api/file/uploadFile"
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
            <Segment color='violet' className='darkBg' padded='very'>
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
