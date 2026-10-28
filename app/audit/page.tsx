import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("audit");

/** The client audit (content/AUDIT.md), rendered in the app so "Try it" links open the prototype. */
export default async function AuditPage() {
  const md = await readFile(path.join(process.cwd(), "content/AUDIT.md"), "utf8");
  const html = await marked.parse(md, { gfm: true });
  return (
    <section className="paper section">
      <article className="wrap prose" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}
