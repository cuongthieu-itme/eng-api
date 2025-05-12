import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categories = [
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Beauty & Health',
  'Sports & Outdoors',
  'Toys & Games',
  'Automotive',
  'Books',
  'Groceries',
  'Office Supplies',
  'Pet Supplies',
  'Garden & Outdoor',
  'Jewelry',
  'Watches',
  'Music Instruments',
  'Baby Products',
  'Tools & Home Improvement',
  'Appliances',
  'Movies & TV',
  'Video Games',
];

export const createCategories = async () => {
  const categoriesExists = await prisma.category.count();
  if (categoriesExists > 0) {
    return;
  }
  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category,
      },
    });
  }
};
