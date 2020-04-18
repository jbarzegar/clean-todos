import { TodoEntity, ID } from "./entities";

export interface TodoRepository {
  getAll: () => Promise<TodoEntity[]>;
  get: (id: TodoEntity["id"]) => Promise<TodoEntity>;
  /**
   * @returns uuid of the item
   */
  create: (todo: Pick<TodoEntity, "title">) => Promise<ID>;
  update: (
    id: TodoEntity["id"],
    updateData: Partial<Omit<TodoEntity, "id">>
  ) => Promise<TodoEntity>;
}
