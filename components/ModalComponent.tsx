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
        style={{ backgroundColor: "rgb(0, 0, 0, .95)" }}
      >
        <Modal.Content style={{ backgroundColor: "rgb(0, 0, 0, .35)" }}>
          {content}
        </Modal.Content>
        <Modal.Actions style={{ backgroundColor: "rgb(0, 0, 0, .95)" }}>
          <Button color='black' onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ModalComponent
