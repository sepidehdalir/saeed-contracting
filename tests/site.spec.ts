import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { services } from "../src/lib/services";
const pages = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  "/about",
  "/service-areas",
  "/contact",
  "/request-a-quote",
  "/privacy",
];
test("all public pages: metadata, navigation, schema, accessibility and responsive layout", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const links = new Set<string>();
  for (const path of pages) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    await page.locator("h1").waitFor();
    await expect(page.locator("h1")).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    const desc = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(desc).toBeTruthy();
    expect(descriptions.has(desc!)).toBe(false);
    descriptions.add(desc!);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://saeedcontracting.ca${path === "/" ? "" : path}`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(
      page.locator('meta[property="og:image"]').first(),
    ).toHaveAttribute("content", /^https:\/\/saeedcontracting.ca\//);
    const content = await page.locator("body").innerText();
    expect(content).not.toMatch(
      /electrical services|red seal|licensed electrician/i,
    );
    const schemas = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    for (const schema of schemas) {
      const data = JSON.parse(schema);
      expect(data["@context"]).toBe("https://schema.org");
    }
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
        `${path} overflow at ${width}`,
      ).toBe(true);
    }
    const a11y = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      a11y.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      path,
    ).toEqual([]);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((anchors) =>
        anchors.map((a) => a.getAttribute("href") || ""),
      )) {
      if (href.startsWith("/")) links.add(href.split("?")[0]);
    }
  }
  for (const href of links)
    expect((await request.get(href)).status(), href).toBe(200);
  expect(errors).toEqual([]);
});
test("seven responsive sizes, mobile menu, FAQ and screenshots", async ({
  page,
}) => {
  for (const width of [375, 390, 430, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
  await page.getByRole("button", { name: "Menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeHidden();
  await page.goto("/");
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.locator("summary").first().click();
  await page.screenshot({ path: "docs/home-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "docs/home-desktop.png", fullPage: true });
});
test("quote form validates, preselects service and prepares an unsent email", async ({
  page,
}) => {
  await page.goto("/request-a-quote?service=general-repairs");
  await expect(page.getByLabel("Service needed")).toHaveValue(
    "general-repairs",
  );
  await page.getByLabel("Your name").fill("Website QA");
  await page.getByLabel("Phone number").fill("6045550123");
  await page.getByLabel("Email address").fill("qa@example.com");
  await page.getByLabel("City / neighbourhood").fill("North Vancouver");
  await page.getByLabel("Preferred timing").selectOption("Flexible");
  await page
    .getByLabel("Tell us about the project")
    .fill("Testing the quote draft flow. This is not a customer enquiry.");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Prepare email request" }).click();
  await expect(
    page.getByRole("heading", { name: "Your email is ready to send." }),
  ).toBeVisible();
  const href = await page
    .getByRole("link", { name: "Open email draft" })
    .getAttribute("href");
  expect(href).toContain("mailto:info@saeedcontracting.ca");
  expect(decodeURIComponent(href!)).toContain("Website QA");
  await expect(page.getByText("Request sent.", { exact: true })).toHaveCount(0);
  await page.getByLabel("Phone number").fill("123");
  await page.getByRole("button", { name: "Prepare email request" }).click();
  await expect(page.getByRole("alert")).toContainText("valid phone number");
});
test("sitemap, robots, 404, disabled services and delivery fallback", async ({
  request,
}) => {
  const map = await request.get("/sitemap.xml");
  expect(map.status()).toBe(200);
  const xml = await map.text();
  expect((xml.match(/<loc>/g) || []).length).toBe(15);
  expect(xml).not.toContain("electrical");
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(
    "https://saeedcontracting.ca/sitemap.xml",
  );
  for (const path of ["/does-not-exist", "/services/electrical-services"])
    expect((await request.get(path)).status()).toBe(404);
  const blocked = await request.post("/api/quote", {
    headers: { Origin: "https://evil.example" },
    data: {},
  });
  expect(blocked.status()).toBe(403);
  const oversized = await request.post("/api/quote", {
    headers: { Origin: "https://saeedcontracting.ca" },
    data: { description: "x".repeat(17000) },
  });
  expect(oversized.status()).toBe(413);
  const fallback = await request.post("/api/quote", {
    headers: { Origin: "https://saeedcontracting.ca" },
    data: {
      name: "Website QA",
      email: "qa@example.com",
      phone: "6045550123",
      city: "North Vancouver",
      service: "general-repairs",
      description: "Testing safe fallback, not an actual enquiry.",
      timing: "Flexible",
      consent: true,
      website: "",
    },
  });
  expect(fallback.status()).toBe(503);
  expect(await fallback.text()).toContain("unavailable");
});
