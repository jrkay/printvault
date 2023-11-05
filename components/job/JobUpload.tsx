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
import { addPrintJob } from "@/api/printJob/addPrintJob"
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
    // // Map printerData to printer options for dropdown
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
        printer: printer,
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
          Record a Print Job - {activeModel?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Modal.Description>
            <Form>
              <Form.Group>
                <div className={"formLabelOuter"}>
                  <label className='formLabel'>Date of Job</label>
                  <SemanticDatepicker onChange={handleDateChange} />
                </div>
                <div className={"formLabelOuter"}>
                  <label className='formLabel'>Print Duration (minutes)</label>
                  <Form.Input
                    id='form-duration'
                    name='duration'
                    value={duration}
                    onChange={(e) =>
                      handleChange(e, {
                        name: "duration",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <div className={"formLabelOuter"}>
                  {/*  This selection auto-assigns material type, and user can select specific material */}
                  <label className='formLabel'>Printer</label>
                  <Dropdown
                    selection
                    name='form-printer'
                    options={printerOptions}
                    placeholder={printer}
                    onChange={(e: any, { value }: DropdownProps) =>
                      setPrinter(value as string)
                    }
                    value={printer}
                  />
                </div>
                {/* This should trigger additional dropdown (with specific RESIN or FILAMENT), and map to tables */}
                <div className={"formLabelOuter"}>
                  <label className='formLabel'>Resin or Filament</label>
                  <Dropdown
                    selection
                    name='form-type'
                    options={materialOptions}
                    placeholder={material_type}
                    onChange={(e: any, { value }: DropdownProps) =>
                      setMaterial_type(value as string)
                    }
                    value={material_type}
                  />
                </div>
                <div className={"formLabelOuter"}>
                  <label className='formLabel'>Status</label>
                  <Dropdown
                    selection
                    name='form-status'
                    options={jobStatusOptions}
                    placeholder={status}
                    onChange={(e: any, { value }: DropdownProps) =>
                      setStatus(value as string)
                    }
                    value={status}
                  />
                </div>
              </Form.Group>
              <Form.Group>
                <div className={"formLabelOuter"} style={{ textAlign: "left" }}>
                  <label className='formLabel'>Failed Print?</label>
                  <Checkbox
                    onChange={(e, data) =>
                      data.checked !== undefined && setFailCheck(data.checked)
                    }
                    checked={failCheck}
                  />
                </div>
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
