import { Locator, Page, Expect } from "@playwright/test";
import { BasePage } from "../basePage";
import * as postCard from "./types/postCard";

export class MainPage extends BasePage {
    protected pageName = "Главная страница";

    readonly rootLocator: Locator;
    readonly statsPageBtn: Locator;
    readonly postsList: Locator;
    readonly priceDownInput: Locator;
    readonly priceUpInput: Locator
    readonly categorySelector: Locator;
    readonly prioritySelector: Locator;
    readonly prorityToggle: Locator;
    readonly sortingSelector: Locator;
    readonly orderSelector: Locator;

    constructor(page: Page) {
        super(page);
        this.rootLocator = this.page.locator("#root");
        this.statsPageBtn = this.page.locator("[href='/stats']");
        this.priceDownInput = this.page.locator("input[placeholder='От']");
        this.priceUpInput = this.page.locator("input[placeholder='До']");
        this.postsList = this.page.locator("\\div[contains(@class, 'cards')]");
        this.categorySelector = this.page.locator("//label[text()='Категория']/following-sibling::select[1]");
        this.prioritySelector = this.page.locator("//label[text()='Приоритет']/following-sibling::select[1]");
        this.prorityToggle = this.page.locator("//input[@type='checkbox' and contains(@class, 'ugrentToggle')]");
        this.sortingSelector = this.page.locator("//label[text()='Сортировать по']/following-sibling::select[1]");
        this.orderSelector = this.page.locator("//label[text()='Порядок']/following-sibling::select[1]");
    }

    protected root(): Locator {
        return this.page.locator("#root");
    }

    async clickStatsPageBtn(): Promise<void> {
        await this.clickAndWaitForUrl(this.statsPageBtn, /\/stats/);
    }

    async setPriceDown(price: number) {
        await this.priceDownInput.fill(price.toString());
    }

    async setPriceUp(price: number) {
        await this.priceUpInput.fill(price.toString());
    }

    async getPosts() {
        const postsList: postCard.PostItem[] = [];
        const postElements = await this.postsList.all();
        for (const post of postElements) {
            const title = await post.locator(postCard.titleSelector).textContent() ?? "";
            const price = parseFloat(await post.locator(postCard.priceSelector).textContent() ?? "0");
            const category = await post.locator(postCard.categorySelector).textContent() ?? "";
            const express = await post.locator(postCard.prioritySelector).textContent() == "Срочно" ? true : false;
            const status = await post.locator(postCard.statusSelector).textContent() ?? "";
            const date = await post.locator(postCard.dateSelector).textContent() ?? "";
            postsList.push({ title, price, category, express, status, date });
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
        await this.sortingSelector.selectOption({ label: sorting });
    }

    async setOrder(order: string) {
        await this.orderSelector.selectOption({ label: order });
    }
}