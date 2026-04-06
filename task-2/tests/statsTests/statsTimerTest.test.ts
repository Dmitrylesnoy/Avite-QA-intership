import { test, expect } from '@playwright/test';
import { StatsPage } from '../../pages/statsPage/statsPage';
import { MainPage } from '../../pages/mainPage/mainPage';

test.describe('STATS-TIMER-01: Проверка управления таймером обновления статистики', () => {
    let statsPage: StatsPage;
    let mainPage: MainPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.open();
        await mainPage.clickStatsPageBtn();
        statsPage = new StatsPage(page);
        await statsPage.waitForOpen();
    });

    test('Кнопка "Обновить" сбрасывает таймер к 5 минутам 0 секунд', async () => {
        setTimeout(async () => { await statsPage.clickRefreshTimerBtn(); }, 5000);

        const refreshedValue = await statsPage.getTimerValue();
        expect(refreshedValue, "Таймер не сброшен до 5:00").toContain('5:00');
    });

    test('Кнопка остановки таймера останавливает автообновление и показывает сообщение', async () => {
        await statsPage.clickToggleTimerBtn();

        const buttonText = await statsPage.getToggleButtonText();
        expect(buttonText, "Кнопка не переключилась на '▶️'").toMatch("▶️");

        expect(await statsPage.isUpdateDisabledMsgVisible(), "Сообщение об отключении автообновления не отображается").toBeTruthy();
    });

    test('Кнопка запуска таймера запускает автообновление и скрывает сообщение', async () => {
        await statsPage.clickToggleTimerBtn();
        expect(await statsPage.isUpdateDisabledMsgVisible(), "Сообщение об отключении автообновления не отображается").toBeTruthy();

        await statsPage.clickToggleTimerBtn();

        const buttonText = await statsPage.getToggleButtonText();
        expect(buttonText, "Кнопка не переключилась на '⏹️'").toMatch(/Остановить|Стоп/);

        expect(await statsPage.isUpdateDisabledMsgVisible()).toBeFalsy();
    });

    test('Полный цикл управления таймером: обновить -> остановить -> запустить', async () => {
        await statsPage.clickRefreshTimerBtn();
        let timerValue = await statsPage.getTimerValue();
        expect(timerValue, "Таймер не сброшен до 5:00").toContain('5:00');

        await statsPage.clickToggleTimerBtn();
        expect(await statsPage.getToggleButtonText(), "Кнопка не переключилась на '▶️'").toMatch(/Запустить|Включить/);
        expect(await statsPage.isUpdateDisabledMsgVisible(), "Сообщение об отключении автообновления не отображается").toBeTruthy();

        await statsPage.clickToggleTimerBtn();
        expect(await statsPage.getToggleButtonText(), "Кнопка не переключилась на '⏹️'").toMatch(/Остановить|Стоп/);
        expect(await statsPage.isUpdateDisabledMsgVisible(), "Сообщение об отключении автообновления не отображается").toBeFalsy();
    });
});
