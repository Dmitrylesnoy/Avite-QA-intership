import { test, expect } from '@playwright/test';
import { MainPage } from '../../../pages/mainPage/mainPage';
import { categoriesMap } from '../../../pages/mainPage/types/consts';

test.describe('FILTER-CATEG-01: Проверка фильтра категории', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test('По умолчанию отображаются объявления всех категорий', async () => {
        await mainPage.setCategory('Все категории');
        const posts = await mainPage.getPosts();
        expect(posts.length).toBeGreaterThan(0);
    });

    for (const category of Object.keys(categoriesMap)) {
        test(`Категория ${category} должна возвращать только объявления из категории ${category}`, async () => {
            await mainPage.setCategory(category);
            const posts = await mainPage.getPosts();

            expect(posts.length).toBeGreaterThan(0);
            expect(posts.every(post => post.category.includes(category)), `Не все объявления соответствуют категории ${category}`).toBeTruthy();
        });
    }
});
