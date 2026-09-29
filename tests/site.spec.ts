import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projectTemplates } from "../src/lib/projects";
import { site } from "../src/lib/site";
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
  "/projects",
  ...projectTemplates.map((t) => `/projects/templates/${t.slug}`),
];
const titles = new Set<string>();
const descriptions = new Set<string>();
for (const path of pages)
  test(`page ${path}: SEO, accessibility and responsive layout`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const links = new Set<string>();
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
    for (const href of links)
      expect((await request.get(href)).status(), href).toBe(200);
    expect(errors).toEqual([]);
  });
test("seven responsive sizes, mobile menu, FAQ and screenshots", async ({
  page,
  browser,
}) => {
  for (const width of [375, 390, 430, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      baseURL: process.env.TEST_BASE_URL || "http://localhost:3000",
    });
    const responsivePage = await context.newPage();
    await responsivePage.goto("/");
    expect(
      await responsivePage.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await expect(
      responsivePage.getByRole("heading", { level: 1 }),
    ).toBeVisible();
    await context.close();
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
  await page
    .locator(".hero-visual img")
    .evaluate((image) => (image as HTMLImageElement).decode());
  await page.screenshot({ path: "docs/home-mobile.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page
    .locator(".hero-visual img")
    .evaluate((image) => (image as HTMLImageElement).decode());
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
  await expect(page.locator(".form-error[role=alert]")).toContainText(
    "valid phone number",
  );
});
test("sitemap, robots, 404, disabled services and delivery fallback", async ({
  request,
}) => {
  const map = await request.get("/sitemap.xml");
  expect(map.status()).toBe(200);
  const xml = await map.text();
  expect((xml.match(/<loc>/g) || []).length).toBe(16);
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

test("business schema, visible FAQs and template indexing stay truthful", async ({
  page,
  request,
}) => {
  await page.goto("/contact");
  const graph = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  const business = graph
    .flatMap((raw) => JSON.parse(raw)["@graph"] || [])
    .find((node) => node["@id"] === `${site.url}/#business`);
  expect(business["@type"]).toBe("HomeAndConstructionBusiness");
  expect(business.telephone).toBe(site.tel);
  expect(business.email).toBe(site.email);
  await expect(
    page.getByRole("link", { name: site.email }).first(),
  ).toHaveAttribute("href", `mailto:${site.email}`);
  expect(business.areaServed).toEqual(site.areaServed);
  expect(business.hasOfferCatalog.itemListElement).toHaveLength(
    services.length,
  );
  for (const field of [
    "address",
    "aggregateRating",
    "review",
    "openingHours",
    "geo",
  ])
    expect(business).not.toHaveProperty(field);
  for (const path of [
    "/",
    "/contact",
    ...services.map((s) => `/services/${s.slug}`),
  ]) {
    await page.goto(path);
    const schemas = (
      await page.locator('script[type="application/ld+json"]').allTextContents()
    ).map((raw) => JSON.parse(raw));
    const faq = schemas.find((schema) => schema["@type"] === "FAQPage");
    const details = page.locator(".faq-list details");
    expect(faq.mainEntity).toHaveLength(await details.count());
    for (let i = 0; i < faq.mainEntity.length; i++) {
      await expect(details.nth(i).locator("summary")).toContainText(
        faq.mainEntity[i].name,
      );
      await details.nth(i).locator("summary").click();
      await expect(details.nth(i).locator("p")).toBeVisible();
      await expect(details.nth(i).locator("p")).toHaveText(
        faq.mainEntity[i].acceptedAnswer.text,
      );
    }
  }
  const map = await (await request.get("/sitemap.xml")).text();
  expect(map).toContain(`${site.url}/projects</loc>`);
  expect(map).not.toContain("/projects/templates/");
  for (const template of projectTemplates) {
    await page.goto(`/projects/templates/${template.slug}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );
    await expect(
      page.getByRole("heading", { name: "Not a completed project." }),
    ).toBeVisible();
    await expect(page.locator(".project-template")).toContainText(
      "TEMPLATE ONLY",
    );
  }
  await page.goto("/projects");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index, follow",
  );
});
