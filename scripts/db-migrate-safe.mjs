#!/usr/bin/env node
// Skip drizzle-kit migrate when DATABASE_URL is missing or unreachable.
// Used by the `build` script so Vercel deploys don't hang when no DB is
// reachable from the build network. Local `db:migrate` remains strict.

import { spawn } from 'node:child_process';
import process from 'node:process';
import { Client } from 'pg';

const CONNECT_TIMEOUT_MS = 5000;

const log = (msg) => {
  console.warn(`[db:migrate:safe] ${msg}`);
};

const url = process.env.DATABASE_URL;

if (!url) {
  log('DATABASE_URL is not set — skipping migrations.');
  process.exit(0);
}

const client = new Client({
  connectionString: url,
  connectionTimeoutMillis: CONNECT_TIMEOUT_MS,
});

try {
  await client.connect();
  await client.end();
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  log(`Cannot reach database (${reason}) — skipping migrations.`);
  process.exit(0);
}

const child = spawn('drizzle-kit', ['migrate'], {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});

child.on('error', (err) => {
  log(`Failed to spawn drizzle-kit: ${err.message}`);
  process.exit(1);
});
