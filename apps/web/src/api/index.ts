import { TodoRepository } from "domain-todo/repositories";
import { TodoEntity } from "domain-todo/entities";
import { sleep } from "utils";

const TODO_URL = `/api/todo`;

let get: TodoRepository["get"] = async (id) => {
  let resp = await fetch(`${TODO_URL}/${id}`);

  if (!resp.ok) {
    throw new Error("asdf");
  }

  let data: TodoEntity = await resp.json();

  return data;
};

let getAll: TodoRepository["getAll"] = async () => {
  let resp = await fetch(TODO_URL);

  let data: TodoEntity[] = await resp.json();

  await sleep(1000);

  return data;
};

let create: TodoRepository["create"] = async (body) => {
  let resp = await fetch(TODO_URL, {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  let data: { id: string } = await resp.json();

  return data.id;
};

let update: TodoRepository["update"] = async (id, body) => {
  let resp = await fetch(`${TODO_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data: TodoEntity = await resp.json();

  return data;
};

export let todos: TodoRepository = {
  get,
  getAll,
  create,
  update,
};
