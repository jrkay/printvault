import React from 'react'
import { Table, List } from 'semantic-ui-react'


const FileTable = ({ fileData }: { fileData: any[] }) => (
  <Table basic='very' celled collapsing className='fileTable'>
    <Table.Body>
      {fileData.map((file: any) => (
        <Table.Row key={file.id}>
          <Table.Cell>
            <List.Item as='a' href={'/' + file.id}>{file.name}</List.Item>
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