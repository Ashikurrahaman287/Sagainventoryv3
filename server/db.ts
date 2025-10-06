import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// If DATABASE_URL isn't set yet, try to synchronously read server/.env and load values.
if (!process.env.DATABASE_URL) {
  try {
    // Read the .env file beside this module synchronously
    // and parse simple KEY=VALUE lines (no quotes handling required for our simple case)
    const envPath = fileURLToPath(new URL('./.env', import.meta.url));
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, { encoding: 'utf8' });
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const idx = trimmed.indexOf('=');
        if (idx === -1) continue;
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!(key in process.env)) {
          process.env[key] = val;
        }
      }
    }
  } catch (err) {
    // ignore; we'll error below if DATABASE_URL still missing
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
