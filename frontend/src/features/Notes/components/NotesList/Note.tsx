import { formatDate } from "common/utils/dates.utils";
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
  const { title, content, createdAt } = note;

  return (
    <Card className="mb-3" data-testid="note-test-id">
      <Card.Header>
        <Title>{title}</Title>
        <Subtitle>{formatDate(createdAt)}</Subtitle>
      </Card.Header>
      <Body>
        <Card.Text>{truncate(content, { length: 100 })}</Card.Text>
      </Body>
      <Card.Footer>
        <div className="d-flex justify-content-end ">
          <Button
            size="sm"
            variant="outline-success"
            onClick={() => goToNote(note)}
          >
            Show details
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Note;
