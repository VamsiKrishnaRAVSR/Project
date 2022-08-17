import { useMutation } from "@tanstack/react-query";
import { deleteTodo } from "../services/todos.services";
const useGetDeleteTodo = () => {
  return useMutation((id : string) => deleteTodo(id), {
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useGetDeleteTodo;
