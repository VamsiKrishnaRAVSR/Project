import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryConstants } from "../constants/queryConstants";
import { patchTodo } from "../services/todos.services";
import { Todo } from "../types";

const useGetPatchTodo = () => {
  const queryClient: any = useQueryClient();
  return useMutation((props: Todo) => patchTodo(props), {
    // onSuccess: () => queryClient.invalidateQueries(queryConstants.GET_TODO),
    onSuccess: (data) =>
      queryClient.setQueriesData(queryConstants.GET_TODO, (datas: Todo) => {
        console.log(datas);
        console.log(data.data);
        return data.data;
      }),
    onError: (err) => console.log(err),
  });
};

export default useGetPatchTodo;
