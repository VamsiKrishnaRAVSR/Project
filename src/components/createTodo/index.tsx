import React, { useMemo } from "react";
import "./index.css";
import TodoList from "../commonFormikForm";
import usePostTodo from "../../hooks/getPostTodo";
import { useNavigate } from "react-router";
import useGetTodos from "../../hooks/getTodos.hooks";
import { Todo } from "../../types";
import moment from "moment";

const CreateTodo = () => {
  const { data } = useGetTodos();
  // array is undefined and accessing length breaks ui. (JS error breaks ) tsx error doesn't break
  // const updatedId = useMemo(() => Number.isInteger(data?.length), [data]);

  const navigate = useNavigate();
  const { mutate, isError, error, isSuccess, isLoading } = usePostTodo();

  const initialValues: Todo = useMemo(
    () => ({
      id: data ? data?.length + 1 : 0,
      completed: false,
      user_id: 3,
      description: "",
      completed_on: "",
      estimated_date: "",
      title: "",
      timer: "",
    }),
    [data]
  );

  const onSubmit = (values: Todo) => {
    const value = values;
    const date = value.estimated_date;
    const b = moment().valueOf();
    const time = moment(date).valueOf() - b;
    const timers = setTimeout(() => alert(value.title), [time]);
    console.log(values);

    localStorage.setItem(value.id, timers);
    mutate(value);
    // setTimeout(() => {
    //   alert(values.title);
    // }, []);
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
