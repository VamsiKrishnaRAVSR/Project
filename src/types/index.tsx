export interface Todo {
  userId: Number;
  id: Number;
  title: String;
  completed: Boolean;
}

export interface TodoList {
  data: Todo[];
}
