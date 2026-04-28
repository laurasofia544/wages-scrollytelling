import { expect, test } from "@playwright/test";

test("presentation page loads", async ({ page }) => {
  await page.goto("/sticky-slides/");
  await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText("Sticky Slides");
});
