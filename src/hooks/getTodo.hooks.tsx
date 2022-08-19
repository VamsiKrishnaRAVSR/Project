import {
  QueryClient,
  QueryKey,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { queryConstants } from "../constants/queryConstants";
import { getTodo } from "../services/todos.services";
import { Todo } from "../types";
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
        console.log("updating initial data");

        return p;
      } else {
        return undefined;
      }
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });
};

export const useTodo = (id: string) => {
  // const { data } = useGetTodos();
  const queryClient = useQueryClient();
  const data: Todo[] | undefined = queryClient.getQueryData([
    queryConstants.ALL_TODOS,
  ]);
  console.log("is item called?");

  const todo = useMemo(() => {
    console.log("item fetched");

    if (data && id) {
      console.log("item found");

      return data.find((item: Todo) => item.id === parseInt(id));
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
