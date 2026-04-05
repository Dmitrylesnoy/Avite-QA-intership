import { test, expect } from '@playwright/test';
import { MainPage } from '../../../pages/mainPage/mainPage';

test.describe('SORT-PRICE-01: Проверка сортировки по цене', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
        await mainPage.clearPriceDown();
        await mainPage.clearPriceUp();
    });

    test('Сортировка по цене по возрастанию и убыванию', async () => {
        await mainPage.setSorting('Цена');
        expect(await mainPage.getSortingOption()).toContain('Цене');

        await mainPage.setOrder('По возрастанию');
        expect(await mainPage.getOrderOption()).toContain('По возрастанию');
        const ascendingPosts = await mainPage.getPosts();
        const ascendingPrices = ascendingPosts.map(post => post.price);
        expect(ascendingPrices).toEqual([...ascendingPrices].sort((a, b) => a - b));

        await mainPage.setOrder('По убыванию');
        expect(await mainPage.getOrderOption()).toContain('По убыванию');
        const descendingPosts = await mainPage.getPosts();
        const descendingPrices = descendingPosts.map(post => post.price);
        expect(descendingPrices).toEqual([...descendingPrices].sort((a, b) => b - a));
    });
});
