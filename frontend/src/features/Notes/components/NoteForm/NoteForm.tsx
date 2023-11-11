import { INote } from "features/Notes/interfaces/Notes.interface";
import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";

export const schema = yup.object({
  title: yup
    .string()
    .typeError("Title must be a text")
    .required("Title is required")
    .min(1, "Min. 1 character")
    .max(50, "Max. 50 characters"),
  content: yup
    .string()
    .typeError("Note must be a text")
    .required("Note is required")
    .min(1, "Min. 1 character")
    .max(500, "Max. 500 characters"),
});

export interface INoteData extends Pick<INote, "title" | "content"> {}
interface IProps {
  initData?: INoteData;
  handleSubmit: (data: INoteData) => Promise<any>;
}

const NoteForm: React.FC<IProps> = ({ initData, handleSubmit }) => {
  const formik = useFormik<INoteData>({
    initialValues: initData || { title: "", content: "" },
    onSubmit: handleSubmit,
    validationSchema: schema,
    validateOnMount: false,
    validateOnBlur: true,
  });

  return (
    <Form
      onSubmit={formik.handleSubmit}
      noValidate
      id="note-form-id"
      data-testid="note-form-test-id"
    >
      {/* TITLE INPUT */}
      <Form.Group controlId="note-form-title" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          required
          placeholder="Title..."
          isInvalid={!!formik.errors.title}
          {...formik.getFieldProps("title")}
        />
        {formik.errors.title && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.title}
          </Form.Control.Feedback>
        )}
        <div className="d-flex justify-content-end ">
          {formik.values.title.length}/{50}
        </div>
      </Form.Group>

      {/* CONTENT TEXTAREA */}
      <Form.Group controlId="note-form-content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          required
          as="textarea"
          rows={5}
          placeholder="Note content..."
          isInvalid={!!formik.errors.content}
          {...formik.getFieldProps("content")}
        />
        {formik.errors.content && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.content}
          </Form.Control.Feedback>
        )}
        <div className="d-flex justify-content-end ">
          {formik.values.content.length}/{500}
        </div>
      </Form.Group>

      <Button
        size="sm"
        variant="success"
        disabled={!formik.isValid}
        type="submit"
        className="w-100 mt-3"
      >
        Submit
      </Button>
    </Form>
  );
};

export default NoteForm;
