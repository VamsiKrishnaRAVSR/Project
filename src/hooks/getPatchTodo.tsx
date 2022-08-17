import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import { patchTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetPatchTodo = (id: string) => {
  const queryClient: any = useQueryClient();
  return useMutation((props: Todo) => patchTodo(props), {
    // onSuccess: () => queryClient.invalidateQueries(queryConstants.GET_TODO),
    onSuccess: (data, variables) => {
      console.log(typeof variables.id);
      console.log(typeof id);
      queryClient.cancelQueries([queryConstants.GET_TODO]);
      // no need to add variables to dep list coz somethings won't change. Be more specific instead of generic
      queryClient.setQueriesData(
        [queryConstants.GET_TODO, String(variables.id)],
        (oldData: Todo) => {
          console.log(oldData);
          console.log(variables);
          return variables;
        }
      );
    },
    onError: (err) => console.log(err),
  });
};

export default useGetPatchTodo;
