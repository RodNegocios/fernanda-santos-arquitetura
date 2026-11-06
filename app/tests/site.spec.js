import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function revealAll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
}

test("production loads real content, local images and fonts without runtime errors", async ({
  page,
}) => {
  const errors = [];
  const badResponses = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400) badResponses.push(response.url());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Espaços para viver.Projetos para sentir.",
  );
  await revealAll(page);
  await page.waitForFunction(() =>
    [...document.querySelectorAll("img")].every(
      (img) => img.complete && img.naturalWidth > 0,
    ),
  );
  expect(errors).toEqual([]);
  expect(badResponses).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.lang)).toBe(
    "pt-BR",
  );
});

test("portfolio filters, opens projects, supports keyboard navigation and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Comerciais", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  const card = page.getByRole("button", {
    name: "Ver projeto: Aprender, criar, descobrir",
  });
  await card.click();
  await expect(
    page.getByRole("dialog", { name: "Aprender, criar, descobrir" }),
  ).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#project-dialog-title")).toHaveText(
    "Geometria que acolhe",
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".gallery-dialog")).not.toBeVisible();
  await expect(card).toBeFocused();
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
});

test("architecture animates without input and can be paused", async ({
  page,
}) => {
  await page.goto("/");
  const line = page.locator(".hero .plan-animated path").nth(2);
  const before = await line.evaluate(
    (el) => getComputedStyle(el).strokeDashoffset,
  );
  await page.waitForTimeout(450);
  const after = await line.evaluate(
    (el) => getComputedStyle(el).strokeDashoffset,
  );
  expect(after).not.toBe(before);
  await page.getByRole("button", { name: "Pausar animações" }).click();
  await expect(page.locator(".site")).toHaveClass(/motion-paused/);
  expect(
    await line.evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  await page.getByRole("button", { name: "Ativar animações" }).click();
  await expect(page.locator(".site")).not.toHaveClass(/motion-paused/);
});

test("reduced motion leaves content visible and disables continuous motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".site")).toHaveClass(/motion-paused/);
  expect(
    await page
      .locator(".hero .plan-animated path")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await expect(
    page.getByRole("button", { name: "Ativar animações" }),
  ).toBeDisabled();
  await page.locator("#sobre").scrollIntoViewIfNeeded();
  await expect(page.locator(".about-content")).toHaveCSS("opacity", "1");
});

test("responsive layouts and mobile menu work at 360, 390, 768 and 1440 pixels", async ({
  page,
}) => {
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width < 760) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await expect(page.locator("#navigation")).toBeVisible();
      await page
        .getByRole("navigation")
        .getByRole("link", { name: "Sobre mim" })
        .click();
      await expect(page).toHaveURL(/#sobre$/);
      await expect(page.locator("#navigation")).not.toBeVisible();
    }
  }
});

test("interactive reference cards and privacy dialog work with the keyboard", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.getByRole("button", {
    name: "Abrir projeto: A vida acontece aqui",
  });
  await card.scrollIntoViewIfNeeded();
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#project-dialog-title")).toHaveText(
    "A vida acontece aqui",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Privacidade", exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Sua privacidade." }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".privacy-dialog")).not.toBeVisible();
});

test("contact links use the provided information and open safely", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Converse com a Fernanda" }),
  ).toHaveAttribute("href", /^https:\/\/wa.me\/5592992192321/);
  await expect(
    page.getByRole("link", { name: "@arq_fernandas" }),
  ).toHaveAttribute("href", "https://www.instagram.com/arq_fernandas/");
  await expect(page.getByRole("link", { name: "Ver no mapa" })).toHaveAttribute(
    "href",
    /Lions.*1366.*Sapezal/,
  );
  for (const link of await page.locator('a[target="_blank"]').all())
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

test("main page and project dialog have no automated WCAG A/AA violations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await revealAll(page);
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
  await page.locator(".project-card").first().click();
  const dialogResult = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    dialogResult.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});
