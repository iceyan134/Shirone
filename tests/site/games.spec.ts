import { expect, test } from "@playwright/test";

const GAME_COUNT = 26;
const STEAM_GAME_COUNT = 20;

test.describe("游戏体验页", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/games/");
		await expect(page.locator(".game-card")).toHaveCount(GAME_COUNT);
	});

	test("显示六项独立整合包与模组体验，并标记为已体验", async ({ page }) => {
		await expect(page.locator("#swup-container")).toHaveAttribute(
			"data-current-page",
			"games",
		);
		await expect(page.locator(".games-section__count")).toContainText("26");

		const atm9 = page.locator('[data-game="minecraft-atm9"]');
		await expect(atm9.locator("h2")).toHaveText("All the Mods 9（ATM9）");
		await expect(atm9.locator(".game-card__developer")).toHaveText("ATMTeam");
		await expect(atm9.locator('[data-status="played"]')).toBeVisible();
		await expect(atm9.locator(".game-card__rating")).toHaveCount(0);
		await expect(atm9.locator(".game-card__hours")).toHaveCount(0);
		await expect(atm9.locator(".game-card__link")).toHaveAttribute(
			"href",
			"https://www.curseforge.com/minecraft/modpacks/all-the-mods-9",
		);

		await expect(
			page.locator('[data-game="minecraft-cobblemon-chibai-zhenxing"]'),
		).toBeVisible();
		await expect(
			page.locator('[data-game="minecraft-deceasedcraft"]'),
		).toBeVisible();
		await expect(
			page.locator('[data-game="minecraft-create-above-and-beyond"]'),
		).toBeVisible();
		await expect(page.locator('[data-game="terraria-calamity"]')).toBeVisible();
		await expect(
			page.locator('[data-game="terraria-story-of-red-cloud"]'),
		).toBeVisible();

		const counterStrike = page.locator('[data-game="steam-730"]');
		await expect(counterStrike.locator("h2")).toHaveText("Counter-Strike 2");
		await expect(counterStrike.locator(".game-card__hours")).toContainText(
			"382.6",
		);
		await expect(counterStrike.locator('[data-status="played"]')).toBeVisible();
	});

	test("分类筛选与刷新保留对应体验条目", async ({ page }) => {
		await page
			.getByRole("button", { name: "Minecraft 整合包", exact: true })
			.click();
		await expect(page.locator(".game-card")).toHaveCount(4);
		await expect(page.locator('[data-game="minecraft-atm9"]')).toBeVisible();
		await expect(page.locator('[data-game="terraria-calamity"]')).toHaveCount(
			0,
		);
		await expect(page.locator('[data-game^="steam-"]')).toHaveCount(0);
		await expect(page.locator(".games-section__count")).toContainText("4");

		await page.reload();
		await expect(page.locator(".game-card")).toHaveCount(4);
		await expect(
			page.getByRole("button", { name: "Minecraft 整合包", exact: true }),
		).toHaveAttribute("aria-pressed", "true");

		await page
			.getByRole("button", { name: "Minecraft 整合包", exact: true })
			.click();
		await page
			.getByRole("button", { name: "泰拉瑞亚模组", exact: true })
			.click();
		await expect(page.locator(".game-card")).toHaveCount(2);
		await expect(page.locator('[data-game="terraria-calamity"]')).toBeVisible();
		await expect(
			page.locator('[data-game="terraria-story-of-red-cloud"]'),
		).toBeVisible();

		await page
			.getByRole("button", { name: "泰拉瑞亚模组", exact: true })
			.click();
		await page
			.getByRole("button", { name: "Steam 常玩游戏", exact: true })
			.click();
		await expect(page.locator(".game-card")).toHaveCount(STEAM_GAME_COUNT);
		await expect(page.locator('[data-game^="steam-"]')).toHaveCount(
			STEAM_GAME_COUNT,
		);
	});

	test("搜索体验条目并清除查询", async ({ page }) => {
		const searchInput = page.locator(".games-section__search input");
		await searchInput.fill("红云物语");
		await expect(page.locator(".game-card")).toHaveCount(1);
		await expect(
			page.locator('[data-game="terraria-story-of-red-cloud"]'),
		).toBeVisible();
		await expect(page).toHaveURL(/[?&]q=/);

		await page.locator(".games-section__search-clear").click();
		await expect(page.locator(".game-card")).toHaveCount(GAME_COUNT);
		await expect(page).not.toHaveURL(/q=/);
	});

	test("搜索无结果时展示空状态反馈", async ({ page }) => {
		await page.locator(".games-section__search input").fill("Unknown9999");
		await expect(page.locator(".game-card")).toHaveCount(0);
		await expect(page.locator(".games-section__empty")).toBeVisible();
	});

	test("从持久顶栏导航时同步游戏页状态", async ({ page }) => {
		await page.goto("/skills/", { waitUntil: "domcontentloaded" });
		await page
			.locator("[data-nav-group]")
			.filter({ has: page.locator(".top-app-bar__nav-link") })
			.last()
			.locator("button.top-app-bar__nav-link")
			.click();
		await page.locator('a[data-nav-key="games"]').click();

		await expect(page).toHaveURL(/\/games\/$/);
		await expect(page.locator("#swup-container")).toHaveAttribute(
			"data-current-page",
			"games",
		);
		await expect(page.locator(".game-card")).toHaveCount(GAME_COUNT);
		await expect(page.locator('a[data-nav-key="games"]')).toHaveAttribute(
			"aria-current",
			"page",
		);
	});
});
