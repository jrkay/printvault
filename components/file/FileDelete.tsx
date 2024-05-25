import React, { useState } from "react"
import { Modal, Button } from "semantic-ui-react"
import { deleteFile } from "@/api/api/fileApi"
import { FileProps } from "@/utils/appTypes"
import { User } from "@supabase/supabase-js"

const FileDelete = ({
  modalDisplay,
  file,
  activeUser,
}: {
  modalDisplay: React.ReactElement
  file: FileProps
  activeUser: User
}) => {
  const [open, setOpen] = useState(false)

  const handleDeleteFile = async () => {
    try {
      setOpen(false)
      await deleteFile(file, activeUser)

      window.location.reload()
    } catch (error) {
      console.error("Error deleting file:", error)
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
            <p>Are you sure you want to delete this file?</p>
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
            content='Delete File'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleDeleteFile()}
            negative
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default FileDelete
