import { test, expect, devices } from '@playwright/test';
import { MainPage } from '../../pages/mainPage/mainPage';

test.use({ ...devices['Pixel 5'] });

test.describe('THEME-TGL-01: Проверка изменения темы на мобильной версии', () => {
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
    });

    test('Переключение темы с тёмной на светлую и обратно', async () => {
        await mainPage.clickThemeToggle();
        expect(await mainPage.getTheme()).toBe('dark');
        expect(await mainPage.getThemeToggleText()).toContain('Темная');

        await mainPage.clickThemeToggle();
        expect(await mainPage.getTheme()).toBe('light');
        expect(await mainPage.getThemeToggleText()).toContain('Светлая');
    });
});
