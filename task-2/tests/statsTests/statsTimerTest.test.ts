import { test, expect } from '@playwright/test';
import { StatsPage } from '../../pages/statsPage/statsPage';
import { MainPage } from '../../pages/mainPage/mainPage';

test.describe('STATS-TIMER-01: Проверка управления таймером обновления статистики', () => {
    let statsPage: StatsPage;
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
        mainPage.clickStatsPageBtn();
        statsPage = new StatsPage(page);
    });

    test('Кнопка "Обновить" сбрасывает таймер к 5 минутам 0 секунд', async () => {
        const initialValue = await statsPage.getTimerValue();

        await statsPage.clickRefreshTimerBtn();

        const refreshedValue = await statsPage.getTimerValue();
        expect(refreshedValue).toContain('5:00');
    });

    test('Кнопка остановки таймера останавливает автообновление и показывает сообщение', async () => {
        await statsPage.clickToggleTimerBtn();

        const buttonText = await statsPage.getToggleButtonText();
        expect(buttonText).toMatch("▶️");

        expect(await statsPage.isUpdateDisabledMsgVisible()).toBeTruthy();
    });

    test('Кнопка запуска таймера запускает автообновление и скрывает сообщение', async () => {
        await statsPage.clickToggleTimerBtn();
        expect(await statsPage.isUpdateDisabledMsgVisible()).toBeTruthy();

        await statsPage.clickToggleTimerBtn();

        const buttonText = await statsPage.getToggleButtonText();
        expect(buttonText).toMatch(/Остановить|Стоп/);

        expect(await statsPage.isUpdateDisabledMsgVisible()).toBeFalsy();
    });

    test('Полный цикл управления таймером: обновить -> остановить -> запустить', async () => {
        await statsPage.clickRefreshTimerBtn();
        let timerValue = await statsPage.getTimerValue();
        expect(timerValue).toContain('5:00');

        await statsPage.clickToggleTimerBtn();
        expect(await statsPage.getToggleButtonText()).toMatch(/Запустить|Включить/);
        expect(await statsPage.isUpdateDisabledMsgVisible()).toBeTruthy();

        await statsPage.clickToggleTimerBtn();
        expect(await statsPage.getToggleButtonText()).toMatch(/Остановить|Стоп/);
        expect(await statsPage.isUpdateDisabledMsgVisible()).toBeFalsy();
    });
});
