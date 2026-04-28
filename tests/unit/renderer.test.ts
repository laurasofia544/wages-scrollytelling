import { describe, expect, it } from "vitest";
import { splitMarkdownIntoSlides } from "@/lib/content/parser";

describe("presentation slide parsing", () => {
  it("detects background image directives", () => {
    const slides = splitMarkdownIntoSlides("![bg 50% 65%](/image.webp)\n\n## Title");
    expect(slides[0]?.kind).toBe("bg");
    expect(slides[0]?.imageUrl).toBe("/image.webp");
    expect(slides[0]?.objectPosition).toBe("50% 65%");
  });

  it("detects split directives", () => {
    const slides = splitMarkdownIntoSlides("![split](/portrait.webp)\n\n## Title");
    expect(slides[0]?.kind).toBe("split");
  });
});
