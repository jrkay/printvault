import { ModelDetailFields, ProjectDetailFields } from "@/api/detailHelpers"
import {
  FileData,
  ModelData,
  ModelTags,
  ProjectData,
  ProjectModelData,
  UserData,
} from "@/utils/AppRoutesProps"

function DetailsExpanded({
  activeUser,
  modelData,
  projectData,
  projectModelData,
  imageData,
  page,
  isEdit,
  modelTags,
  fileData,
  userData,
}: {
  activeUser: UserData[]
  modelData: ModelData[]
  projectData: ProjectData[]
  projectModelData: ProjectModelData[]
  page?: string
  imageData: ImageData[]
  isEdit?: boolean
  modelTags: ModelTags[]
  fileData: FileData[]
  userData: UserData[]
}) {
  return (
    <>
      <div>
        {page === "Models" && (
          <ModelDetailFields
            modelData={modelData}
            imageData={imageData}
            activeUser={activeUser}
            isEdit={isEdit}
            modelTags={modelTags}
            fileData={fileData}
            userData={userData}
          />
        )}
        {page === "Projects" && (
          <ProjectDetailFields
            modelData={modelData}
            projectData={projectData}
            projectModelData={projectModelData}
            isEdit={isEdit}
          />
        )}
      </div>
    </>
  )
}

export default DetailsExpanded
