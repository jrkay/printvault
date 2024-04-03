import React, { useState } from "react"
import {
  Form,
  Modal,
  Button,
  TextArea,
  DropdownProps,
  Segment,
} from "semantic-ui-react"
import { PrinterData } from "@/utils/appTypes"

const JobView = ({
  activeModel,
  printerData,
  modalDisplay,
  jobData,
  activeJob,
}: {
  activeModel: any
  printerData: PrinterData[]
  modalDisplay: string
  jobData: any
  activeJob: any
}) => {
  const [open, setOpen] = useState(false)
  const [activeJobData, setActiveJobData] = useState(
    jobData.find((job: any) => job.id === activeJob)
  )

  const [duration, setDuration] = useState(activeJobData.comments || "")
  const [comments, setComments] = useState(activeJobData.comments || "")
  const [date, setDate] = useState(activeJobData.date || [])
  const [printer, setPrinter] = useState(activeJobData.printer || "")
  const [status, setStatus] = useState(activeJobData.status || "")
  const [failComments, setFailComments] = useState(
    activeJobData.fail_comment || ""
  )

  const [failCheck, setFailCheck] = useState(failComments.length > 0)

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
          View Print Job Details - {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <Segment className='darkBg' padded='very' color='violet'>
              <Form>
                <Form.Group widths={2}>
                  <Form.Input
                    name='form-status'
                    label='Status'
                    placeholder={status}
                    value={status}
                  />
                  <div
                    style={{
                      width: "50%",
                      display: "inline-grid",
                    }}
                  >
                    <Form.Field label='Date of Job' />
                    {/* <SemanticDatepicker value={date} /> */}
                  </div>
                </Form.Group>
                <Form.Group>
                  <div
                    className={"formLabelOuter"}
                    style={{ margin: "15px 0 10px 8px" }}
                  >
                    <Form.Checkbox
                      label='Failed Print?'
                      checked={failComments.length > 0}
                      disabled={failComments.length > 0}
                    />
                  </div>
                </Form.Group>
                <Form.Group style={{ margin: "0 0 15px 0" }}>
                  <div className={"formLabelOuter"}>
                    {failCheck && (
                      <>
                        <label className='formLabel'>What happened?</label>
                        <Form.Field
                          id='form-comments'
                          name='failComments'
                          control={TextArea}
                          value={failComments}
                        />
                      </>
                    )}
                  </div>
                </Form.Group>
                <Form.Group widths={3}>
                  <Form.Input
                    name='form-printer'
                    label='Printer'
                    placeholder={printer}
                    value={printer}
                  />
                  <Form.Input
                    id='form-duration'
                    name='duration'
                    label='Print Duration (minutes)'
                    value={duration}
                  />
                </Form.Group>
                <Form.Field
                  id='form-comments'
                  label='Comments'
                  name='comments'
                  control={TextArea}
                  value={comments}
                />
              </Form>
            </Segment>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          <Button
            basic
            color='violet'
            content='Close'
            onClick={() => toggleModal()}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default JobView
