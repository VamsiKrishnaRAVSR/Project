import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import { getTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetTodo = (props: string) => {
  const queryClient = useQueryClient();

  return useQuery<Todo>([queryConstants.GET_TODO], () => getTodo(props), {
    onError: (err) => {
      console.log(err);
    },
    initialData: () => {
      const p = queryClient
        .getQueriesData(queryConstants.ALL_TODOS)[0][1]
        .find((ele) => ele.id === parseInt(props));

      console.log(p);
      if (p) {
        return p;
      } else {
        return undefined;
      }
    },
  });
};

export default useGetTodo;
