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
  return useMutation(
    (props: Todo) => {
      return patchTodo(props);
    },
    {
      // onSuccess: () => queryClient.invalidateQueries(queryConstants.GET_TODO),
      onSuccess: (data, variables: Todo) => {
        clearTimeout(localStorage.getItem(variables?.id));

        queryClient.cancelQueries([queryConstants.GET_TODO]);
        // no need to add variables to dep list coz somethings won't change. Be more specific instead of generic
        // queryClient.setQueriesData(
        //   [queryConstants.GET_TODO, String(variables.id)],
        //   () => variables
        // );
        console.log(data);
        console.log(variables);

        queryClient.setQueriesData(
          [queryConstants.ALL_TODOS],
          (oldData: Array<Todo> | undefined) => {
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
    }
  );
};

export default useGetPatchTodo;
