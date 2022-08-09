import React from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router";
import useGetTodo from "../../hooks/getTodo.hooks";

const GetTodo = () => {
  const { id } = useParams();
  const { data } = useGetTodo(id as string);
  const navigate = useNavigate();

  console.log(data);
  return (
    <div>
      <div>GetTodo-{id}</div>
      <button onClick={() => navigate(-1)}>BAck</button>
      <h1>{data?.title}</h1>
    </div>
  );
};

export default GetTodo;
