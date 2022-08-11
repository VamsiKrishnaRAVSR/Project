import React from "react";
import "./index.css";

import TodoList from "../Add Todo Form";

const CreateTodo = () => {

  return (
    <div className="add-todo-container">
      <h1>Add a Todo</h1>
      <TodoList />
    </div>
  );
};

export default CreateTodo;
