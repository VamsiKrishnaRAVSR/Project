import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Todo } from "../../types";
import "./todos.css";

const Todos = ({ todos }: { todos: Todo[] | undefined }) => {

  return (
    <ListGroup className="ListGroup mb-4">
      {todos?.map((ele: any) => (
        <div className="todos">
          <input
            className="checkbox"
            type="checkbox"
            disabled
            checked={ele?.completed}
          />
          
          <Link className="link" to={`/todos/${ele.id}`}>
            {ele?.title}
          </Link>
        </div>
      ))}
    </ListGroup>
  );
};

export default Todos;
