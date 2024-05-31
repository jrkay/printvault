import { addModelTag, getAllTags } from "@/api/api/modelTagApi"
import { ModelTagProps } from "@/utils/appTypes"
import React, { useState, useEffect } from "react"
import { Icon } from "semantic-ui-react"
import { v4 as uuidv4 } from "uuid"

const TagSuggestion = ({
  activeModelId,
  existingTags,
  onModelTagChange,
}: {
  activeModelId: string
  existingTags: any[]
  onModelTagChange: any
}) => {
  const [tagList, setTagList] = useState<ModelTagProps[]>([])
  const [tagCounts, setTagCounts] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTags()
        // Filter out existing tags
        const filteredTags = tags.filter(
          (tag) =>
            !existingTags.find((existingTag) => existingTag.id === tag.id)
        )
        const counts = countTags(filteredTags)
        setTagList(filteredTags)
        setTagCounts(counts)
      } catch (error) {
        console.error("Error fetching tags:", error)
      }
    }

    fetchTags()
  }, [activeModelId, existingTags])

  const countTags = (tags: ModelTagProps[]) => {
    const tagCounts: { [key: string]: number } = {}
    tags.forEach((tag) => {
      tagCounts[tag.name || ""] = (tagCounts[tag.name || ""] || 0) + 1
    })
    return tagCounts
  }

  const handleAddTag = async (tag: ModelTagProps) => {
    try {
      await addModelTag({
        name: tag.name,
        id: uuidv4(),
        model_id: activeModelId,
      })

      // Remove the added tag from tagList
      const updatedTagList = tagList.filter((t) => t.name !== tag.name)
      const counts = countTags(updatedTagList)

      setTagList(updatedTagList)
      setTagCounts(counts)
      onModelTagChange()
    } catch (error) {
      console.error("Error adding tag:", error)
    }
  }

  return (
    <>
      <h5>Suggested Tags</h5>
      {Object.entries(tagCounts).map(([tagName, totalCount]) => (
        <div
          key={tagName}
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            margin: "0 3px",
            fontSize: ".85em",
            boxShadow: "0 0 0 1px #6435c9 inset !important",
            color: "#6435c9",
            border: "1px solid lightgrey",
            background: "#f9fafb",
            display: "inline-flex",
          }}
        >
          <Icon
            name='add'
            style={{ cursor: "pointer" }}
            onClick={() =>
              handleAddTag(tagList.find((tag) => tag.name === tagName)!)
            }
          />
          {tagName}
        </div>
      ))}
    </>
  )
}

export default TagSuggestion
