export interface Todo {
  id: number;
  completed: boolean;
  user_id: number;
  description: string;
  completed_on: string;
  created_on: string;
  estimated_date: string;
  title: string;
}

export interface TodoList {
  data: Todo[];
}
