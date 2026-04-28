import { expect, test } from "@playwright/test";

test("standard page loads", async ({ page }) => {
  await page.goto("/getting-started/");
  await expect(page.getByRole("heading", { level: 1 }).first()).toHaveText("Getting Started");
});
