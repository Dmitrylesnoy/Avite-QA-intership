import { test, expect } from '@playwright/test';
import { MainPage } from '../../../pages/mainPage/mainPage';

test.describe('SORT-PRICE-01: Проверка сортировки по цене', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        mainPage.open();
    });

    test('Сортировка по цене по возрастанию и убыванию', async () => {
        mainPage.setSorting('Цена');
        mainPage.setOrder('По возрастанию');

        const ascendingPosts = await mainPage.getPosts();

        if (!ascendingPosts) throw new Error("Не удалось получить список объявлений");
        const ascendingPrices = ascendingPosts.map((post: any) => post.price);

        mainPage.setOrder('По убыванию');
        const descendingPosts = await mainPage.getPosts();
        if (!descendingPosts) throw new Error("Не удалось получить список объявлений");
        const descendingPrices = descendingPosts.map((post: any) => post.price);
        expect(descendingPrices).toEqual([...descendingPrices].sort((a, b) => b - a));
    });
});
