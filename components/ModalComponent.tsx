import React, { ReactNode, useState } from "react"
import { Modal, Button } from "semantic-ui-react"

interface ModalComponentProps {
  triggerText: string
  content: ReactNode
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  triggerText,
  content,
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const toggleModal = () => setOpen(!open)

  return (
    <Modal
      onClose={toggleModal}
      onOpen={toggleModal}
      open={open}
      trigger={
        <span onClick={toggleModal} style={{ cursor: "pointer" }}>
          {triggerText}
        </span>
      }
      className='bg-000-95'
    >
      <Modal.Content className='darkBg'>{content}</Modal.Content>
      <Modal.Actions className='bg-000-95'>
        <Button basic color='violet' content='Close' onClick={toggleModal} />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalComponent
