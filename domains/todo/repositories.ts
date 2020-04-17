import { TodoEntity } from "./entities";
import { DbKeys } from "./utils";

export interface TodoRepository {
  getAll: () => Promise<TodoEntity[]>;
  get: (id: TodoEntity["id"]) => Promise<TodoEntity>;
  /**
   * @returns uuid of the item
   */
  create: (todo: Omit<TodoEntity, DbKeys | "completed">) => Promise<string>;
  update: (
    id: TodoEntity["id"],
    updateData: Partial<Omit<TodoEntity, DbKeys>>
  ) => Promise<TodoEntity>;
}
