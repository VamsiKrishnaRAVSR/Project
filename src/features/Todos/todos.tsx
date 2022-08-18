import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import useGetPatchTodo from "../../hooks/getPatchTodo";
import { Todo } from "../../types";
import "./todos.css";

const Todos = ({
  todos,
  setTodoItem,
}: {
  todos: Todo[] | undefined;
  setTodoItem: any;
}) => {
  const { mutate } = useGetPatchTodo();
  return (
    <ListGroup className="ListGroup mb-4">
      {todos?.map((ele: Todo) => (
        <div className="todos">
          <input
            className="checkbox"
            type="checkbox"
            checked={ele?.completed}
            onChange={() => mutate({ ...ele, completed: !ele.completed })}
          />
          <p className="link" onClick={() => setTodoItem(ele.id)}>
            {ele?.title}
          </p>
        </div>
      ))}
    </ListGroup>
  );
};

export default Todos;
