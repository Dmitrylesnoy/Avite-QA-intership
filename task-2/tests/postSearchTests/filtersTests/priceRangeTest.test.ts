import { test, expect } from '@playwright/test';
import { MainPage } from '../../../pages/mainPage/mainPage';

test.describe('FILTER-PRICE-01: Проверка работы фильтра "Диапазон цен"', () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.open();
  });

  test('Вариант 1: Только "До" = 0 - только объявления с ценой 0', async () => {
    await mainPage.clearPriceDown();
    await mainPage.setPriceUp(0);

    const posts = await mainPage.getPosts();

    for (const post of posts) {
      expect(post.price).toBe(0);
    }
  });

  test('Вариант 2: Только "До" = -1 - фильтр не применился', async () => {
    await mainPage.clearPriceDown();
    await mainPage.clearPriceUp();
    const allPostsWithoutFilter = await mainPage.getPosts();

    await mainPage.setPriceUp(-1);
    const posts = await mainPage.getPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.map(post => post.title)).toEqual(allPostsWithoutFilter.map(post => post.title));
  });

  test('Вариант 3: Только "До" = 0.1 - объявления с ценой до 0.1', async () => {
    await mainPage.clearPriceDown();
    await mainPage.setPriceUp(0.1);

    const posts = await mainPage.getPosts();

    for (const post of posts) {
      expect(post.price).toBeLessThanOrEqual(0.1);
    }
  });

  test('Вариант 4: "От" = 0, "До" пустое - показаны все объявления', async () => {
    await mainPage.setPriceDown(0);
    await mainPage.clearPriceUp();

    const posts = await mainPage.getPosts();

    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.price).toBeGreaterThanOrEqual(0);
    }
  });

  test('Вариант 5: "От" = -1, "До" пустое - фильтр не применился', async () => {
    await mainPage.clearPriceDown();
    await mainPage.clearPriceUp();
    const allPostsWithoutFilter = await mainPage.getPosts();

    await mainPage.setPriceDown(-1);
    const posts = await mainPage.getPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.map(post => post.title)).toEqual(allPostsWithoutFilter.map(post => post.title));

  });

  test('Вариант 6: "От" = 0.1, "До" пустое - объявления с ценой от 0.1', async () => {
    await mainPage.setPriceDown(0.1);
    await mainPage.clearPriceUp();

    const posts = await mainPage.getPosts();

    for (const post of posts) {
      expect(post.price).toBeGreaterThanOrEqual(0.1);
    }
  });

  test('Вариант 7: "От" = 1000, "До" = 10 - объявления не найдены', async () => {
    await mainPage.setPriceDown(1000);
    await mainPage.setPriceUp(10);

    const posts = await mainPage.getPosts();

    expect(posts.length).toBe(0);
  });

  test('Вариант 8: "От" = 10, "До" = 10000 - только объявления с ценой от 10 до 10000 включительно', async () => {
    await mainPage.setPriceDown(10);
    await mainPage.setPriceUp(10000);

    const posts = await mainPage.getPosts();

    for (const post of posts) {
      expect(post.price).toBeGreaterThanOrEqual(10);
      expect(post.price).toBeLessThanOrEqual(10000);
    }
  });
});