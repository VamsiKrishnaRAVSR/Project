import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { queryConstants } from "../constants/queryConstants";
import { getTodo } from "../services/todos.services";
import useGetTodos from "./getTodos.hooks";
// import { Todo } from "../types";
// need to use useMutation to get the id properly.
const useGetTodo = (id: string) => {
  const queryClient: any = useQueryClient();
  return useQuery([queryConstants.GET_TODO, id], () => getTodo(id), {
    initialData: () => {
      console.log("GETTING initial data");
      const p = queryClient
        .getQueriesData([queryConstants.ALL_TODOS])[0][1]
        .find((ele: any) => ele.id === parseInt(id));
      console.log(p);
      if (p) {
        return p;
      } else {
        return undefined;
      }
    },
    refetchOnMount: false,
  });
};

export const useTodo = (id: string) => {
  const { data } = useGetTodos();

  const todo = useMemo(() => {
    if (data && id) {
      return data.find((item) => item.id == id);
    } else {
      return null;
    }
  }, [id, data]);

  return { data: todo };
};

// const useGetTodo = (props: string) => {
//   const queryClient: any = useQueryClient();

//   return useQuery<Todo>([queryConstants.GET_TODO], () => getTodo(props), {
//     onError: (err) => {
//       console.log(err);
//     },
//     enabled: false,
// initialData: () => {
//   const p = queryClient
//     .getQueriesData(queryConstants.ALL_TODOS)[0][1]
//     .find((ele: Todo) => ele.id === parseInt(props));
//   console.log(p);
//   if (p) {
//     return p;
//   } else {
//     return undefined;
//   }
// },
//   });
// };

export default useGetTodo;
