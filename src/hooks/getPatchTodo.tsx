import { useMutation } from "@tanstack/react-query";
import { patchTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetPatchTodo = () => {
  return useMutation((props: Todo) => patchTodo(props), {
    onError: (err) => console.log(err),
  });
};

export default useGetPatchTodo;
