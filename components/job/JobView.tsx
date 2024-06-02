import React, { useEffect, useState } from "react"
import {
  Modal,
  Button,
  Segment,
  Header,
  Label,
  SemanticCOLORS,
  Grid,
  Icon,
} from "semantic-ui-react"
import { ModelProps } from "@/utils/appTypes"
import JobEdit from "./JobEdit"
import { formattedDate } from "@/utils/helpers/uiHelpers"
import { getPrintMaterialName } from "@/api/api/printerApi"

const JobView = ({
  activeModel,
  modalDisplay,
  activeJob,
  activeUser,
  printerData,
}: {
  activeModel: ModelProps
  modalDisplay?: string
  activeJob: any
  activeUser: string
  printerData: any
}) => {
  const [open, setOpen] = useState(false)
  const [material, setMaterial] = useState<any | null>(null)
  const toggleModal = () => setOpen(!open)

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        if (activeJob?.material_id) {
          const materialData = await getPrintMaterialName(activeJob.material_id)
          setMaterial(materialData)
        } else {
          setMaterial(null)
        }
      } catch (err) {
        console.error("Error fetching material data:", err)
      }
    }

    fetchMaterial()
  }, [activeJob])

  function getStatusColor(status: string): SemanticCOLORS {
    const statusColors: { [key: string]: SemanticCOLORS } = {
      "Complete (Successful)": "green",
      "Complete (With Errors)": "yellow",
      Cancelled: "grey",
      Failed: "red",
    }

    return statusColors[status] || "grey"
  }

  function renderStatusLabel(status: string) {
    const color = getStatusColor(status)
    return (
      <Label size='medium' color={color} basic>
        {status}
      </Label>
    )
  }

  function getPrinterName(printer_id: string) {
    const printer = printerData.find((p: any) => p.id === printer_id)
    return printer ? printer.printer : "Unknown Printer"
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
            content='View'
            onClick={() => toggleModal()}
          />
        }
      >
        <Modal.Header className='.bg-000-95'>
          View Print Job Details - {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <Segment color='violet'>
              <Grid columns={2}>
                <Grid.Column>
                  <Header as='h5'>Date</Header>
                  {formattedDate(activeJob.date)}
                </Grid.Column>
                <Grid.Column>
                  <Header as='h5' style={{ marginBottom: "0px" }}>
                    Status
                  </Header>
                  {renderStatusLabel(activeJob.status)}
                </Grid.Column>
                <Grid.Column>
                  <Header as='h5'>Printer</Header>
                  {getPrinterName(activeJob.printer_id)} [
                  {material.manufacturer} {material.type} - {material.color}]
                </Grid.Column>
                <Grid.Column>
                  <Header as='h5'>Duration</Header>
                  {activeJob.duration === null
                    ? "Not Recorded"
                    : activeJob.duration + " minutes"}
                </Grid.Column>
                <Grid.Column>
                  <Header as='h5'>Comments</Header>
                  {activeJob.comments || "No Comments"}
                </Grid.Column>
                <Grid.Column>
                  {activeJob.failComments && (
                    <>
                      <Header as='h5'>Problem Description</Header>
                      {activeJob.failComments}
                    </>
                  )}
                </Grid.Column>
              </Grid>
            </Segment>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          <Button
            basic
            color='violet'
            content='Close'
            onClick={() => toggleModal()}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default JobView
