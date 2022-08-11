import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as yup from "yup";
import { Button } from "react-bootstrap";
import { Todo } from "../../types";

const TodoList = (props: { initialValues: Todo; onSubmit: any }) => {
  const { initialValues, onSubmit } = props;
  const validationSchema = yup.object({
    description: yup.string().required(),
    completed: yup.boolean().required(),
    completed_on: yup.date().required(),
    estimated_date: yup.date().required(),
    title: yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      className="formik"
    >
      <Form className="form">
        <div>
          <label htmlFor="completed">Completed</label>
          <Field
            className="formik-checkBox"
            id="completed"
            name="completed"
            type="checkbox"
          />
          <ErrorMessage name="completed" />
        </div>
        <div className="formik-item">
          <label htmlFor="description">Description</label>
          <Field
            className="formik-date"
            id="description"
            name="description"
            type="text"
          />
          <ErrorMessage name="description" />
        </div>
        <div className="formik-item">
          <label htmlFor="completed_on">Completed On</label>
          <Field
            className="formik-date"
            id="completed_on"
            name="completed_on"
            type="date"
          />
          <ErrorMessage name="completed_on" />
        </div>
        <div className="formik-item">
          <label htmlFor="estimated_date">Estimated Date </label>
          <Field
            className="formik-date"
            id="estimated_date"
            name="estimated_date"
            type="date"
          />
          <ErrorMessage name="estimated_date" />
        </div>
        <div className="formik-item">
          <label htmlFor="title">Title </label>
          <Field id="title" name="title" className="formik-date" type="text" />
          <ErrorMessage component="p" name="title" />
        </div>
        <div className="btn-container">
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default TodoList;
