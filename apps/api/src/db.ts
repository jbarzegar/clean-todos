import * as low from "lowdb";
import * as Memory from "lowdb/adapters/FileSync";

import { TodoEntity } from "domain-todo/entities";

export type Todo = TodoEntity & {
  createdAt?: Date;
  updatedAt?: Date;
};

type DBSchema = {
  todos: Todo[];
};
let adapterMemory = new Memory<DBSchema>("db.json");
let db = low(adapterMemory);

db.defaults({ todos: [] }).write();

export default db;
