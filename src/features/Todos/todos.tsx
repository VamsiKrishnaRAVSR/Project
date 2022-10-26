import ListGroup from "react-bootstrap/ListGroup";
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
  const updateSomething = (ele: Todo) => {
    console.log(ele.id);
    console.log(localStorage.getItem(ele?.id));
    mutate({
      ...ele,
      completed: !ele.completed,
      completed_on: new Date().toLocaleString(),
    });
  };
  return (
    <ListGroup className="ListGroup mb-4">
      {todos?.map((ele: Todo) => (
        <div className="todos">
          <input
            className="checkbox"
            type="checkbox"
            checked={ele?.completed}
            onChange={() => updateSomething(ele)}
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
