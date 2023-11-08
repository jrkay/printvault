import React, { useState, useCallback, useEffect } from "react"
import {
  Form,
  Modal,
  Button,
  TextArea,
  Dropdown,
  DropdownProps,
  Checkbox,
} from "semantic-ui-react"
import { addPrintJob } from "@/api/printJob/_addPrintJob"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import { PrinterData } from "@/utils/AppRoutesProps"
import { jobStatusOptions, materialOptions } from "@/utils/const"

const JobUpload = ({
  activeModel,
  printerData,
}: {
  activeModel: any
  printerData: PrinterData[]
}) => {
  const [open, setOpen] = useState(false)

  const [type, setType] = useState("")
  const [duration, setDuration] = useState("")
  const [comments, setComments] = useState("")
  const [resin, setResin] = useState("")
  const [material_type, setMaterial_type] = useState("")
  const [model_id, setModel_id] = useState("")
  const [date, setDate] = useState([])
  const [printer, setPrinter] = useState("")
  const [status, setStatus] = useState("")
  const [filament, setFilament] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [printerOptions, setPrinterOptions] = useState<any[]>([])
  const [failComments, setFailComments] = useState("")

  const [failCheck, setFailCheck] = useState(false)

  useEffect(() => {
    // Map printerData to printer options for dropdown
    const options = printerData.map((printer: any) => ({
      key: printer.id,
      text: printer.printer,
      value: printer.printer,
    }))
    setPrinterOptions(options)
  }, [])

  const handleSubmit = async () => {
    try {
      setOpen(false)
      await addPrintJob({
        id: null,
        date: date,
        printer_id: printer,
        status: status,
        material_type: material_type,
        duration: duration,
        comments: comments,
        model_id: activeModel.id,
        fail_comment: failComments,
      })
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = useCallback(
    (e: any, { name, value }: { name: string; value: string }) => {
      setHasChanges(true)

      switch (name) {
        case "printer":
          setPrinter(value)
          break
        case "status":
          setType(value)
          break
        case "material_type":
          setMaterial_type(value)
          break
        case "duration":
          setDuration(value)
          break
        case "comments":
          setComments(value)
          break
        case "resin":
          setResin(value)
          break
        case "filament":
          setFilament(value)
          break
        case "model_Id":
          setModel_id(value)
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
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          Record a New Print Job for {activeModel?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Modal.Description>
            <Form>
              <Form.Group widths={2} style={{}}>
                {/* <div className={"formLabelOuter"} style={{ width: "100%" }}> */}
                <Form.Dropdown
                  selection
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
                    // minWidth: "200px",
                  }}
                >
                  <Form.Field label='Date of Job' />
                  <SemanticDatepicker onChange={handleDateChange} />
                </div>
                {/* </div> */}
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

              <label className='formLabel'>Comments</label>
              <Form.Field
                id='form-comments'
                name='comments'
                control={TextArea}
                value={comments}
                onChange={(e: any) => setComments(e.target.value)}
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Button color='black' onClick={() => handleModalClose()}>
            Cancel
          </Button>
          <Button
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
