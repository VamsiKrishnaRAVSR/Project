import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodosList } from "../services/todos.services";
import { queryConstants } from "../constants/queryConstants";
import { Todo } from "../types";

// export const useSourceDetails = (
//   sourceId: number | null
// ): { data: Source | null; isLoading: boolean } => {

const useGetTodos = () /*: { data: Todo[] } */ => {
  const queryClient = useQueryClient();
  return useQuery<Todo[]>([queryConstants.ALL_TODOS], () => getTodosList(), {
    onError: (err) => {
      console.log(err);
    },
    refetchOnMount: false,
    initialData: () => queryClient.getQueryData([queryConstants.ALL_TODOS]),
  });
};

export default useGetTodos;
