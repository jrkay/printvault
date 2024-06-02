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
import { JobProps, ModelProps, PrinterProps } from "@/utils/appTypes"
import { jobStatusOptions } from "@/utils/uiConstants"

const JobEdit = ({
  activeModel,
  printerData,
  modalDisplay,
  activeJob,
}: {
  activeModel?: ModelProps
  printerData?: any
  modalDisplay?: string
  activeJob: any
}) => {
  const [open, setOpen] = useState(false)
  const [initialState, setInitialState] = useState({
    id: activeJob?.id || "",
    date: activeJob?.date || "",
    status: activeJob?.status || "",
    duration: activeJob?.duration || "",
    comments: activeJob?.comments || "",
    printer: activeJob?.printer_id || "",
    failComments: activeJob?.failComments || "",
  })
  const [currentState, setCurrentState] = useState(initialState)
  const [deleteCheck, setDeleteCheck] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Reset fail comments if status is changed to not failed and failComments is not already empty
    if (initialState.status !== "Failed" && initialState.failComments !== "") {
      setInitialState((prevInitialState) => ({
        ...prevInitialState,
        failComments: "",
      }))
    }
  }, [initialState])

  useEffect(() => {
    setHasChanges(
      initialState.id !== currentState.id ||
        initialState.date !== currentState.date ||
        initialState.status !== currentState.status ||
        initialState.duration !== currentState.duration ||
        initialState.comments !== currentState.comments ||
        initialState.printer !== currentState.printer ||
        initialState.failComments !== currentState.failComments
    )
  }, [currentState, initialState])

  useEffect(() => {
    setInitialState((prevInitialState) => {
      // Only update initialState if it's the initial mount
      if (
        !prevInitialState.id &&
        !prevInitialState.date &&
        !prevInitialState.status &&
        !prevInitialState.duration &&
        !prevInitialState.comments &&
        !prevInitialState.printer &&
        !prevInitialState.failComments
      ) {
        return currentState
      }
      return prevInitialState
    })
  }, [currentState, setInitialState])

  const handleSubmit = async () => {
    try {
      //  setOpen(false)
      await updatePrintJob({
        comments: currentState.comments,
        created_at: activeJob.created_at,
        date: currentState.date,
        duration: currentState.duration,
        fail_comment: currentState.failComments,
        id: activeJob.id,
        model_id: activeModel?.id,
        printer_id: activeJob.printer_id,
        status: currentState.status,
        user_id: activeJob.user_id,
      })

      // window.location.reload()
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

      //      window.location.reload()
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    { name, value }: { name: string; value: string }
  ) => {
    setCurrentState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const toggleModal = () => {
    setOpen(!open)
    if (!open) {
      setCurrentState({
        id: activeJob?.id || "",
        date: activeJob?.date || "",
        status: activeJob?.status || "",
        duration: activeJob?.duration || "",
        comments: activeJob?.comments || "",
        printer: activeJob?.printer_id || "",
        failComments: activeJob?.failComments || "",
      })
    }
  }

  return (
    <>
      <Modal
        onClose={() => toggleModal()}
        onOpen={() => toggleModal()}
        open={open}
        trigger={
          <Button
            basic
            size='mini'
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
            <Segment padded='very' color='violet'>
              <Form>
                <Form.Group widths={2}>
                  <Form.Input
                    id='form-date'
                    name='date'
                    label='Date of Job'
                    type='date'
                    value={currentState.date}
                    onChange={(e) =>
                      handleChange(e, {
                        name: "date",
                        value: e.target.value,
                      })
                    }
                  />
                  <Form.Dropdown
                    selection
                    required
                    name='form-status'
                    label='Status'
                    options={jobStatusOptions}
                    placeholder={initialState.status}
                    onChange={(e: any) =>
                      handleChange(e, {
                        name: "status",
                        value: e.target.value,
                      })
                    }
                    value={currentState.status}
                  />
                </Form.Group>
                {currentState.status != "Complete (Successful)" && (
                  <Form.Group style={{ margin: "0 0 15px 0" }}>
                    <div className={"formLabelOuter"}>
                      <label className='formLabel'>Problem Description</label>
                      <Form.Field
                        id='form-comments'
                        name='failComments'
                        control={TextArea}
                        value={currentState.failComments}
                        onChange={(e: any) =>
                          handleChange(e, {
                            name: "failComments",
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Form.Group>
                )}
                <Form.Group widths={3}>
                  <Form.Dropdown
                    selection
                    required
                    name='form-printer'
                    label='Printer'
                    options={
                      printerData &&
                      printerData.map((printer: any) => ({
                        key: printer.id,
                        text: printer.printer,
                        value: printer.id,
                      }))
                    }
                    placeholder='Select Printer'
                    onChange={(e: any) =>
                      handleChange(e, {
                        name: "printer",
                        value: e.target.value,
                      })
                    }
                    value={currentState.printer}
                  />
                  <Form.Input
                    id='form-duration'
                    name='duration'
                    label='Print Duration (minutes)'
                    value={currentState.duration}
                    onChange={(e: any) =>
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
                  value={currentState.comments}
                  onChange={(e: any) =>
                    handleChange(e, {
                      name: "comments",
                      value: e.target.value,
                    })
                  }
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
            disabled={!hasChanges}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default JobEdit
