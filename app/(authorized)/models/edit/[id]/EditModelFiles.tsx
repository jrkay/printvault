import React from "react"
import { Segment, Icon, Header } from "semantic-ui-react"
import FileDelete from "@/components/file/FileDelete"
import { FileProps } from "@/utils/appTypes"
import FileUpload from "@/components/file/FileUpload"
import { formatFileSize } from "@/utils/helpers/uiHelpers"

const EditModelFiles = ({
  fileData,
  activeModel,
  activeUser,
  onFileDataChange,
}: {
  fileData: any
  activeModel: any
  activeUser: any
  onFileDataChange: any
}) => {
  const renderFiles = () => {
    const modelFiles = fileData
      .filter((file: FileProps) => file.model_id === activeModel?.id)
      .map((file: FileProps, index: number) => {
        const extension = file.href.match(/\.(\w{3})(?=\?|$)/)?.[1]
        return (
          <div key={index}>
            <FileDelete
              file={file}
              activeUser={activeUser}
              modalDisplay={
                <Icon
                  name='minus square outline'
                  style={{
                    cursor: "pointer",
                    padding: "0",
                    margin: "0 5px 0 0",
                  }}
                  size='large'
                />
              }
              onFileDelete={onFileDataChange}
            />
            <a href={file.href} download style={{ fontSize: "18px" }}>
              {activeModel?.name}.{extension} [
              {formatFileSize(parseFloat(file.size))}]
            </a>
            <br />
          </div>
        )
      })

    if (modelFiles.length === 0) {
      return "No Files Available"
    }

    return modelFiles
  }

  return (
    <Segment color='violet' padded='very'>
      <Header as='h4'>
        Model Files (
        {
          fileData.filter(
            (file: FileProps) => file.model_id === activeModel?.id
          ).length
        }
        )
        <br />
        <FileUpload
          activeModel={activeModel}
          activeUser={activeUser}
          modalDisplay={
            <Icon
              name='plus square outline'
              style={{ cursor: "pointer", padding: "0" }}
              size='large'
            />
          }
          onUpload={onFileDataChange}
        />
      </Header>
      {renderFiles()}
    </Segment>
  )
}

export default EditModelFiles
