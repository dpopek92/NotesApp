import { INote } from "features/Notes/interfaces/Notes.interface";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Note from "./Note";

interface IProps {
  notes: INote[];
}

const NotesList: React.FC<IProps> = ({ notes }) => {
  return (
    <Row className="justify-content-around ">
      {notes.map((note) => (
        <Col md={4} key={note._id}>
          <Note note={note} />
        </Col>
      ))}
    </Row>
  );
};

export default NotesList;
