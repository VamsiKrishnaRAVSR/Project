import axios from "axios";
import { API_ROUTES } from "../constants/urlConstants";
import { Todo } from "../types";

export const getTodosList = () =>
  axios.get<Todo[]>(API_ROUTES.GET_ALL_TODOS).then((res) => res.data);

export const getTodo = (id: string) => {
  const url = API_ROUTES.GET_TODO.replace(":id", id);
  return axios.get<Todo>(url).then((res) => res.data);
};

export const postTodo = (props: Todo) => {
  console.log(props);
  const url = API_ROUTES.POST_URL;
  return axios.post(url, props);
};

export const patchTodo = (props: Todo) => {
  const id = String(props.id);
  const url = API_ROUTES.PATCH_URL.replace(":id", id);
  return axios.patch(url, props);
};
