import { describe, expect, it } from "vitest";
import { ContentRepository } from "@/lib/content/repository";

describe("ContentRepository slug loading", () => {
  it("is constructible", () => {
    expect(new ContentRepository("/tmp")).toBeInstanceOf(ContentRepository);
  });
});
