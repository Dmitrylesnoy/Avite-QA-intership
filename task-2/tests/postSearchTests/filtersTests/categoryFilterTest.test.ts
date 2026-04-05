import { test, expect } from '@playwright/test';
import { MainPage } from '../../../pages/mainPage/mainPage';

const categories = [
    'Электроника',
    'Недвижимость',
    'Транспорт',
    'Работа',
    'Услуги',
    'Животные',
    'Детское',
    'Мода',
];

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
        expect(await mainPage.getSelectedCategory()).toContain('Все категории');
    });

    for (const category of categories) {
        test(`Категория ${category} должна возвращать только объявления из категории ${category}`, async () => {
            await mainPage.setCategory(category);
            const posts = await mainPage.getPosts();

            expect(posts.length).toBeGreaterThan(0);
            expect(await mainPage.getSelectedCategory()).toContain(category);
            expect(posts.every(post => post.category.includes(category))).toBeTruthy();
        });
    }
});
