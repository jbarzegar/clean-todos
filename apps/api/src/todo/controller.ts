import { MockedTodoRepo } from "infra-todo/mocks/server";
import { TodoService } from "domain-todo/services";

const todoRepo = new MockedTodoRepo();
const todoService = new TodoService(todoRepo);

export let getAll = todoService.getAll;
export let get = todoService.get;
export let create = todoService.create;
export let update = todoService.update;
