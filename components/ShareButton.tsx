import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button, Input, Segment } from "semantic-ui-react"
import { ProjectData } from "@/utils/appTypes"

const ShareButton = ({ activeProject }: { activeProject: ProjectData }) => {
  const [emailToShareWith, setEmailToShareWith] = useState("")
  const [sharingStatus, setSharingStatus] = useState("")

  // Function to share projectwith another user by email
  const handleShareRow = async () => {
    const supabase = createClientComponentClient() // Initialize Supabase client

    // Find user ID based on email
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", emailToShareWith)
      .single()

    if (userError || !userData) {
      setSharingStatus("User not found!")
      return
    }

    // Fetch the current shared_with array for the project
    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("shared_with")
      .eq("id", activeProject.id)
      .single()

    if (projectError || !projectData) {
      setSharingStatus("Failed to find the project.")
      return
    }

    // Check if the user is already present in the shared_with array
    let sharedWithArray = projectData.shared_with || []
    if (sharedWithArray.includes(userData.id)) {
      setSharingStatus("User already has access to this project.")
      return // Exit if the user is already in the shared_with array
    }

    sharedWithArray = [...sharedWithArray, userData.id] // Append the new user's ID

    // Begin a transaction to update both the projects and project_model tables
    const { error: transactionError } = await supabase
      .from("projects")
      .update({ shared_with: sharedWithArray })
      .eq("id", activeProject.id)

    if (transactionError) {
      setSharingStatus(
        `Failed to share the project. Error: ${transactionError.message}`
      )
      return
    }

    // Check the project_model table for related rows
    const { data: projectModelData, error: modelError } = await supabase
      .from("project_models")
      .select("model_id")
      .eq("project_id", activeProject.id)

    if (modelError) {
      setSharingStatus("Failed to check project models.")
      return
    }

    // If there are related models, update their shared_with column
    if (projectModelData && projectModelData.length > 0) {
      // Fetch the current shared_with array for each related model
      for (const projectModel of projectModelData) {
        const { data: modelData, error: modelError } = await supabase
          .from("models")
          .select()
          .eq("id", projectModel.model_id)

        if (modelError) {
          setSharingStatus("Failed to check models.")
          return
        }
        for (const model of modelData) {
          const modelSharedWith = model.shared_with
            ? [...model.shared_with, userData.id]
            : [userData.id]

          // Update each related model's shared_with column
          const { error: modelUpdateError } = await supabase
            .from("models")
            .update({ shared_with: modelSharedWith })
            .eq("id", model.id)

          if (modelUpdateError) {
            setSharingStatus(
              `Failed to share a model. Error: ${modelUpdateError.message}`
            )
            return
          }
        }
      }
    }

    setSharingStatus("Project and related models shared successfully!")
  }

  return (
    <Segment color='violet' className='darkBg' padded='very'>
      <Input
        style={{ marginBottom: "10px", width: "50%" }}
        type='email'
        placeholder="Enter user's email"
        value={emailToShareWith}
        onChange={(e) => setEmailToShareWith(e.target.value)}
      />
      <Button
        basic
        color='violet'
        content='Share Project'
        style={{ marginLeft: "10px" }}
        onClick={handleShareRow}
      />
      <p style={{ fontSize: "1.2em", marginTop: "10px" }}>
        User will have read-only access to all models in the project
      </p>
      {sharingStatus && (
        <p
          style={{
            border: "1px solid maroon",
            padding: "10px",
            fontSize: "1.2em",
          }}
        >
          {sharingStatus}
        </p>
      )}
    </Segment>
  )
}

export default ShareButton
