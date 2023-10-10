import React from 'react'
import { Table } from 'semantic-ui-react'
import {Link} from "react-router-dom";

const FileTable = ({ fileData }: { fileData: any[] }) => (

<Table celled selectable>
    <Table.Body>
      {fileData.map((file: any) => (
        <Table.Row key={file.id}>
          <Table.Cell>
            <Link to={'/file/' + file.id}>{file.name}</Link>
          </Table.Cell>
          <Table.Cell>{file.description}</Table.Cell>
          <Table.Cell>{file.url}</Table.Cell>
          <Table.Cell>{file.user_id}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)

export default FileTable