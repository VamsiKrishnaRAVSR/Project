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
  const updatedId = useMemo(() => Number.isInteger(data?.length), [data]);

  const navigate = useNavigate();
  const { mutate, isError, error, isSuccess } = usePostTodo();

  const initialValues: Todo = useMemo(
    () => ({
      id: Number.isInteger(updatedId) ? Number(updatedId) + 1 : 0,
      completed: false,
      user_id: 3,
      description: "",
      completed_on: "",
      estimated_date: "",
      title: "",
      created_on: new Date().toISOString().slice(0, 10),
    }),
    [updatedId]
  );

  const onSubmit = (values: Todo) => {
    mutate(values);
    isError && !isSuccess
      ? alert("Something went wrong " + error)
      : navigate("/");
  };

  return (
    <div className="add-todo-container">
      <h1>Add a Todo</h1>
      <TodoList initialValues={initialValues} onSubmit={onSubmit} />
    </div>
  );
};

export default CreateTodo;
