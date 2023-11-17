import React, { ReactNode, useState } from "react"
import { Modal, Button } from "semantic-ui-react"

type ModalComponentProps = {
  triggerText: string
  content: ReactNode
}

const ModalComponent = ({ triggerText, content }: ModalComponentProps) => {
  const [open, setOpen] = useState(false)

  const handleModalClose = () => {
    setOpen(false)
  }

  const handleModalOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Modal
        onClose={handleModalClose}
        onOpen={handleModalOpen}
        open={open}
        trigger={
          <a onClick={handleModalOpen} style={{ cursor: "pointer" }}>
            {triggerText}
          </a>
        }
        className='.bg-000-95'
      >
        <Modal.Content className='darkBg'>{content}</Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          <Button
            basic
            color='violet'
            content='Close'
            onClick={handleModalClose}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ModalComponent
