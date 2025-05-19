import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const seedUsers = async () => {
  try {
    await prisma.user.deleteMany();

    const adminPassword = await bcrypt.hash('root123', 10);
    await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@gmail.com',
        password: adminPassword,
        role: Role.ADMIN,
        phoneNumber: '0123456789',
      },
    });

    const userPassword = await bcrypt.hash('root123', 10);
    await prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'user@gmail.com',
        password: userPassword,
        role: Role.STUDENT,
        phoneNumber: '0123456781',
      },
    });

    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};
