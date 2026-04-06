import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";

export class StatsPage extends BasePage {
    protected pageName = "Страница статистики";
    protected pageUrl = "/stats";

    readonly header: Locator;
    readonly refreshTimerbtn: Locator;
    readonly toggleTimerBtn: Locator;
    readonly timerValue: Locator;
    readonly autoUpdateDisabledMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.header = this.page.locator("//header");
        this.refreshTimerbtn = this.page.locator("//button[contains(@class, 'refresh')]");
        this.toggleTimerBtn = this.page.locator("//button[contains(@class, 'toggle')]")
        this.timerValue = this.page.locator("//span[contains(@class, 'timeValue')]");
        this.autoUpdateDisabledMsg = this.page.locator('//span[contains(text(), "Автообновление выключено")]');
    }

    protected root(): Locator {
        return this.header;
    }

    async open() {
        await this.page.goto(this.pageUrl);
        await this.waitForOpen();
    }

    async clickRefreshTimerBtn() {
        await this.refreshTimerbtn.click();
    }

    async clickToggleTimerBtn() {
        await this.toggleTimerBtn.click();
    }

    async getToggleButtonText() {
        return (await this.toggleTimerBtn.textContent())?.trim() ?? '';
    }

    async getToggleBtnState() {
        const classAttr = await this.toggleTimerBtn.getAttribute('class');
        return classAttr ? classAttr.includes('active') : false;
    }

    async getTimerValue() {
        return (await this.timerValue.textContent())?.trim() ?? '';
    }

    async isUpdateDisabledMsgVisible() {
        return await this.autoUpdateDisabledMsg.isVisible();
    }
}