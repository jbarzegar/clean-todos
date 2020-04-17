import * as low from "lowdb";
import * as Memory from "lowdb/adapters/FileSync";

import { TodoEntity } from "domain-todo/entities";

type DBSchema = {
  todos: TodoEntity[];
};
let adapterMemory = new Memory<DBSchema>("db.json");
let db = low(adapterMemory);

db.defaults({ todos: [] }).write();

export default db;
