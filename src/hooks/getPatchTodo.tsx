import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import { patchTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetPatchTodo = () => {
  const queryClient = useQueryClient();
  return useMutation((props: Todo) => patchTodo(props), {
    onSuccess: () => queryClient.invalidateQueries(queryConstants.GET_TODO),
    onError: (err) => console.log(err),
  });
};

export default useGetPatchTodo;
