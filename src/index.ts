import { Hono } from "hono";
import { logger } from "hono/logger";
import handlerErrorNotFound from "./handlers/errorNotFound";
import handlerErrorServer from "./handlers/errorServer";
import status from "./handlers/status";
import subscribers from "./handlers/subscribers";
import tickets from "./handlers/tickets";
import broadcast from "./handlers/broadcast";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

// middlewares
app.use(logger());

// 404 & 500
app.notFound(handlerErrorNotFound);
app.onError(handlerErrorServer);

// routes
app.get("/status", status);
app.route("/subscribers", subscribers);
app.route("/tickets", tickets);
app.route("/broadcast", broadcast);

export default app;
