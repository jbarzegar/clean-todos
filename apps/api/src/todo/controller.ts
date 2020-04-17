import { v4 as uuid } from "uuid";
import { TodoRepository } from "domain-todo/repositories";

import db from "db";

export class TodoController implements TodoRepository {
  getAll: TodoRepository["getAll"] = async () => db.get("todos").value();

  get: TodoRepository["get"] = async (id) =>
    db.get("todos").find({ id }).value();

  create: TodoRepository["create"] = async ({ title }) => {
    let id = uuid();
    await db
      .get("todos")
      .push({ id, title, completed: false, createdAt: new Date() })
      .write();

    return id;
  };

  update: TodoRepository["update"] = async (id, updateData) => {
    let todo = db.get("todos").find({ id }).assign(updateData);

    await todo.write();

    return todo.value();
  };
}
