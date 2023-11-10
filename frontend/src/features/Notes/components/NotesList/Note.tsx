import dayjs from "dayjs";
import { INote } from "features/Notes/interfaces/Notes.interface";
import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import styled from "styled-components";

const Subtitle = styled(Card.Subtitle)`
  font-weight: normal;
  font-size: 12px;
  color: gray;
  margin-bottom: 3px;
`;

interface IProps {
  note: INote;
}

const Note: React.FC<IProps> = ({ note }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Subtitle>{dayjs(note.createdAt).format("DD.MM.YYYY, HH:mm")}</Subtitle>
        <Card.Text>{note.content}</Card.Text>

        <div className="d-flex justify-content-end ">
          <ButtonGroup>
            <Button size="sm" variant="outline-primary">
              Update
            </Button>
            <Button size="sm" variant="outline-danger">
              Remove
            </Button>
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Note;
