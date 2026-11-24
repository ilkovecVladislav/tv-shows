import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { fileURLToPath } from 'node:url';
import app from './app.ts';

// фронтенд и API на одном origin — CORS не нужен; в dev фронтенд отдаёт Vite
app.get('*', serveStatic({ root: fileURLToPath(new URL('../dist/', import.meta.url)) }));

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`ts-shows is listening on port ${info.port}`);
});
