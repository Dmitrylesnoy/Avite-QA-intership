import { Locator, Page, Expect } from "@playwright/test";
import { BasePage } from "../basePage";

export class MainPage extends BasePage {
    protected pageName = "Главная страница";

    readonly rootLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.rootLocator = this.page.locator("#root");
    }

    protected root(): Locator {
        return this.page.locator("#root");
    }
}