import { expect, test } from "playwright/test";

test("home page exposes payment and contact links", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("link", { name: "Micro Donate & Payment" }),
  ).toHaveAttribute("href", "https://microtronic-thailand.github.io/micro-payment/");
  await expect(page.getByRole("link", { name: "Facebook" })).toBeVisible();
  await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Discord" })).toBeVisible();
  await expect(page.getByRole("link", { name: "LINE" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Email" })).toBeVisible();
});

test("search opens a template detail route in the same tab", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("lang", "th");
  await page.getByRole("searchbox", { name: "ค้นหาชื่อเทมเพลต" }).fill("x-template-001");
  await expect(page.getByText("พบ 1 รายการ")).toBeVisible();

  await page.getByRole("link", { name: /x-template-001/ }).click();
  await expect(page).toHaveURL(/\/template\/x-template-001$/);
  await expect(page.getByRole("heading", { name: "x-template-001" })).toBeVisible();
  await expect(page).toHaveTitle(/x-template-001/);
});

test("daily featured hero handles available templates and has spacing before promotions", async ({ page }) => {
  await page.goto("/");

  const hero = page.getByRole("region", { name: "เทมเพลตเด่นประจำวัน" });
  await expect(hero).toBeVisible();
  const heading = hero.getByRole("heading", { level: 2 });
  const thumbnails = hero.getByRole("button", { name: /^แสดง / });
  if ((await thumbnails.count()) > 1) {
    const initialTemplate = await heading.textContent();
    await hero.getByRole("button", { name: "ภาพถัดไป" }).click();
    await expect(heading).not.toHaveText(initialTemplate ?? "");
  } else {
    await expect(hero.getByRole("button", { name: "ภาพถัดไป" })).toHaveCount(0);
  }

  const spacing = await page.evaluate(() => {
    const heroElement = document.querySelector(
      'section[aria-label="เทมเพลตเด่นประจำวัน"]',
    );
    const promotionElement = document.querySelector(
      'a[aria-label="Download HTML5 Free Template"]',
    );

    if (!heroElement || !promotionElement) {
      return null;
    }

    return {
      heroBottom: heroElement.getBoundingClientRect().bottom,
      promotionTop: promotionElement.getBoundingClientRect().top,
    };
  });

  if (!spacing) {
    throw new Error("Hero or free-template promotion was not found on the home page.");
  }

  expect(spacing.promotionTop - spacing.heroBottom).toBeGreaterThanOrEqual(40);
});

test("gallery displays registered templates and paginates only when needed", async ({ page }) => {
  await page.goto("/");

  const templateLinks = page
    .getByRole("region", { name: "รายการเทมเพลต" })
    .locator('a[href^="/template/"]');
  const resultText = await page.getByText(/^พบ \d+ รายการ$/).textContent();
  const templateCount = Number(resultText?.match(/\d+/)?.[0]);
  if (!Number.isInteger(templateCount)) {
    throw new Error("The gallery result count was not found.");
  }

  await expect(templateLinks).toHaveCount(Math.min(templateCount, 12));
  if (templateCount > 12) {
    await page.getByRole("button", { name: "หน้า 2" }).click();
    await expect(page.getByRole("button", { name: "หน้า 2" })).toHaveAttribute("aria-current", "page");
    await expect(templateLinks).toHaveCount(Math.min(templateCount - 12, 12));
  } else {
    await expect(page.getByRole("navigation", { name: "Pagination" })).toHaveCount(0);
  }
});

test("pricing page includes shared company and legal links", async ({ page }) => {
  await page.goto("/pricing");

  await expect(page.getByRole("heading", { name: "ราคาเทมเพลต" })).toBeVisible();
  await expect(page.getByText("2,500")).toBeVisible();
  await expect(page.getByText("3,500")).toBeVisible();
  await expect(page.getByText("5,000")).toBeVisible();
  await expect(
    page.getByText("ไม่มีบริการซัพพอร์ตหรือบริการหลังการขาย", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Privacy Policy" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Terms of Service" })).toBeVisible();
  await expect(page.getByText("Powered by Microtronic © 2026 Microtronic Co., Ltd.")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Official Website: https://microtronic.biz/" }),
  ).toBeVisible();
});

test("cookie choices persist and settings can be reopened", async ({ page }) => {
  await page.goto("/");

  const notice = page.getByRole("complementary", { name: "Cookies & browser storage" });
  await expect(notice).toBeVisible();
  await notice.getByRole("button", { name: "Cookies Settings" }).click();
  await expect(page.getByText(/ไม่มีหมวด analytics/)).toBeVisible();
  await notice.getByRole("button", { name: "Reject All" }).click();
  await expect(notice).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Cookies Settings" })).toBeVisible();
  expect(await page.evaluate(() => window.localStorage.getItem("micro-gallery-cookie-choice-v1"))).toBe("rejected");

  await page.reload();
  await expect(page.getByRole("complementary", { name: "Cookies & browser storage" })).toHaveCount(0);
  await page.getByRole("button", { name: "Cookies Settings" }).click();
  await expect(page.getByText(/ตัวเลือกที่บันทึกไว้: rejected/)).toBeVisible();
});

test("cookie accept and dismiss choices are recorded", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("complementary", { name: "Cookies & browser storage" })
    .getByRole("button", { name: "Accept All" })
    .click();

  expect(await page.evaluate(() => window.localStorage.getItem("micro-gallery-cookie-choice-v1"))).toBe("accepted");
  await page.reload();
  await page.getByRole("button", { name: "Cookies Settings" }).click();
  await page.getByRole("button", { name: "ปิดการแจ้งเตือน Cookies" }).click();
  expect(await page.evaluate(() => window.localStorage.getItem("micro-gallery-cookie-choice-v1"))).toBe("dismissed");
});
