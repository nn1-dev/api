import { Context } from "hono";

const status = (c: Context<{ Bindings: Cloudflare.Env }>) =>
  c.json(
    {
      status: "success",
      data: "API is running",
    },
    200,
  );

export default status;
