import { Locator, Page, Expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class StatsPage extends BasePage {
    protected pageName = "Cтраница статистики";
    protected pageUrl = "/stats";

    readonly header: Locator;
    readonly refreshTimerbtn: Locator;
    readonly toggleTimerBtn: Locator;
    readonly timerValue: Locator;

    constructor(page: Page) {
        super(page);
        this.header = this.page.locator("\\header");
        this.refreshTimerbtn = this.page.locator("\\button[contains(@class, 'refresh')]");
        this.toggleTimerBtn = this.page.locator("\\button[contains(@class, 'toggle')]")
        this.timerValue = this.page.locator("\\span[contains(@class, 'timerLabel')]");
    }

    protected root(): Locator {
        return this.header;
    }

    async open() {
        await this.page.goto("/list");
        await this.waitForOpen();
    }

    async clickRefreshTimerBtn() {
        await this.refreshTimerbtn.click();
    }

    async clickToggleTimerBtn() {
        await this.toggleTimerBtn.click();
    }

    async getToggleBtnState() {
        const classAttr = await this.toggleTimerBtn.getAttribute('class');
        return classAttr ? classAttr.includes('active') : false;
    }

    async getTimerValue() {
        return await this.timerValue.textContent();
    }
}