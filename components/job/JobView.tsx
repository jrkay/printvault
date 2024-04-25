import React, { useState } from "react"
import {
  Form,
  Modal,
  Button,
  TextArea,
  Segment,
  Header,
  Label,
  SemanticCOLORS,
  Grid,
  Icon,
} from "semantic-ui-react"
import { JobProps, ModelProps } from "@/utils/appTypes"
import JobEdit from "./JobEdit"
import { formattedDate } from "@/utils/helpers/uiHelpers"

const JobView = ({
  activeModel,
  modalDisplay,
  activeJob,
  activeUser,
}: {
  activeModel?: ModelProps
  modalDisplay: string
  activeJob: any
  activeUser?: string
}) => {
  const [open, setOpen] = useState(false)

  const [duration, setDuration] = useState(activeJob?.comments || "")
  const [comments, setComments] = useState(activeJob?.comments || "")
  const [date, setDate] = useState(activeJob?.date || "")
  const [printer, setPrinter] = useState(activeJob?.printer_id || "")
  const [status, setStatus] = useState(activeJob?.status || "")
  const [failComments, setFailComments] = useState(
    activeJob?.fail_comment || ""
  )

  const toggleModal = () => setOpen(!open)

  function getStatusColor(status: SemanticCOLORS) {
    const statusColors: {
      Complete_successful: SemanticCOLORS
      Complete_errors: SemanticCOLORS
      Incomplete: SemanticCOLORS
      [key: string]: SemanticCOLORS
    } = {
      Complete_successful: "green",
      Complete_errors: "red",
      Incomplete: "yellow",
    }

    return statusColors[status] || "grey"
  }

  const color = getStatusColor(activeJob.status)

  return (
    <>
      <Modal
        onClose={() => toggleModal()}
        onOpen={() => toggleModal()}
        open={open}
        trigger={
          <a onClick={() => null} style={{ cursor: "pointer" }}>
            {modalDisplay} <Icon name='angle right' />
          </a>
        }
      >
        <Modal.Header className='.bg-000-95'>
          View Print Job Details - {activeModel?.name}
        </Modal.Header>
        <Modal.Content className='.bg-000-95'>
          <Modal.Description>
            <Segment className='darkBg' color='violet'>
              <Grid columns={2}>
                <Grid.Column>
                  <Header as='h5'>Date:</Header>
                  {formattedDate(date)}
                </Grid.Column>
                <Grid.Column>
                  <Header as='h5'>Duration:</Header>
                  {duration ? duration : "Not Recorded"}
                </Grid.Column>
                <Grid.Column>
                  <Header as='h5'>Printer:</Header>
                  {printer}
                </Grid.Column>
                <Grid.Column>
                  <Header as='h5' style={{ marginBottom: "0px" }}>
                    Status:
                  </Header>
                  <Label
                    size='large'
                    color={color}
                    basic
                    style={{ cursor: "default" }}
                  >
                    {activeJob.status}
                  </Label>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h5'>Print Notes:</Header>
                  {comments || "No Comments"}
                </Grid.Column>
                <Grid.Column>
                  {failComments && (
                    <>
                      <Header as='h5'>Problem Description:</Header>
                      {failComments}
                    </>
                  )}
                </Grid.Column>
              </Grid>
            </Segment>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions className='.bg-000-95'>
          {activeUser == activeJob.user_id ? (
            <JobEdit
              activeModel={activeModel}
              activeJob={activeJob}
              printerData={[]}
              modalDisplay={"Edit Print Job"}
            />
          ) : (
            <></>
          )}
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
