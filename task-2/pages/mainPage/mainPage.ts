import { Locator, Page } from "@playwright/test";
import { BasePage } from "../basePage";
import * as postCard from "./types/postCard";
import { sortingMap, sortOrderMap } from './types/consts';

export class MainPage extends BasePage {
    protected pageName = "Главная страница";
    protected pageUrl = "/";

    readonly header: Locator;
    readonly statsPageBtn: Locator;
    readonly postsList: Locator;
    readonly priceDownInput: Locator;
    readonly priceUpInput: Locator
    readonly categorySelector: Locator;
    readonly prioritySelector: Locator;
    readonly prorityToggle: Locator;
    readonly sortingSelector: Locator;
    readonly orderSelector: Locator;
    readonly emptyResultMessage: Locator;
    readonly themeToggleButton: Locator;
    readonly themeLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.header = this.page.locator("header");
        this.statsPageBtn = this.page.locator("[href='/stats']");
        this.priceDownInput = this.page.locator('//input[@placeholder="От"]');
        this.priceUpInput = this.page.locator('//input[@placeholder="До"]');
        this.postsList = this.page.locator('//div[contains(@class, "cards")]/div[contains(@class, "card")]');
        this.categorySelector = this.page.locator('//label[text()="Категория"]/following-sibling::select[1]');
        this.prioritySelector = this.page.locator('//label[text()="Приоритет"]/following-sibling::select[1]');
        this.prorityToggle = this.page.locator('//span[contains(@class, "urgentToggle") and contains(@class, "slider")]');
        this.sortingSelector = this.page.locator('//label[text()="Сортировать по"]/following-sibling::select');
        this.orderSelector = this.page.locator('//label[text()="Порядок"]/following-sibling::select[1]');
        this.emptyResultMessage = this.page.locator('//div[contains(@class, "empty")]');
        this.themeToggleButton = this.page.locator('button:has-text("Светлая"), button:has-text("Темная")');
        this.themeLocator = this.page.locator(':root');

    }

    protected root(): Locator {
        return this.header;
    }

    async clickStatsPageBtn() {
        await this.clickAndWaitForUrl(this.statsPageBtn, /\/stats/);
    }

    async setPriceDown(price: number) {
        await this.priceDownInput.fill(price.toString());
    }

    async setPriceUp(price: number) {
        await this.priceUpInput.fill(price.toString());
    }

    async clearPriceDown() {
        await this.priceDownInput.fill('');
    }

    async clearPriceUp() {
        await this.priceUpInput.fill('');
    }

    async getPosts() {
        if (await this.emptyResultMessage.isVisible()) {
            return [];
        }
        await this.postsList.first().waitFor();
        const postsList: postCard.PostItem[] = [];
        const postElements = await this.postsList.all();

        for (const [index, post] of postElements.entries()) {
            const postClass = await post.getAttribute('class');

            const title = await post.locator(postCard.titleSelector).first().textContent() ?? "";

            const priceRaw = await post.locator(postCard.priceSelector).textContent() ?? "0";
            const price = parseFloat(priceRaw.replace(/[^\d.-]/g, '')) || 0;

            const category = await post.locator(postCard.categorySelector).textContent() ?? "";

            const priorityElement = post.locator(postCard.prioritySelector);
            const priorityCount = await priorityElement.count();
            const priority = priorityCount > 0 ? (await priorityElement.textContent() ?? "").includes("Срочно") : false;

            const status = await post.locator(postCard.statusSelector).textContent() ?? "";
            const date = await post.locator(postCard.dateSelector).textContent() ?? "";
            postsList.push({ title, price, category, priority, status, date });
        }
        return postsList;
    }

    async setCategory(category: string) {
        await this.categorySelector.selectOption({ label: category });
    }

    async setPriority(priority: string) {
        await this.prioritySelector.selectOption({ label: priority });
    }

    async togglePriority() {
        await this.prorityToggle.click();
    }

    async setSorting(sorting: string) {
        const optionValue = sortingMap[sorting];
        if (!optionValue) {
            throw new Error(`Unknown sorting option: ${sorting}`);
        }
        await this.sortingSelector.selectOption(optionValue);
    }

    async getSortingOption() {
        return (await this.sortingSelector.locator('option:checked').textContent())?.trim() ?? '';
    }

    async setOrder(order: string) {
        const optionValue = sortOrderMap[order];
        if (!optionValue) {
            throw new Error(`Unknown sort order: ${order}`);
        }
        await this.orderSelector.selectOption(optionValue);
    }

    async getOrderOption() {
        return (await this.orderSelector.locator('option:checked').textContent())?.trim() ?? '';
    }

    async clickThemeToggle() {
        await this.themeToggleButton.click();
    }

    async getThemeToggleText() {
        return (await this.themeToggleButton.textContent())?.trim() ?? '';
    }

    async getTheme() {
        return await this.themeLocator.getAttribute('data-theme') ?? '';
    }

    async isPriorityToggleChecked() {
        return await this.prorityToggle.isChecked();
    }

    async getSelectedPriority() {
        return await this.prioritySelector.textContent();
    }
}