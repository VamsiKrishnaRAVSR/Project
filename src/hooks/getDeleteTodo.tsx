import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { queryConstants } from "../constants/queryConstants";
import { deleteTodo } from "../services/todos.services";
import { Todo } from "../types";
const useGetDeleteTodo = () => {
  const queryClient: QueryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation((id: string) => deleteTodo(id), {
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueriesData([queryConstants.ALL_TODOS], (oldData: any) => {
        console.log(oldData);
        // console.log(typeof variables);

        const q = oldData?.filter(
          (ele: Todo) => ele.id !== parseInt(variables)
        );
        console.log(q);

        navigate("/");
        queryClient.cancelQueries([queryConstants.ALL_TODOS], {
          exact: true,
        });

        return q;
      });
    },
  });
};

export default useGetDeleteTodo;
