import {  useMutation, useQueryClient } from "@tanstack/react-query";
// import { queryConstants } from "../constants/queryConstants";
import { postTodo } from "../services/todos.services";
import { Todo } from "../types";

const usePostTodo = () => {
  const queryClient: any = useQueryClient();
  return useMutation((formData: Todo) => postTodo(formData), {
    onError: (err) => console.log(err),
    onSuccess: (data) => {
      return queryClient.setQueriesData("ALL_TODOS", (oldData: any) => {
        const p = [...oldData, data.data];
        return p;
      });
    },
  });
};

export default usePostTodo;