import { TodoService } from "domain-todo/services";
import { TodoClient } from "infra-todo/client";

const TODO_URL = `/api/todo`;

let todoRepo = new TodoClient(TODO_URL, window.fetch);
let todoService = new TodoService(todoRepo);

export let todos = todoService;
