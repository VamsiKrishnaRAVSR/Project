import { useQuery } from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import { getTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetTodo = (props: string) => {
  return useQuery<Todo>([queryConstants.GET_TODO], () => getTodo(props), {
    onError: (err) => {
      console.log(err);
    },
  });
};

export default useGetTodo;
