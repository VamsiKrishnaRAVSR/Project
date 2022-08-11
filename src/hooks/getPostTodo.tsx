import { useMutation } from "@tanstack/react-query";
import { postTodo } from "../services/todos.services";
import { Todo } from "../types";

const usePostTodo = () => {
  return useMutation((formData: Todo) => postTodo(formData), {
    onError: (err) => console.log(err),
  });
};

export default usePostTodo;
