import { test, expect } from '@playwright/test';
import { MainPage } from '../../../pages/mainPage/mainPage';

test.describe('FILTER-TGL-IMM-01: Проверка тогла "Только срочные"', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test('Тогл срочных объявлений активируется, деактивируется и работает фильтрация', async () => {
        await mainPage.togglePriority();
        expect(await mainPage.isPriorityToggleChecked()).toBeTruthy();
        expect(await mainPage.getSelectedPriority()).toContain('Срочный');

        const urgentPosts = await mainPage.getPosts();
        expect(urgentPosts.length).toBeGreaterThan(0);
        expect(urgentPosts.every(post => post.priority)).toBeTruthy();

        await mainPage.togglePriority();
        expect(await mainPage.isPriorityToggleChecked()).toBeFalsy();
        expect(await mainPage.getSelectedPriority()).toContain('Все');

        const allPosts = await mainPage.getPosts();
        expect(allPosts.length).toBeGreaterThan(0);

        await mainPage.setPriority('Срочный');
        expect(await mainPage.getSelectedPriority()).toContain('Срочный');

        const urgentPostsAgain = await mainPage.getPosts();
        expect(urgentPostsAgain.length).toBeGreaterThan(0);
        expect(urgentPostsAgain.every(post => post.priority)).toBeTruthy();
    });
});
