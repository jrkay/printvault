import React, { ReactNode, useState } from "react"
import { Modal, Button } from "semantic-ui-react"

type ModalComponent = {
  triggerText: string
  content: ReactNode
}

const ModalComponent = ({ triggerText, content }: ModalComponent) => {
  const [open, setOpen] = useState(false)

  const toggleModal = () => setOpen(!open)

  return (
    <>
      <Modal
        onClose={toggleModal}
        onOpen={toggleModal}
        open={open}
        trigger={
          <a onClick={toggleModal} style={{ cursor: "pointer" }}>
            {triggerText}
          </a>
        }
        className='.bg-000-95'
      >
        <Modal.Content className='darkBg'>{content}</Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          <Button basic color='violet' content='Close' onClick={toggleModal} />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default ModalComponent
