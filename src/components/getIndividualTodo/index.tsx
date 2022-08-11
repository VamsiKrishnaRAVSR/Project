import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import useGetTodo from "../../hooks/getTodo.hooks";
import { Button, Modal, Table } from "react-bootstrap";
import { Todo } from "../../types";
import useGetPatchTodo from "../../hooks/getPatchTodo";
import TodoList from "../commonFormikForm";

const GetTodo = () => {
  const { id } = useParams();
  const { data } = useGetTodo(id as string);
  const navigate = useNavigate();
  const { mutate, isError, error } = useGetPatchTodo();
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
    created_on: new Date().toISOString().slice(0, 10),
  };

  const onSubmit = (values: Todo) => {
    mutate(values);
    if (isError) {
      alert("Something went wrong " + error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="getTodo-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TodoList initialValues={initialValues} onSubmit={onSubmit} />
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
              <th>Created on</th>
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
              <td>{data?.created_on}</td>
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
