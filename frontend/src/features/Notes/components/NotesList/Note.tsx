import dayjs from "dayjs";
import { useNoteContext } from "features/Notes/context/noteContext.context";
import { INote } from "features/Notes/interfaces/Notes.interface";
import { truncate } from "lodash";
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
  const { goToNote } = useNoteContext();

  return (
    <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Subtitle>{dayjs(note.createdAt).format("DD.MM.YYYY, HH:mm")}</Subtitle>
        <Card.Text>{truncate(note.content, { length: 50 })}</Card.Text>

        <div className="d-flex justify-content-end ">
          <ButtonGroup>
            <Button
              size="sm"
              variant="outline-success"
              onClick={() => goToNote(note._id)}
            >
              Show details
            </Button>
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Note;
