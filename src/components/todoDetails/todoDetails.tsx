import React from "react";
import { Table } from "react-bootstrap";
import { useTodo } from "../../hooks/getTodo.hooks";

const TodoDetails = (props: { todoItem: Number }) => {
  const { todoItem } = props;
  const { data: getDataById } = useTodo(String(todoItem));

  return (
    <Table>
      <thead>
        <tr>
          <th>id</th>
          <th>Status</th>
          <th>Title</th>
          {getDataById?.description.length !== 0 ? <th>description</th> : null}
          <th>estimated_date</th>
          {getDataById?.completed ? <th>completed_on</th> : null}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{getDataById?.id}</td>
          <td>{getDataById?.completed ? "Completed" : "InProgress"} </td>
          <td>{getDataById?.title}</td>
          {getDataById?.description.length !== 0 ? (
            <td>{getDataById?.description}</td>
          ) : null}
          <td>{getDataById?.estimated_date}</td>
          {getDataById?.completed ? <td>{getDataById?.completed_on}</td> : null}
        </tr>
      </tbody>
    </Table>
  );
};

export default React.memo(TodoDetails);
