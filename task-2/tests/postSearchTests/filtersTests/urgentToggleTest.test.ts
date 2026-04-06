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
        expect(await mainPage.isPriorityToggleChecked(), "Тогл не активирован").toBeTruthy();
        expect(await mainPage.getSelectedPriority(), "Выбранный приоритет не соответствует ожидаемому - Срочный").toContain('Срочный');

        const urgentPosts = await mainPage.getPosts();
        expect(urgentPosts.length, "Количество срочных объявлений не соответствует ожидаемому").toBeGreaterThan(0);
        expect(urgentPosts.every(post => post.priority), "Не все объявления являются срочными").toBeTruthy();

        await mainPage.togglePriority();
        expect(await mainPage.isPriorityToggleChecked(), "Тогл не деактивирован").toBeFalsy();
        expect(await mainPage.getSelectedPriority(), "Выбранный приоритет не соответствует ожидаемому").toContain('Все');

        const allPosts = await mainPage.getPosts();
        expect(allPosts.length, "Количество объявлений не соответствует ожидаемому").toBeGreaterThan(0);

        await mainPage.setPriority('Срочный');
        expect(await mainPage.getSelectedPriority(), "Выбранный приоритет не соответствует ожидаемому").toContain('Срочный');

        const urgentPostsAgain = await mainPage.getPosts();
        expect(urgentPostsAgain.length, "Количество срочных объявлений не соответствует ожидаемому").toBeGreaterThan(0);
        expect(urgentPostsAgain.every(post => post.priority), "Не все объявления являются срочными").toBeTruthy();
    });
});
