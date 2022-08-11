export interface Todo {
  id: number | undefined;
  completed: boolean | undefined;
  user_id: number | undefined;
  description: string | undefined;
  completed_on: string | undefined;
  created_on: string | undefined;
  estimated_date: string | undefined;
  title: string | undefined;
}

export interface TodoList {
  data: Todo[];
}
