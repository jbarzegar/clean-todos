import * as path from "path";
import { TodoRepository } from "domain-todo/repositories";
import { v4 as uuid } from "uuid";

import * as low from "lowdb";
import * as FileAdapter from "lowdb/adapters/FileSync";

import { TodoEntity } from "domain-todo/entities";

export type Todo = TodoEntity & {
  createdAt?: Date;
  updatedAt?: Date;
};

type DBSchema = {
  todos: Todo[];
};
let adapter = new FileAdapter<DBSchema>(
  path.join(__dirname, "../.tmp/db.json")
);
let db = low(adapter);

db.defaults({ todos: [] }).write();

export class MockedTodoRepo implements TodoRepository {
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
