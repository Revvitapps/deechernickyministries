// Starts `next start` on a spare port for the check scripts. Requires `npm run build`.
import { spawn } from "node:child_process";

export async function serve(port = process.env.CHECK_PORT ?? "3999") {
  const base = `http://127.0.0.1:${port}`;
  const server = spawn("node", ["node_modules/next/dist/bin/next", "start", "-p", port], { stdio: ["ignore", "pipe", "pipe"], env: { ...process.env } });
  let log = "";
  server.stdout.on("data", (c) => (log += c));
  server.stderr.on("data", (c) => (log += c));
  const stop = () => server.kill("SIGTERM");
  process.on("exit", stop);
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(base + "/robots.txt")).ok) return { base, stop };
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  stop();
  throw new Error("Server did not start:\n" + log);
}

export const routes = ["/"];
