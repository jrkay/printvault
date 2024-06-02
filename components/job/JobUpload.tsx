import React, { useState, useCallback, useEffect } from "react"
import {
  Form,
  Modal,
  Button,
  TextArea,
  DropdownProps,
  Segment,
  Icon,
} from "semantic-ui-react"
import { addPrintJob } from "@/api/api/printJobApi"
import { ModelProps } from "@/utils/appTypes"
import { jobStatusOptions } from "@/utils/uiConstants"
import { User } from "@supabase/supabase-js"
import { v4 as uuidv4 } from "uuid"
import { getPrintMaterialOptions } from "@/api/api/printerApi"

const JobUpload = ({
  activeModel,
  printerData,
  activeUser,
  disabled,
}: {
  activeModel?: ModelProps
  printerData: any
  activeUser: User
  disabled?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState("")
  const [comments, setComments] = useState("")
  const [date, setDate] = useState("")
  const [printer, setPrinter] = useState<{ id: string; type: string } | null>(
    null
  )
  const [status, setStatus] = useState("")
  const [failComments, setFailComments] = useState("")
  const [hasChanges, setHasChanges] = useState(false)
  const [materialOptions, setMaterialOptions] = useState<string[]>([])
  const [material, setMaterial] = useState("")

  useEffect(() => {
    if (printer) {
      getPrintMaterialOptions(printer.type)
        .then((res: any) => {
          setMaterialOptions(res)
        })
        .catch((error) => {
          console.error("Error fetching resin:", error)
        })
    }
  }, [printer])

  useEffect(() => {
    const formFields = [
      duration,
      comments,
      date,
      printer?.id,
      status,
      failComments,
    ]
    const changed = formFields.some((field) => field && field.trim() !== "")
    setHasChanges(changed)
  }, [duration, comments, date, printer, status, failComments])

  useEffect(() => {
    if (status !== "Complete (with errors)" && status !== "Failed") {
      setFailComments("")
    }
  }, [status])

  const handleSubmit = async () => {
    const newModelId = uuidv4()
    try {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, "0") // Adding 1 because months are zero-indexed
      const day = String(today.getDate()).padStart(2, "0")

      const todaysDate = `${year}-${month}-${day}`

      setOpen(false)

      await addPrintJob({
        created_at: todaysDate,
        id: newModelId,
        date,
        printer_id: printer?.id,
        status,
        duration,
        comments,
        model_id: activeModel?.id,
        fail_comment: failComments,
        user_id: activeUser.id,
        material_id: material,
      })
    } catch (error) {
      console.error("Error submitting:", error)
    }
  }

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      { name, value }: { name: string; value: string }
    ) => {
      switch (name) {
        case "printer":
          setPrinter(JSON.parse(value))
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
        case "date":
          setDate(value)
          break
        case "status":
          setStatus(value)
          break
        case "material":
          setMaterial(value)
          break
        default:
          break
      }
    },
    []
  )

  const toggleModal = () => {
    setOpen(!open)
    setHasChanges(false)
    if (!open) {
      setDuration("")
      setComments("")
      setDate("")
      setPrinter(null)
      setStatus("")
      setFailComments("")
    }
  }

  return (
    <>
      <Modal
        onClose={() => toggleModal()}
        onOpen={() => toggleModal()}
        open={open}
        trigger={
          <Icon
            name='plus'
            style={{ cursor: "pointer", float: "right" }}
            color='violet'
            size='large'
            disabled={disabled}
            onClick={() => toggleModal()}
          />
        }
      >
        <Modal.Header className='.bg-000-95'>
          Record a New Print Job for {activeModel?.name}
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
                    required
                    type='date'
                    placeholder='YYYY-MM-DD'
                    onChange={(e) =>
                      handleChange(e, {
                        name: "date",
                        value: e.target.value,
                      })
                    }
                  />
                  <Form.Dropdown
                    selection
                    name='form-status'
                    label='Status'
                    required
                    options={jobStatusOptions}
                    placeholder='Select Status'
                    onChange={(e: any, { value }: DropdownProps) =>
                      setStatus(value as string)
                    }
                    value={status}
                  />
                </Form.Group>
                <Form.Group widths={2}>
                  {status && status != "Complete (Successful)" && (
                    <>
                      <Form.Field
                        id='form-comments'
                        name='failComments'
                        label='What went wrong?'
                        control={TextArea}
                        value={failComments}
                        onChange={(e: any) => setFailComments(e.target.value)}
                      />
                    </>
                  )}
                </Form.Group>
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
                        value: JSON.stringify({
                          id: printer.id,
                          type: printer.type,
                        }),
                      }))
                    }
                    placeholder='Select Printer'
                    onChange={(e: any, { value }: DropdownProps) =>
                      handleChange(e, {
                        name: "printer",
                        value: value as string,
                      })
                    }
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
                {printer !== null && (
                  <Form.Group widths={3}>
                    <Form.Dropdown
                      selection
                      name='form-material'
                      label='Material Type'
                      options={materialOptions.map((materialItem: any) => ({
                        key: materialItem.id,
                        text: `${materialItem.manufacturer} ${materialItem.type} [${materialItem.color}]`,
                        value: materialItem.id,
                      }))}
                      placeholder='Select Material'
                      onChange={(e: any, { value }: DropdownProps) =>
                        handleChange(e, {
                          name: "material",
                          value: value as string,
                        })
                      }
                    />
                  </Form.Group>
                )}
                <Form.Field
                  label='Comments'
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
            disabled={!hasChanges}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default JobUpload
