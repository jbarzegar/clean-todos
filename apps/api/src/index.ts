import * as express from "express";
import { json as JSONParser } from "body-parser";
import * as config from "./config";

import route from "./todo";

let app = express();

app.use(JSONParser());

app.use("/todo", route);

app.listen(config.PORT, () => {
  console.info(`🚀 server watching on ${config.PORT}`);
  console.log("\n");
  console.info("👀 Watching for changes");
});
