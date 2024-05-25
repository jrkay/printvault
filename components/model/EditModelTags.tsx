import React, { useState, useEffect } from "react"
import { Form, Segment, Icon, Button } from "semantic-ui-react"
import { addModelTags, deleteModelTags } from "@/api/api/modelTagApi"
import { v4 as uuidv4 } from "uuid"
import { ModelTagProps } from "@/utils/appTypes"

const ModelTags = ({
  modelTags,
  activeModelId,
}: {
  modelTags: ModelTagProps[]
  activeModelId?: string
}) => {
  const [newTag, setNewTag] = useState("")
  const [filteredTags, setFilteredTags] = useState<JSX.Element[]>([])

  useEffect(() => {
    if (modelTags.length === 0) {
      setFilteredTags([
        <span key='no-tags' style={{ padding: "6px 10px" }}>
          No Tags
        </span>,
      ])
    } else {
      setFilteredTags(
        modelTags.map((tag) => (
          <span
            key={tag.tag_id}
            style={{
              padding: "5px 10px",
              borderRadius: "5px",
              margin: "0 3px",
              fontSize: ".85em",
              boxShadow: "0 0 0 1px #6435c9 inset !important",
              color: "#6435c9",
              border: "1px solid lightgrey",
              background: "#f9fafb",
            }}
          >
            <Icon
              name='close'
              style={{ cursor: "pointer" }}
              onClick={() => handleTagButtonDelete(tag)}
            />{" "}
            {tag.name}
          </span>
        ))
      )
    }
  }, [modelTags])

  const handleTagChange = (e: any, { value }: { value: string }) => {
    setNewTag(value)
  }

  const handleTagSubmit = async () => {
    await addModelTags({
      name: newTag.toLowerCase(),
      id: uuidv4(),
      model_id: activeModelId,
    })
    setNewTag("")
  }

  const handleTagButtonDelete = async (tag: ModelTagProps) => {
    try {
      await deleteModelTags({
        tag_id: tag.id,
        model_id: activeModelId,
      })
    } catch (error) {
      console.error("Error deleting model tags:", error)
    }
  }

  return (
    <>
      <Segment color='violet' padded='very'>
        <Form>
          <Form.Group style={{ display: "flex", alignItems: "flex-end" }}>
            <Form.Input
              id='form-tag'
              name='tag'
              placeholder={"Add a Tag..."}
              label='Tags'
              value={newTag}
              onChange={(e, { value }) => handleTagChange(e, { value })}
            />
            <Button
              basic
              color='violet'
              icon='add'
              onClick={() => handleTagSubmit()}
              disabled={!newTag}
              style={{ padding: "12px" }}
            />
          </Form.Group>
        </Form>
        <div style={{ width: "100%", padding: "0 0 10px 0px" }}>
          {filteredTags}
        </div>
      </Segment>
    </>
  )
}

export default ModelTags
