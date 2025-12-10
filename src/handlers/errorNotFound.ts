import { Context } from "hono";
import { ERROR_MESSAGE_NOT_FOUND } from "../constants";

const handlerErrorNotFound = (context: Context<{ Bindings: Cloudflare.Env }>) =>
  context.json(
    {
      status: "error",
      data: ERROR_MESSAGE_NOT_FOUND,
    },
    404,
  );

export default handlerErrorNotFound;
