import React, { useState, useCallback } from "react"
import {
  Form,
  Modal,
  Button,
  TextArea,
  DropdownProps,
  Segment,
} from "semantic-ui-react"
import { updatePrintJob } from "@/api/printJob/_updatePrintJob"
import { deletePrintJob } from "@/api/printJob/_deletePrintJob"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import { PrinterData } from "@/utils/AppRoutesProps"
import { jobStatusOptions } from "@/utils/const"

const JobEdit = ({
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
  const [deleteCheck, setDeleteCheck] = useState(false)
  const [failCheck, setFailCheck] = useState(failComments.length > 0)
  const printerOptions = printerData.map((printer) => ({
    key: printer.id,
    text: printer.printer,
    value: printer.id,
  }))

  const handleSubmit = async () => {
    try {
      setOpen(false)
      await updatePrintJob({
        id: activeJob,
        date: date,
        printer_id: printer,
        status: status,
        duration: duration,
        comments: comments,

        model_id: activeModel.id,
        fail_comment: failComments,
      })

      window.location.reload()
    } catch (error) {
      console.error("Error updating job:", error)
    }
  }

  const handleDelete = async () => {
    try {
      setOpen(false) // TODO optimize loading
      await deletePrintJob({
        id: activeJob,
      })

      window.location.reload()
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
      switch (name) {
        case "printer":
          setPrinter(value)
          break
        case "duration":
          setDuration(value)
          break
        case "comments":
          setComments(value)
          break
        case "failComments":
          setFailComments(value)
          break
        default:
          break
      }
    },
    []
  )

  const toggleModal = () => setOpen(!open)

  const handleDateChange = (event: any, data: any) => setDate(data.value)

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
          Edit Print Job - {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <Segment className='darkBg' padded='very' color='violet'>
              <Form>
                <Form.Group widths={2}>
                  <Form.Dropdown
                    selection
                    required
                    name='form-status'
                    label='Status'
                    options={jobStatusOptions}
                    placeholder={status}
                    onChange={(e: any, { value }: DropdownProps) =>
                      setStatus(value as string)
                    }
                    value={status}
                  />
                  <div
                    style={{
                      width: "50%",
                      display: "inline-grid",
                    }}
                  >
                    <Form.Field required label='Date of Job' />
                    <SemanticDatepicker onChange={handleDateChange} />
                  </div>
                </Form.Group>
                <Form.Group>
                  <div
                    className={"formLabelOuter"}
                    style={{ margin: "15px 0 10px 8px" }}
                  >
                    <Form.Checkbox
                      label='Failed Print?'
                      onChange={(e, data) =>
                        data.checked !== undefined && setFailCheck(data.checked)
                      }
                      checked={failCheck}
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
                          onChange={(e: any) => setFailComments(e.target.value)}
                        />
                      </>
                    )}
                  </div>
                </Form.Group>
                <Form.Group widths={3}>
                  {/*  This selection auto-assigns material type, and user can select specific material */}
                  <Form.Dropdown
                    selection
                    required
                    name='form-printer'
                    label='Printer'
                    options={printerOptions}
                    placeholder={printer}
                    onChange={(e: any, { value }: DropdownProps) =>
                      setPrinter(value as string)
                    }
                    value={printer}
                  />
                  <Form.Input
                    id='form-duration'
                    name='duration'
                    label='Print Duration (minutes)'
                    value={duration}
                    onChange={(e) =>
                      handleChange(e, {
                        name: "duration",
                        value: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Field
                  id='form-comments'
                  label='Comments'
                  name='comments'
                  control={TextArea}
                  value={comments}
                  onChange={(e: any) => setComments(e.target.value)}
                />
              </Form>
            </Segment>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          <div style={{ display: "inline-flex" }}>
            <Form.Checkbox
              label='Delete Print Job?'
              onChange={(e, data) =>
                data.checked !== undefined && setDeleteCheck(data.checked)
              }
              checked={deleteCheck}
              style={{ width: "100%", margin: "20px 0" }}
            />
          </div>
          <br />
          {deleteCheck && (
            <>
              <Button
                basic
                color='violet'
                content='Delete'
                labelPosition='right'
                icon='checkmark'
                onClick={() => handleDelete()}
                negative
              />
            </>
          )}
          <Button
            basic
            color='violet'
            content='Cancel'
            onClick={() => toggleModal()}
          />
          <Button
            basic
            color='violet'
            content='Edit Print Job'
            labelPosition='right'
            icon='checkmark'
            onClick={() => handleSubmit()}
            positive
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default JobEdit
