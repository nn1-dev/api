import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

// middlewares
app.use(logger());
app.use(async (c, next) => {
  console.log({ envAuth: c.env.AUTH });
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ status: "error", data: "Unauthorized" }, 401);
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  if (token !== c.env.AUTH) {
    return c.json({ status: "error", data: "Unauthorized" }, 401);
  }

  return next();
});

// 404
app.notFound((c) =>
  c.json(
    {
      status: "error",
      data: "The route was not found",
    },
    404,
  ),
);

// 500
app.onError((err, c) =>
  c.json(
    {
      status: "error",
      data: `Internal Server Error: ${err.message}`,
    },
    500,
  ),
);

// subscribers
app.get("/subscribers", (c) => c.text("Subscribers list"));
app.get("/subscribers/:id", (c) => c.text("Subscribers get"));
app.post("/subscribers", (c) => c.text("Subscribers create"));
app.delete("/subscribers/:id", (c) => c.text("Subscribers delete"));

// tickets
app.get("/tickets", (c) => c.text("Tickets list"));
app.get("/tickets/:eventId", (c) => c.text("Tickets event list"));
app.get("/tickets/:eventId/:ticketId", (c) => c.text("Tickets get"));
app.post("/tickets", (c) => c.text("Tickets create"));
app.put("/tickets/:eventId/:ticketId", (c) => c.text("Tickets update"));
app.delete("/tickets/:eventId/:id", (c) => c.text("Tickets delete"));

export default app;
