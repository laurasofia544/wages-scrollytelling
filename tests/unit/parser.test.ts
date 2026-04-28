import { describe, expect, it } from "vitest";
import { splitMarkdownIntoSlides } from "@/lib/content/parser";

describe("splitMarkdownIntoSlides", () => {
  it("splits on horizontal rules", () => {
    const slides = splitMarkdownIntoSlides("# One\n\n---\n\n# Two");
    expect(slides).toHaveLength(2);
    expect(slides[0]?.markdown).toContain("# One");
    expect(slides[1]?.markdown).toContain("# Two");
  });
});
