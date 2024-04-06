import React, { useState, useCallback } from "react"
import {
  Form,
  Modal,
  Button,
  TextArea,
  DropdownProps,
  Segment,
} from "semantic-ui-react"
import { addPrintJob } from "@/api/api/printJobApi"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import { ModelProps, PrinterProps } from "@/utils/appTypes"
import { jobStatusOptions } from "@/utils/uiConstants"
import { User } from "@supabase/supabase-js"

const JobUpload = ({
  activeModel,
  printerData,
  userData,
}: {
  activeModel?: ModelProps
  printerData: PrinterProps[]
  userData?: string
}) => {
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState("")
  const [comments, setComments] = useState("")
  const [date, setDate] = useState()
  const [printer, setPrinter] = useState("")
  const [status, setStatus] = useState("")
  const [failComments, setFailComments] = useState("")
  const [failCheck, setFailCheck] = useState(false)

  const printerOptions = printerData.map((printer) => ({
    key: printer.id,
    text: printer.printer,
    value: printer.id,
  }))

  const handleSubmit = async () => {
    try {
      const activeUser = userData
      setOpen(false)

      await addPrintJob({
        date: date,
        printer_id: printer,
        status: status,
        duration: duration,
        comments: comments,
        model_id: activeModel?.id,
        fail_comment: failComments,
        user_id: activeUser,
      })

      window.location.reload()
    } catch (error) {
      console.error("Error submitting:", error)
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
            Record Print Job
          </a>
        }
      >
        <Modal.Header className='.bg-000-95'>
          Record a New Print Job for {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <Segment className='darkBg' padded='very' color='violet'>
              <Form>
                <Form.Group widths={2}>
                  <Form.Dropdown
                    selection
                    name='form-status'
                    label='Status'
                    required
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
                    <Form.Field label='Date of Job' required />
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
                          required={failCheck}
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
                    name='form-printer'
                    label='Printer'
                    required
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
                <label className='formLabel'>Comments</label>
                <Form.Field
                  id='form-comments'
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
          <Button
            basic
            color='violet'
            content='Cancel'
            onClick={() => toggleModal()}
          />
          <Button
            basic
            color='violet'
            content='Add Print Job'
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

export default JobUpload
