import { Router, Request } from "express";
import { TodoController } from "./controller";
import { TodoEntity } from "domain-todo/entities";
import { DbKeys } from "domain-todo/utils";

let route = Router();

let todoController = new TodoController();

type TodoItemParams = { todoId: string };
type T = Omit<TodoEntity, DbKeys>;

route.get("/", async (_, res) => {
  try {
    let todos = await todoController.getAll();

    return res.status(200).send(todos);
  } catch (e) {
    return res.status(400).send({ error: "some error" });
  }
});

route.post(
  "/",
  async (req: Request<any, any, Pick<TodoEntity, "title">>, res) => {
    let { body } = req;

    if (!body.title) {
      return res.status(422).send({
        message: `title is invalid. expected string but received ${body.title}`,
      });
    }

    let id = await todoController.create(body);

    return res.status(201).send({ id });
  }
);

route.get("/:todoId", async (req: Request<TodoItemParams>, res) => {
  try {
    let todo = await todoController.get(req.params.todoId);

    if (!todo) {
      return res.status(404).send({
        message: `could not find a todo with the id of: ${req.params.todoId}`,
      });
    }

    return res.send(todo);
  } catch (e) {
    res.status(400).send({ error: "some error" });
  }
});

route.patch(
  "/:todoId",
  async (req: Request<TodoItemParams, any, Omit<TodoEntity, DbKeys>>, res) => {
    let { todoId } = req.params;
    let todo = await todoController.update(todoId, req.body);

    res.status(200).send(todo);
  }
);

export default route;
