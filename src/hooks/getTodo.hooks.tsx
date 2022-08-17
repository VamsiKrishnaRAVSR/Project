import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import { getTodo } from "../services/todos.services";

const useGetTodo = (props: string) => {
  return useQuery([queryConstants.GET_TODO, props], () => getTodo(props));
};

// const useGetTodo2 = (props: string) => {
//   const queryClient: any = useQueryClient();

//   return useQuery<Todo>([queryConstants.GET_TODO], () => getTodo(props), {
//     onError: (err) => {
//       console.log(err);
//     },
//     enabled: false,
//     initialData: () => {
//       const p = queryClient
//         .getQueriesData(queryConstants.ALL_TODOS)[0][1]
//         .find((ele: Todo) => ele.id === parseInt(props));
//       console.log(p);
//       if (p) {
//         return p;
//       } else {
//         return undefined;
//       }
//     },
//   });
// };

export default useGetTodo;
