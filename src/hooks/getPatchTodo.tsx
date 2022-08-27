import { useQueryClient, useMutation } from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import {  patchTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetPatchTodo = () => {
  const queryClient = useQueryClient();
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import { patchTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetPatchTodo = () => {
  const queryClient: QueryClient = useQueryClient();
  return useMutation((props: Todo) => patchTodo(props), {
    // onSuccess: () => queryClient.invalidateQueries(queryConstants.GET_TODO),
    onSuccess: (data, variables: Todo) => {
      queryClient.cancelQueries([queryConstants.GET_TODO]);
      // no need to add variables to dep list coz somethings won't change. Be more specific instead of generic
      // queryClient.setQueriesData(
      //   [queryConstants.GET_TODO, String(variables.id)],
      //   () => variables
      // );
      queryClient.setQueriesData(
        [queryConstants.ALL_TODOS],
        (oldData: Array<Todo> | undefined) => {
          console.log(oldData);
          return oldData?.map((ele: Todo) => {
            if (ele.id === variables.id) {
              return variables;
            } else {
              return ele;
            }
          });
        }
      );
    },
    onError: (err) => console.log(err),
    onSuccess: () => queryClient.invalidateQueries(queryConstants.GET_TODO),
  });
};

export default useGetPatchTodo;
