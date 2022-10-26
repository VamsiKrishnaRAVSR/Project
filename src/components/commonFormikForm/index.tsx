import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button } from "react-bootstrap";
import { Todo } from "../../types";

const TodoList = (props: {
  initialValues: Todo;
  onSubmit: (values: Todo) => void;
}) => {
  const { initialValues, onSubmit } = props;

  const validationSchema = yup.object({
    description: yup.string().label("Description"),
    estimated_date: yup.date().required().label("Estimated date"),
    title: yup.string().required().label("Title"),
  });

  const CustomInputComponent = (props) => (
    <input
      className="my-custom-input"
      type="datetime-local"
      {...props}
      min={new Date().toLocaleString()}
    />
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      className="formik"
    >
      <Form className="form">
        <div className="formik-item">
          <label htmlFor="title">Title </label>
          <Field id="title" name="title" className="formik-date" type="text" />
          <ErrorMessage component="p" name="title" />
        </div>
        <div className="formik-item">
          <label htmlFor="description">
            Description<span>(optional)</span>
          </label>
          <Field
            className="formik-date"
            id="description"
            name="description"
            type="text"
          />
          <ErrorMessage name="description" />
        </div>
        <div className="formik-item">
          <label htmlFor="estimated_date">Estimated Date</label>

          <Field
            id="estimated_date"
            name="estimated_date"
            as={CustomInputComponent}
          />

          <ErrorMessage name="estimated_date" />
        </div>
        <div className="btn-container">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default TodoList;
