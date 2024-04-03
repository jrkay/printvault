import { useParams } from "next/navigation"
import Link from "next/link"
import { Button, Grid, Header, Icon, Segment } from "semantic-ui-react"
import EditModel from "@/components/model/EditModel"
import EditProject from "@/components/project/EditProject"
import ImageGallery from "react-image-gallery"
import {
  FileData,
  ModelData,
  ModelTags,
  ProjectData,
  UserData,
} from "@/utils/appTypes"

export const ProjectDetailFields = ({
  modelData,
  projectData,
  projectModelData,
  isEdit,
}: {
  modelData: ModelData[]
  projectData: ProjectData[]
  projectModelData: any
  isEdit?: boolean
}) => {
  const { id } = useParams<{ id: string }>()

  // Find the active project using the 'id' parameter
  const activeProject = projectData.find((project) => project.id === id)

  if (isEdit) {
    return (
      <EditProject
        projectData={projectData}
        modelData={modelData}
        projectModelData={projectModelData}
      />
    )
  }

  // Extract project models with matching IDs
  const projectModelIds =
    projectModelData
      ?.filter((row: any) => row.project_id === activeProject?.id)
      .map((row: any) => row.model_id) || []

  const matchingModels = modelData.filter((model) =>
    projectModelIds.includes(model.id)
  )

  return (
    <>
      {activeProject && (
        <>
          <div>
            <h3>{activeProject.name}</h3>
            <div>
              Models:
              <br />
              {matchingModels.length
                ? matchingModels.map((model: ModelData) => (
                    <div key={model.id} style={{ marginTop: "10px" }}>
                      <Link href={`/models/${model.id}`}>{model.name}</Link>
                    </div>
                  ))
                : "None"}
            </div>
          </div>
          <div>
            Description: <br />
            {activeProject.description}
          </div>
        </>
      )}
    </>
  )
}
