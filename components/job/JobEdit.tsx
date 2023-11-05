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
import { updatePrintJob } from "@/api/printJob/updatePrintJob"
import { deletePrintJob } from "@/api/printJob/deletePrintJob"
import SemanticDatepicker from "react-semantic-ui-datepickers"
import { PrinterData } from "@/utils/AppRoutesProps"
import { jobStatusOptions, materialOptions } from "@/utils/const"

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

  const [type, setType] = useState("")
  const [duration, setDuration] = useState(activeJobData.comments || "")
  const [comments, setComments] = useState(activeJobData.comments || "")
  const [resin, setResin] = useState(activeJobData.resin || "")
  const [material_type, setMaterial_type] = useState(
    activeJobData.material_type || ""
  )
  const [model_id, setModel_id] = useState("")
  const [date, setDate] = useState(activeJobData.date || [])
  const [printer, setPrinter] = useState(activeJobData.printer || "")
  const [status, setStatus] = useState(activeJobData.status || "")
  const [filament, setFilament] = useState(activeJobData.filament || "")
  const [hasChanges, setHasChanges] = useState(false)
  const [printerOptions, setPrinterOptions] = useState<any[]>([])
  const [failComments, setFailComments] = useState(
    activeJobData.fail_comment || ""
  )
  const [deleteCheck, setDeleteCheck] = useState(false)

  const [failCheck, setFailCheck] = useState(failComments.length > 0)

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
      await updatePrintJob({
        id: activeJob,
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

  const handleDelete = async () => {
    try {
      setOpen(false) // TODO optimize loading
      await deletePrintJob({
        id: activeJob,
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
            {modalDisplay}
          </a>
        }
      >
        <Modal.Header
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          Edit Print Job - {activeModel?.name}
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
          <div
            className={"formLabelOuter"}
            style={{ textAlign: "left", marginTop: "10px" }}
          >
            <label className='formLabel'>Delete Print Job?</label>
            <Checkbox
              onChange={(e, data) =>
                data.checked !== undefined && setDeleteCheck(data.checked)
              }
              checked={deleteCheck}
            />
          </div>
        </Modal.Content>
        <Modal.Actions
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          {deleteCheck && (
            <>
              <Button
                content='Delete Print Job'
                labelPosition='right'
                icon='checkmark'
                onClick={() => handleDelete()}
                negative
              />
            </>
          )}
          <Button color='black' onClick={() => handleModalClose()}>
            Cancel
          </Button>
          <Button
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
