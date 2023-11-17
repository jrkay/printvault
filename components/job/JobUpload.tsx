import React, { useState, useCallback, useEffect } from "react"
import {
  Form,
  Modal,
  Button,
  TextArea,
  DropdownProps,
  Segment,
} from "semantic-ui-react"
import { addPrintJob } from "@/api/printJob/_addPrintJob"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import { PrinterData } from "@/utils/AppRoutesProps"
import { jobStatusOptions } from "@/utils/const"

const JobUpload = ({
  activeModel,
  printerData,
  userData,
}: {
  activeModel: any
  printerData: PrinterData[]
  userData: any
}) => {
  const [open, setOpen] = useState(false)

  const [duration, setDuration] = useState("")
  const [comments, setComments] = useState("")
  const [date, setDate] = useState()
  const [printer, setPrinter] = useState("")
  const [status, setStatus] = useState("")
  const [printerOptions, setPrinterOptions] = useState<any[]>([])
  const [failComments, setFailComments] = useState("")

  const [failCheck, setFailCheck] = useState(false)

  useEffect(() => {
    // Map printerData to printer options for dropdown
    const options = printerData.map((printer: any) => ({
      key: printer.id,
      text: printer.printer,
      value: printer.id,
    }))
    setPrinterOptions(options)
  }, [])

  const handleSubmit = async () => {
    try {
      const activeUser = userData[0].id
      setOpen(false)

      await addPrintJob({
        date: date,
        printer: printer,
        status: status,
        duration: duration,
        comments: comments,
        model_id: activeModel.id,
        fail_comment: failComments,
        user_id: activeUser,
      })

      window.location.reload()
    } catch (error) {
      console.error(error)
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

  const handleModalClose = () => {
    setOpen(false)
  }
  const handleModalOpen = () => {
    setOpen(true)
  }

  const handleDateChange = (event: any, data: any) => setDate(data.value)

  return (
    <>
      <Modal
        onClose={() => handleModalClose()}
        onOpen={() => handleModalOpen()}
        open={open}
        trigger={
          <a onClick={() => null} style={{ cursor: "pointer" }}>
            Record Print Job
          </a>
        }
      >
        <Modal.Header
          style={{
            color: "black !important",
          }}
          className='.bg-000-95'
        >
          Record a New Print Job for {activeModel?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
          }}
          className='.bg-000-95'
        >
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
        <Modal.Actions
          style={{
            color: "black !important",
          }}
          className='.bg-000-95'
        >
          <Button
            basic
            color='violet'
            content='Cancel'
            onClick={() => handleModalClose()}
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
