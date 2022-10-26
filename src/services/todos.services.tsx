import axios from "axios";
import { API_ROUTES } from "../constants/urlConstants";
import { Todo } from "../types";

export const sleep = () => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => res(), 2000);
  });
};

export const getTodosList = () =>
  sleep().then(() =>
    axios.get<Todo[]>(API_ROUTES.GET_ALL_TODOS).then((res) => res.data)
  );

export const getTodo = (id: string) => {
  const url = API_ROUTES.GET_TODO.replace(":id", id);
  return sleep()
    .then(() => axios.get<Todo>(url))
    .then((res) => res.data);
};

export const postTodo = (props: Todo) => {
  // console.log(props);
  const url = API_ROUTES.POST_URL;
  return sleep().then(() => axios.post(url, props));
};

export const patchTodo = (props: Todo) => {
  const id = String(props.id);

  const url = API_ROUTES.PATCH_URL.replace(":id", id);
  return sleep().then(() => axios.patch(url, props));
};

export const deleteTodo = (props: string) => {
  const url = API_ROUTES.DELETE_URL.replace(":id", props);
  return sleep().then(() => axios.delete(url));
};
