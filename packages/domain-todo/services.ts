import { TodoRepository } from "./repositories";

interface ITodoService extends TodoRepository {}

export class TodoService implements ITodoService {
  repo: TodoRepository;

  constructor(r: TodoRepository) {
    this.repo = r;
  }

  getAll = () => this.repo.getAll();
  get: ITodoService["get"] = (id) => this.repo.get(id);
  create: ITodoService["create"] = (todo) => this.repo.create(todo);
  update: ITodoService["update"] = (id, updateData) =>
    this.repo.update(id, updateData);
}
