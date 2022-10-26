import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
// import { queryConstants } from "../constants/queryConstants";
import { postTodo } from "../services/todos.services";
import { Todo } from "../types";

const usePostTodo = () => {
  const queryClient: QueryClient = useQueryClient();
  return useMutation(
    (formData: Todo) => {
      return postTodo(formData);
    },
    {
      onError: (err) => console.log(err),
      onSuccess: (data, variables) => {

        queryClient.setQueriesData(
          [queryConstants.ALL_TODOS],
          (oldData: any) => {
            const p = [...oldData, data.data];
            return p;
          }
        );
      },
    }
  );
};

export default usePostTodo;
