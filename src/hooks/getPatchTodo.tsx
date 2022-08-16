import { useQueryClient, useMutation } from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import {  patchTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetPatchTodo = () => {
  const queryClient = useQueryClient();
  return useMutation((props: Todo) => patchTodo(props), {
    onError: (err) => console.log(err),
    onSuccess: () => queryClient.invalidateQueries(queryConstants.GET_TODO),
  });
};

export default useGetPatchTodo;
