import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage {
    protected page: Page

    constructor(page: Page) {
        this.page = page
    }

    protected abstract root(): Locator;
    protected abstract pageName: string;
    protected abstract pageUrl: string;

    async open() {
        await this.page.goto(this.pageUrl);
        await this.waitForOpen();
    }

    async waitForOpen() {
        await expect(this.root(),
            "Страница " + this.pageName + " не открылась").
            toBeVisible();
    }

    async waitForUrl(re: RegExp) {
        await expect(this.page).toHaveURL(re);
    }

    async clickAndWaitForUrl(clickable: Locator, re: RegExp) {
        await Promise.all([
            this.page.waitForURL(re),
            clickable.click()
        ]);
    }
}