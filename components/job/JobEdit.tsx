import React, { useState, useCallback, useEffect } from "react"
import {
  Form,
  Modal,
  Button,
  TextArea,
  DropdownProps,
  Segment,
} from "semantic-ui-react"
import { updatePrintJob, deletePrintJob } from "@/api/api/printJobApi"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import { JobProps, ModelProps, PrinterProps } from "@/utils/appTypes"
import { jobStatusOptions } from "@/utils/uiConstants"

const JobEdit = ({
  activeModel,
  printerData,
  modalDisplay,
  activeJob,
}: {
  activeModel?: ModelProps
  printerData: PrinterProps[]
  modalDisplay: string
  activeJob: any
}) => {
  const [open, setOpen] = useState(false)
  const [initialJobData, setInitialJobData] = useState(activeJob)
  const [duration, setDuration] = useState(activeJob?.comments || "")
  const [comments, setComments] = useState(activeJob?.comments || "")
  const [date, setDate] = useState(activeJob?.date || "")
  const [printer, setPrinter] = useState(activeJob?.printer_id || "")
  const [status, setStatus] = useState(activeJob?.status || "")
  const [failComments, setFailComments] = useState(
    activeJob?.fail_comment || ""
  )
  const [deleteCheck, setDeleteCheck] = useState(false)
  const printerOptions = printerData.map((printer) => ({
    key: printer.id,
    text: printer.printer,
    value: printer.id,
  }))

  useEffect(() => {
    // Reset fail comments if status is changed to not failed
    if (status !== "Failed") {
      setFailComments("")
    }
  }, [status])

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

        model_id: activeModel?.id,
        fail_comment: failComments,
      })

      window.location.reload()
    } catch (error) {
      console.error("Error updating job:", error)
    }
  }

  const handleDelete = async () => {
    try {
      setOpen(false)
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

  const hasFieldsChanged = () => {
    return (
      printer !== initialJobData?.printer_id ||
      status !== initialJobData?.status ||
      duration !== initialJobData?.duration ||
      comments !== initialJobData?.comments ||
      failComments !== initialJobData?.fail_comment ||
      new Date(date).getTime() !== new Date(initialJobData.date).getTime()
    )
  }

  const toggleModal = () => setOpen(!open)

  const handleDateChange = (event: any, data: any) => setDate(data.value)

  return (
    <>
      <Modal
        onClose={() => toggleModal()}
        onOpen={() => toggleModal()}
        open={open}
        trigger={
          <Button
            basic
            color='violet'
            content='Edit'
            onClick={() => toggleModal()}
          />
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
                  <div
                    style={{
                      width: "50%",
                      display: "inline-grid",
                    }}
                  >
                    <Form.Field required label='Date of Job' />
                    <SemanticDatepicker onChange={handleDateChange} />
                  </div>{" "}
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
                </Form.Group>
                {status != "Complete (Successful)" && (
                  <Form.Group style={{ margin: "0 0 15px 0" }}>
                    <div className={"formLabelOuter"}>
                      <label className='formLabel'>Problem Description</label>
                      <Form.Field
                        id='form-comments'
                        name='failComments'
                        control={TextArea}
                        value={failComments}
                        onChange={(e: any) => setFailComments(e.target.value)}
                      />
                    </div>
                  </Form.Group>
                )}

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
