import dayjs from "dayjs";
import { useNoteContext } from "features/Notes/context/noteContext.context";
import { INote } from "features/Notes/interfaces/Notes.interface";
import { truncate } from "lodash";
import React from "react";
import { Button, Card } from "react-bootstrap";
import styled from "styled-components";

const Title = styled(Card.Title)`
  min-height: 50px;
`;
const Body = styled(Card.Body)`
  min-height: 120px;
`;
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
    <Card className="mb-3">
      <Card.Header>
        <Title>{note.title}</Title>
        <Subtitle>{dayjs(note.createdAt).format("DD.MM.YYYY, HH:mm")}</Subtitle>
      </Card.Header>
      <Body>
        <Card.Text>{truncate(note.content, { length: 100 })}</Card.Text>
      </Body>
      <Card.Footer>
        <div className="d-flex justify-content-end ">
          <Button
            size="sm"
            variant="outline-success"
            onClick={() => goToNote(note._id)}
          >
            Show details
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Note;
