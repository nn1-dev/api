import { Hono } from "hono";

export interface Env {
  DB: D1Database;
  // SECRET: SecretsStoreSecret;
}

export default {
  async fetch(request, env, ctx) {
    // const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
    // const { results } = await stmt.all();
    //
    // return new Response(renderHtml(JSON.stringify(results, null, 2)), {
    //   headers: {
    //     "content-type": "text/html",
    //   },
    // });
    const app = new Hono<{ Bindings: Env }>();

    // Secret Store key value that we have set
    // const secret = await env.SECRET.get();

    // Authentication middleware that verifies the Authorization header
    // is sent in on each request and matches the value of our Secret key.
    // If a match is not found we return a 401 and prevent further access.
    // const authMiddleware = async (c: Context, next: Next) => {
    //     const authHeader = c.req.header('Authorization');
    //     if (!authHeader) {
    //         return c.json({ error: 'Unauthorized' }, 401);
    //     }
    //
    //     const token = authHeader.startsWith('Bearer ')
    //         ? authHeader.substring(7)
    //         : authHeader;
    //
    //     if (token !== secret) {
    //         return c.json({ error: 'Unauthorized' }, 401);
    //     }
    //
    //     return next();
    // };

    // CRUD REST endpoints made available to all of our tables

    // Execute a raw SQL statement with parameters with this route
    // app.post("/query", authMiddleware, async (c) => {
    app.get("/", async (c) => {
      try {
        // const body = await c.req.json();
        // const { query, params } = body;
        //
        // if (!query) {
        //   return c.json({ error: "Query is required" }, 400);
        // }

        // Execute the query against D1 database
        // const results = await env.DB.prepare(query)
        //   .bind(...(params || []))
        //   .all();

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
