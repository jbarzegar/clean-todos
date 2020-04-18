import { TodoEntity, ID } from "domain-todo/entities";
import { TodoRepository } from "domain-todo/repositories";

type FetchLike = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

export class TodoClient implements TodoRepository {
  private url: string;
  private fetch: FetchLike;
  private defaultFetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(_url: string, _fetch: FetchLike) {
    this.url = _url;
    this.fetch = (...a) => _fetch(...a);
  }

  async getAll(): Promise<TodoEntity[]> {
    const resp = await this.fetch(this.url, this.defaultFetchOptions);

    const data: TodoEntity[] = await resp.json();

    return data;
  }

  async get(id: ID): Promise<TodoEntity> {
    const resp = await this.fetch(
      this.url + `/${id}`,
      this.defaultFetchOptions
    );

    const data: TodoEntity = await resp.json();

    return data;
  }

  async create(todo: Pick<TodoEntity, "title">): Promise<ID> {
    const resp = await this.fetch(this.url, {
      ...this.defaultFetchOptions,
      body: JSON.stringify(todo),
      method: "POST",
    });

    const data: ID = await resp.json();

    return data;
  }

  async update(
    id: ID,
    update: Partial<Omit<TodoEntity, "id">>
  ): Promise<TodoEntity> {
    const resp = await this.fetch(this.url + `/${id}`, {
      ...this.defaultFetchOptions,
      body: JSON.stringify(update),
      method: "PATCH",
    });

    return resp.json();
  }
}
