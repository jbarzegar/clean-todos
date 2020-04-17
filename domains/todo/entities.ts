export type ID = string | number;
export type Title = string;
export type Completed = boolean;

export interface TodoEntity {
  id: ID;
  title: Title;
  completed: Completed;
}
