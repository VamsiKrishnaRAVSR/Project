import React from "react";
import { Table } from "react-bootstrap";
import useGetTodo, { useTodo } from "../../hooks/getTodo.hooks";

const TodoDetails = (props: { todoItem: Number }) => {
  const { todoItem } = props;
  const { data: getDataById } = useTodo(String(todoItem));

  return (
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
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{getDataById?.id}</td>
          <td>{getDataById?.completed ? "Yes" : "No"} </td>
          <td>{getDataById?.title}</td>
          <td>{getDataById?.description}</td>
          <td>{getDataById?.estimated_date}</td>
          <td>{getDataById?.completed_on}</td>
          <td>{getDataById?.created_on}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TodoDetails;
