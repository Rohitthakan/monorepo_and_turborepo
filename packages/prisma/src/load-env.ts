import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const moduleDir = dirname(fileURLToPath(import.meta.url));

for (const envPath of [
  resolve(moduleDir, "../.env"),
  resolve(moduleDir, "../../.env"),
  resolve(process.cwd(), ".env"),
  resolve(process.cwd(), "../../packages/prisma/.env"),
]) {
  if (existsSync(envPath)) {
    config({ path: envPath });
    break;
  }
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to packages/prisma/.env (see .env.example)."
  );
}
