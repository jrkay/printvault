import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, Header, Image, Input, Form } from "semantic-ui-react";

export const FileDetailFields = ({
  fileData,
  projectData,
  isEdit,
}: {
  fileData: any;
  projectData: any;
  isEdit?: any;
}) => {
  const { id } = useParams<{ id: string }>();
  const activeFile = fileData.find((file: any) => file.id === id);

  if (isEdit) {
    return (
      <>
        <span>This will be a form</span>
      </>
    );
  }

  return (
    <>
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={8}>
            <Image alt='' src='https://bit.ly/placeholder-img' />
          </Grid.Column>
          <Grid.Column width={8}>
            <div>
              <Header as='h3'>{activeFile.name}</Header>
              <p>
                Tags:
                <br /> ({activeFile.tags ? activeFile.tags.join(", ") : "None"})
              </p>

              <Button>Download</Button>
            </div>
          </Grid.Column>
          <Grid.Column width={1}>
            <></>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <p>
            Description: <br />
            {activeFile.description}
          </p>
        </Grid.Row>
      </Grid>
    </>
  );
};

export const ProjectDetailFields = ({
  fileData,
  projectData,
  isEdit,
}: {
  fileData: any;
  projectData: any;
  isEdit?: any;
}) => {
  const { id } = useParams<{ id: string }>();
  const activeProject = projectData.find((file: any) => file.id === id);

  const [name, setName] = useState(activeProject.name);
  const [description, setDescription] = useState(activeProject.description);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  if (isEdit) {
    return (
      <>
        <Form>
          <Header as='h2'>Project Details</Header>
          <Form.Field>
            <span>Project Name</span>
            <Input value={name} onChange={handleChangeName} />
          </Form.Field>
          <Form.Field>
            <span>Project Description</span>
            <Input value={description} onChange={handleChangeDescription} />
          </Form.Field>
        </Form>
      </>
    );
  }

  return (
    <>
      <Header as='h2'>Project Details</Header>
      <span>Project Name</span>
      <br />
      {activeProject.name}
      <br />
      <span>Project Description</span>
      <br />
      {activeProject.description}
    </>
  );
};

export const ToolsDetailFields = ({
  fileData,
  projectData,
  isEdit,
}: {
  fileData: any;
  projectData: any;
  isEdit?: any;
}) => {
  const { id } = useParams<{ id: string }>();
  const activeProject = projectData.find((file: any) => file.id === id);

  return (
    <>
      <Header as='h2'>ToolS Details 123123123</Header>
      <span>Project Name</span>
      <br />
      {activeProject.name}
      <br />
      <span>Project Description</span>
      <br />
      {activeProject.description}
    </>
  );
};

export const AccountDetailFields = ({
  fileData,
  projectData,
  isEdit,
}: {
  fileData: any;
  projectData: any;
  isEdit?: any;
}) => {
  const { id } = useParams<{ id: string }>();
  const activeProject = projectData.find((file: any) => file.id === id);

  return (
    <>
      <Header as='h2'>Project Details</Header>
      <span>Project Name</span>
      <br />
      {activeProject.name}
      <br />
      <span>Project Description</span>
      <br />
      {activeProject.description}
    </>
  );
};
