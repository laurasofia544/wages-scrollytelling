import { describe, expect, it } from "vitest";
import { ContextualLink } from "@/components/ui/ContextualLink";

describe("ContextualLink", () => {
  it("exports a component", () => {
    expect(ContextualLink).toBeTypeOf("function");
  });
});
