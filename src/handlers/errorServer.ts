import { Context } from "hono";
import { captureException } from "@sentry/cloudflare";
import { ERROR_MESSAGE_INTERNAL_SERVER } from "../constants";

const handlerErrorServer = (
  error: Error,
  c: Context<{ Bindings: Cloudflare.Env }>,
) => {
  captureException(error);
  return c.json(
    {
      status: "error",
      data: ERROR_MESSAGE_INTERNAL_SERVER,
    },
    500,
  );
};

export default handlerErrorServer;
