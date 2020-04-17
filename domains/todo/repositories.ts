import { TodoEntity } from "./entities";
// import { DbKeys } from "./utils";

export interface TodoRepository {
  getAll: () => Promise<TodoEntity[]>;
  get: (id: TodoEntity["id"]) => Promise<TodoEntity>;
  /**
   * @returns uuid of the item
   */
  create: (todo: Omit<TodoEntity, "id" | "completed">) => Promise<string>;
  update: (
    id: TodoEntity["id"],
    updateData: Partial<Omit<TodoEntity, "id">>
  ) => Promise<TodoEntity>;
}
