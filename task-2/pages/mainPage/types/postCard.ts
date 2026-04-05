export type PostItem = {
    title: string;
    price: number;
    category: string;
    priority: boolean;
    status: string;
    date: string;
}

export const titleSelector = 'xpath=.//h3[contains(@class, "title")]';
export const priceSelector = 'xpath=.//div[contains(@class, "price")]';
export const categorySelector = 'xpath=.//div[contains(@class, "category")]';
export const prioritySelector = 'xpath=.//span[contains(@class, "priority")]';
export const statusSelector = 'xpath=.//span[contains(@class, "status")]';
export const dateSelector = "xpath=.//span[contains(@class, 'date')]";