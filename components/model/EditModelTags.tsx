import React, { useState, useEffect } from "react"
import { Form, Segment } from "semantic-ui-react"
import { addModelTags, deleteModelTags } from "@/api/api/modelTagApi"
import { v4 as uuidv4 } from "uuid"

const ModelTags = ({
  modelTags,
  activeModelId,
}: {
  modelTags: string[]
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
            key={tag}
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
            {tag}
            {/* <Icon
              name="close"
              style={{ cursor: "pointer" }}
              onClick={() => handleTagButtonDelete(tag)}
            /> */}
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
  }

  const handleTagButtonDelete = async (tag: string) => {
    try {
      await deleteModelTags({
        tag_id: tag,
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
          <Form.Group widths={2}>
            <Form.Input
              id='form-tag'
              name='tag'
              required
              action={{
                icon: "add",
                onClick: () => {
                  handleTagSubmit()
                },
              }}
              placeholder={"Add a Tag..."}
              label='Tags'
              onChange={(e, { value }) => handleTagChange(e, { value })}
            />
          </Form.Group>
        </Form>
        <p style={{ fontSize: "1em", margin: "0 0 10px 0px" }}>
          Click to Remove Tag
        </p>
        <div style={{ width: "100%", padding: "0 0 10px 0px" }}>
          {filteredTags}
        </div>
      </Segment>
    </>
  )
}

export default ModelTags
