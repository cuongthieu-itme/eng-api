import { seedUsers } from '../src/utils/functions/user.seed';

const main = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    await seedUsers();

    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    throw error;
  }
};

main()
  .then(async () => {
    console.log('🔚 Seed process finished');
    process.exit(0);
  })
  .catch((e) => {
    console.error('❌ Seed process failed:', e);
    process.exit(1);
  });
