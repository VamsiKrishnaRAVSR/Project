import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import useGetTodo from "../../hooks/getTodo.hooks";
import { Button, Modal, Table } from "react-bootstrap";
import { Todo } from "../../types";
import axios from "axios";

const GetTodo = () => {
  const { id } = useParams();
  const { data } = useGetTodo(id as string);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const initialValues: Todo = {
    id: data?.id,
    completed: data?.completed,
    user_id: data?.user_id,
    description: data?.description,
    completed_on: data?.completed_on,
    estimated_date: data?.estimated_date,
    title: data?.title,
  };

  const validationSchema = yup.object({
    description: yup.string().required(),
    id: yup.number(),
    completed: yup.boolean().required(),
    user_id: yup.number().required(),
    completed_on: yup.date().required(),
    estimated_date: yup.date().required(),
    title: yup.string().required(),
  });

  const onSubmit = (values: Todo) => {
    // console.log(values);
  };

  // id: number,
  // completed: boolean,
  // user_id: number,
  // description: string,
  // completed_on: string,
  // estimated_date: string,
  // title: string,

  return (
    <div className="getTodo-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                <Field
                  id="title"
                  name="title"
                  className="formik-date"
                  type="text"
                />
                <ErrorMessage component="p" name="title" />
              </div>
              <div className="btn-container">
                <Button type="submit">Submit</Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
      <div>
        <h1>Todo Id - {id}</h1>
        <button onClick={() => navigate(-1)}>BAck</button>
      </div>
      <div>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>completed</th>
              <th>Title</th>
              <th>description</th>
              <th>estimated_date</th>
              <th>completed_on</th>
              <th>Edit ?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data?.id}</td>
              <td>{data?.completed ? "Yes" : "No"} </td>
              <td>{data?.title}</td>
              <td>{data?.description}</td>
              <td>{data?.estimated_date}</td>
              <td>{data?.completed_on}</td>
              <td>
                <Button onClick={handleShow}>Edit</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GetTodo;
