import { test, expect } from '@playwright/test';
import { StatsPage } from '../../pages/statsPage/statsPage';
import { MainPage } from '../../pages/mainPage/mainPage';

test.describe('STATS-TIMER-01: Проверка управления таймером обновления статистики', () => {
    let statsPage: StatsPage;
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        mainPage.open();
        mainPage.clickStatsPageBtn();
        statsPage = new StatsPage(page);
        statsPage.waitForOpen();
    });

    test('Кнопка "Обновить" сбрасывает таймер к 5 минутам 0 секунд', async () => {
        statsPage.clickRefreshTimerBtn();

        const refreshedValue = statsPage.getTimerValue();
        expect(refreshedValue).toContain('5:00');
    });

    test('Кнопка остановки таймера останавливает автообновление и показывает сообщение', async () => {
        statsPage.clickToggleTimerBtn();

        const buttonText = statsPage.getToggleButtonText();
        expect(buttonText).toMatch("▶️");

        expect(statsPage.isUpdateDisabledMsgVisible()).toBeTruthy();
    });

    test('Кнопка запуска таймера запускает автообновление и скрывает сообщение', async () => {
        statsPage.clickToggleTimerBtn();
        expect(statsPage.isUpdateDisabledMsgVisible()).toBeTruthy();

        statsPage.clickToggleTimerBtn();

        const buttonText = statsPage.getToggleButtonText();
        expect(buttonText).toMatch(/Остановить|Стоп/);

        expect(statsPage.isUpdateDisabledMsgVisible()).toBeFalsy();
    });

    test('Полный цикл управления таймером: обновить -> остановить -> запустить', async () => {
        statsPage.clickRefreshTimerBtn();
        let timerValue = statsPage.getTimerValue();
        expect(timerValue).toContain('5:00');

        statsPage.clickToggleTimerBtn();
        expect(statsPage.getToggleButtonText()).toMatch(/Запустить|Включить/);
        expect(statsPage.isUpdateDisabledMsgVisible()).toBeTruthy();

        statsPage.clickToggleTimerBtn();
        expect(statsPage.getToggleButtonText()).toMatch(/Остановить|Стоп/);
        expect(statsPage.isUpdateDisabledMsgVisible()).toBeFalsy();
    });
});
