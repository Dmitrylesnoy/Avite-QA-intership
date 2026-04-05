export type PostItem = {
    title: string;
    price: number;
    category: string;
    express: boolean;
    status: string;
    date: string;
}

export const titleSelector = "\\h3[contains(@class, 'title')]";
export const priceSelector = "\\div[contains(@class, 'price')]";
export const categorySelector = "\\div[contains(@class, 'category')]";
export const prioritySelector = "\\span[contains(@class, 'priority')]";
export const statusSelector = "\\span[contains(@class, 'status')]";
export const dateSelector = "\\div[contains(@class, 'date')]";