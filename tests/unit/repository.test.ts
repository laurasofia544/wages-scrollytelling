import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ContentRepository } from "@/lib/content/repository";

describe("ContentRepository", () => {
  it("loads markdown content and frontmatter", async () => {
    const dir = await fsTempDir();
    await writeFile(
      path.join(dir, "sample.md"),
      `---\ntitle: Sample\nlayout: standard\n---\n\nHello`,
    );

    const repo = new ContentRepository(dir);
    const page = await repo.getPageBySlug("sample");
    expect(page.frontmatter.title).toBe("Sample");
    expect(page.content.trim()).toBe("Hello");
  });
});

async function fsTempDir() {
  const dir = await mkdir(path.join(os.tmpdir(), `scrolly-${Date.now()}`), { recursive: true });
  return dir;
}
