export const prioritiesMap: Record<string, string> = {
    'Обычный': 'normal',
    'Срочный': 'urgent',
};

export const categoriesMap: Record<string, number> = {
    'Электроника': 0,
    'Недвижимость': 1,
    'Транспорт': 2,
    'Работа': 3,
    'Услуги': 4,
    'Животные': 5,
    'Мода': 6,
    'Детское': 7,
};

export const sortingMap: Record<string, string> = {
    'Дате создания': 'createdAt',
    'Цене': 'price',
    'Приоритету': 'priority',
};

export const sortOrderMap: Record<string, string> = {
    'По убыванию': 'desc',
    'По возрастанию': 'asc',
};
