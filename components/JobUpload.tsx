import React, { useState, useCallback, useEffect } from "react"
import {
  Form,
  Modal,
  Button,
  Header,
  TextArea,
  Dropdown,
  DropdownProps,
} from "semantic-ui-react"
import { addPrintJob } from "@/app/helpers/updateHelpers"
import SemanticDatepicker from "react-semantic-ui-datepickers"

const statusOptions = [
  { key: "1", text: "FDM & Resin", value: "both" },
  { key: "2", text: "Resin", value: "resin" },
  { key: "3", text: "FDM", value: "FDM" },
]

const materialOptions = [
  { key: "1", text: "FDM & Resin", value: "both" },
  { key: "2", text: "Resin", value: "resin" },
  { key: "3", text: "FDM", value: "FDM" },
]

// resinOptions and filamentOptions should be mapped from table
// PRINTER dropdown option sets material type
// const resinOptions = [
//   { key: "1", text: "FDM & Resin", value: "both" },
//   { key: "2", text: "Resin", value: "resin" },
//   { key: "3", text: "FDM", value: "FDM" },
// ]

const JobUpload = ({
  activeFile,
  printerData,
}: {
  activeFile: any
  printerData: any
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

  useEffect(() => {
    // // Map printerData to printer options for dropdown
    const options = printerData.map((printer: any) => ({
      key: printer.id,
      text: printer.printer,
      value: printer.printer,
    }))
    setPrinterOptions(options)
  }, [])

  useEffect(() => {
    console.log("printer options", printerOptions)
  }, [printerOptions])

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
        // resin: resin,
        // filament: filament,
        model_id: activeFile.id,
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
          Record a Print Job - {activeFile?.name}
        </Modal.Header>
        <Modal.Content
          style={{
            color: "black !important",
            backgroundColor: "rgb(0, 0, 0, .95)",
          }}
        >
          <Modal.Description>
            {/* <Form onSubmit={handleSubmit}> */}
            <Form>
              <Header as='h4'>Date of Job</Header>
              <SemanticDatepicker onChange={handleDateChange} />
              <Header as='h4'>Print Duration (minutes)</Header>
              <Form.Input
                id='form-duration'
                name='duration'
                value={duration}
                onChange={(e) =>
                  handleChange(e, { name: "duration", value: e.target.value })
                }
              />
              {/*  This selection auto-assigns material type, and user can select specific material */}
              <Header as='h4'>Printer</Header>
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

              {/* This should trigger additional dropdown (resin or filament) 
              Map to tables */}
              <Header as='h4'>Material Type</Header>
              <Dropdown
                selection
                name='form-type'
                options={materialOptions}
                placeholder={type}
                onChange={(e: any, { value }: DropdownProps) =>
                  setMaterial_type(value as string)
                }
                value={type}
              />

              <Header as='h4'>Status</Header>
              <Dropdown
                selection
                name='form-status'
                options={statusOptions}
                placeholder={status}
                onChange={(e: any, { value }: DropdownProps) =>
                  setStatus(value as string)
                }
                value={status}
              />
              <Header as='h4'>Comments</Header>
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
            // disabled={!hasChanges}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default JobUpload
