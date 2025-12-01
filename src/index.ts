import { Hono, Context, Next } from "hono";

export interface Env {
  DB: D1Database;
  AUTH: string;
}

export default {
  async fetch(request, env, ctx) {
    const app = new Hono<{ Bindings: Env }>();

    const authMiddleware = async (c: Context, next: Next) => {
      const authHeader = c.req.header("Authorization");
      if (!authHeader) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

      if (token !== env.AUTH) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      return next();
    };

    app.get("/", authMiddleware, async (c) => {
      try {
        const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
        const { results } = await stmt.all();

        return c.json(results);
      } catch (error: any) {
        return c.json({ error: error.message }, 500);
      }
    });

    return app.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
