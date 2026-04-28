import { describe, expect, it } from "vitest";
import { PageFrontmatterSchema } from "@/lib/content/schema";

describe("PageFrontmatterSchema", () => {
  it("accepts valid frontmatter", () => {
    const result = PageFrontmatterSchema.safeParse({ title: "Hi", layout: "standard" });
    expect(result.success).toBe(true);
  });

  it("rejects missing title", () => {
    const result = PageFrontmatterSchema.safeParse({ layout: "standard" });
    expect(result.success).toBe(false);
  });
});
