import React, { useMemo } from "react";
import "./index.css";

import TodoList from "../commonFormikForm";
import usePostTodo from "../../hooks/getPostTodo";
import { useNavigate } from "react-router";
import useGetTodos from "../../hooks/getTodos.hooks";
import { Todo } from "../../types";

const CreateTodo = () => {
  const { data } = useGetTodos();

  // array is undefined and accessing length breaks ui. (JS error breaks ) tsx error doesn't break
  const updatedId = useMemo(() => data!.length + 1, [data]);
  console.log(data?.length);

  const navigate = useNavigate();
  const { mutate, isError, error } = usePostTodo();

  const initialValues: Todo = {
    id: updatedId + 1,
    completed: false,
    user_id: 3,
    description: "",
    completed_on: "",
    estimated_date: "",
    title: "",
    created_on: new Date().toISOString().slice(0, 10),
  };

  const onSubmit = (values: Todo) => {
    mutate(values);
    isError ? alert("Something went wrong " + error) : navigate("/");
  };

  return (
    <div className="add-todo-container">
      <h1>Add a Todo</h1>
      <TodoList initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateTodo;
