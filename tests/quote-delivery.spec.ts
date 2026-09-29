import { test, expect, type Page } from "@playwright/test";
async function fill(page: Page) {
  await page.goto("/request-a-quote?service=general-repairs");
  await page.getByLabel("Your name").fill("Website QA");
  await page.getByLabel("Phone number").fill("6045550123");
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("City / neighbourhood").fill("North Vancouver");
  await page.getByLabel("Preferred timing").selectOption("Flexible");
  await page
    .getByLabel("Tell us about the project")
    .fill("A clearly labelled test repair request, with enough detail.");
  await page.getByRole("checkbox").check();
}
test("direct success stays on site, prevents concurrent submits and hides credentials", async ({
  page,
}) => {
  const scripts: Promise<string>[] = [];
  page.on("response", (response) => {
    if (
      response.url().includes("/_next/static/") &&
      response.url().includes(".js")
    )
      scripts.push(response.text());
  });
  let count = 0;
  await page.route("**/api/quote", async (route) => {
    count++;
    expect(route.request().postDataJSON().submissionId).toMatch(
      /^[0-9a-f-]{36}$/,
    );
    await new Promise((resolve) => setTimeout(resolve, 150));
    await route.fulfill({ json: { ok: true } });
  });
  await fill(page);
  await page.locator("form.quote-form").evaluate((form) => {
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true }),
    );
  });
  await expect(
    page.getByRole("heading", {
      name: "Thanks — your project request has been sent to Saeed Contracting.",
    }),
  ).toBeVisible();
  expect(count).toBe(1);
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toHaveCount(0);
  expect(await page.content()).not.toContain("qa-server-secret-never-public");
  for (const script of await Promise.all(scripts))
    expect(script).not.toContain("qa-server-secret-never-public");
});
test("failure preserves details, hides provider errors, retries with same ID and offers fallbacks", async ({
  page,
}) => {
  const ids: string[] = [];
  await page.route("**/api/quote", async (route) => {
    ids.push(route.request().postDataJSON().submissionId);
    await route.fulfill({
      status: ids.length === 1 ? 502 : 200,
      json:
        ids.length === 1 ? { error: "private provider secret" } : { ok: true },
    });
  });
  await fill(page);
  await page.getByRole("button", { name: "Send quote request" }).click();
  await expect(page.locator(".form-error")).toContainText("Please retry");
  await expect(page.locator("body")).not.toContainText(
    "private provider secret",
  );
  await expect(page.getByLabel("Your name")).toHaveValue("Website QA");
  await expect(
    page.getByRole("link", { name: "Open email draft" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Call 604-627-0166", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Send quote request" }).click();
  await expect(
    page.getByRole("heading", { name: /Thanks — your project request/ }),
  ).toBeVisible();
  expect(ids).toHaveLength(2);
  expect(ids[0]).toBe(ids[1]);
});
test("invalid data makes no delivery request and mobile direct form fits", async ({
  page,
}) => {
  let count = 0;
  await page.route("**/api/quote", async (r) => {
    count++;
    await r.fulfill({ json: { ok: true } });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await fill(page);
  await page.getByLabel("Phone number").fill("123");
  await page.getByRole("button", { name: "Send quote request" }).click();
  await expect(page.locator(".form-error")).toContainText("valid phone number");
  expect(count).toBe(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("other service reveals required mobile field and submits its value with retry data", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const bodies: Record<string, unknown>[] = [];
  await page.route("**/api/quote", async (route) => {
    bodies.push(route.request().postDataJSON());
    await route.fulfill({ status: 502, json: { error: "unavailable" } });
  });
  await fill(page);
  const service = page.getByLabel("Service needed");
  const other = page.getByLabel("What do you need help with?");
  await expect(other).toHaveCount(0);
  expect((await service.locator("option").allTextContents()).slice(-2)).toEqual(
    ["Not sure / multiple services", "Other / Something else"],
  );
  await service.selectOption("other");
  await expect(other).toBeVisible();
  await expect(other).toHaveAttribute("required", "");
  await expect(other).toHaveAttribute(
    "placeholder",
    "Briefly describe the service you need",
  );
  await page.getByRole("button", { name: "Send quote request" }).click();
  await expect(other).toBeFocused();
  expect(bodies).toHaveLength(0);
  await other.fill("Door adjustment");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Send quote request" }).click();
  await expect(page.locator(".form-error")).toBeVisible();
  expect(bodies[0].otherService).toBe("Door adjustment");
  expect(
    decodeURIComponent(
      (await page
        .getByRole("link", { name: "Open email draft" })
        .getAttribute("href"))!,
    ),
  ).toContain("Other service: Door adjustment");
  await expect(other).toHaveValue("Door adjustment");
  await page.getByRole("button", { name: "Send quote request" }).click();
  await expect.poll(() => bodies.length).toBe(2);
  expect(bodies[1].submissionId).toBe(bodies[0].submissionId);
  await service.selectOption("general-repairs");
  await expect(other).toHaveCount(0);
  await page.getByRole("button", { name: "Send quote request" }).click();
  await expect.poll(() => bodies.length).toBe(3);
  expect(bodies[2]).not.toHaveProperty("otherService");
});
