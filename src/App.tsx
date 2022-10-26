import React, { useMemo, useState } from "react";
import "./App.css";
import useGetTodos from "./hooks/getTodos.hooks";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import Todos from "./features/Todos/todos";
import { Todo } from "./types";
import Pagination from "./features/pagination/pagination1";
import { Link } from "react-router-dom";
import TodoDetails from "./components/todoDetails/todoDetails";

function App() {
  const { data: todos } = useGetTodos();
  const [todoItem, setTodoItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [checkBox, setCheckBox] = useState({
    completed: false,
    pending: false,
  });

  // const [isCompleted, setIsCompleted] = useState(false);
  // const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const lastTodoIndex = currentPage * todosPerPage;
  const firstTodoIndex = lastTodoIndex - todosPerPage;
  const paginate = (number: string | number) => {
    setCurrentPage(parseInt(number as string));
  };

  // const getDataById = useMemo(() => {
  //   return todos?.find((ele: Todo) => ele.id === todoItem);
  // }, [todoItem]);

  const filterBySearchInput = useMemo(
    () =>
      todos?.filter((todo: Todo) =>
        todo.title?.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [searchInput, todos]
  );

  const updatedCheckedList = useMemo(() => {
    const { completed, pending } = checkBox;
    if ((completed && pending) || (!completed && !pending)) {
      return filterBySearchInput;
    } else if (completed) {
      return filterBySearchInput?.filter((ele) => ele.completed === true);
    } else if (pending) {
      return filterBySearchInput?.filter((ele) => ele.completed === false);
    }
  }, [checkBox, filterBySearchInput]);

  const currentTodos = updatedCheckedList?.slice(firstTodoIndex, lastTodoIndex);

  return (
    <Container>
      <div className="topBar">
        <div>
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            name="completed"
            onChange={(e) =>
              setCheckBox({ ...checkBox, completed: e.target.checked })
            }
            id="completed"
          />
          <label htmlFor="pending">Pending</label>
          <input
            type="checkbox"
            name="pending"
            onChange={(e) =>
              setCheckBox({ ...checkBox, pending: e.target.checked })
            }
            id="pending"
          />
          {/* <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            name="completed"
            onChange={() => setIsCompleted(!isCompleted)}
            id="completed"
          />
          <label htmlFor="pending">Pending</label>
          <input
            type="checkbox"
            name="pending"
            onChange={() => setIsPending(!isPending)}
            id="pending"
          /> */}
        </div>
        <input
          className="input"
          type="search"
          value={searchInput}
          id="search"
          placeholder="Search"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button className="button">
          <Link className="link" to="/todos/new">
            Add a Todo
          </Link>
        </Button>
        {/* <select>
          <option>Completed</option>
          <option>Not Completed</option>
        </select> */}
      </div>
      {todos && (
        <>
          <Todos todos={currentTodos} setTodoItem={setTodoItem} />
          <Pagination
            itemsPerPage={todosPerPage}
            totalLength={updatedCheckedList?.length}
            paginate={paginate}
            currentPageNo={currentPage}
          />
        </>
      )}
      {todoItem !== null && <TodoDetails todoItem={todoItem} />}
    </Container>
  );
}

export default App;
