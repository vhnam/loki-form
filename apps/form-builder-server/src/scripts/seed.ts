import * as bcrypt from 'bcrypt';
import { drizzle } from 'drizzle-orm/postgres-js';
import { reset, seed } from 'drizzle-seed';
import postgres from 'postgres';

import { users } from '../database/schema';

async function main() {
  const connection = postgres(getConnectionString());
  const db = drizzle(connection);

  console.log('🌱 Starting database seeding...');

  // Reset the database first
  console.log('🔄 Resetting database...');
  await reset(db, { users });
  console.log('✅ Database reset completed');

  // Generate password hash
  const password = 'Azxcv!123';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('🔐 Generated hash for password');

  // Seed users (both superadmin and regular user)
  await seed(db, { users }).refine((funcs) => ({
    users: {
      count: 2,
      columns: {
        email: funcs.valuesFromArray({
          values: ['sa@lokiform.io', 'user.01@yopmail.com'],
        }),
        firstName: funcs.valuesFromArray({
          values: ['Vincent', 'Chet'],
        }),
        lastName: funcs.valuesFromArray({
          values: ['Wu', 'Baker'],
        }),
        password: funcs.valuesFromArray({
          values: [hashedPassword, hashedPassword],
        }),
        role: funcs.valuesFromArray({
          values: ['superadmin', 'user'],
        }),
        interfaceMode: funcs.valuesFromArray({
          values: ['system', 'system'],
        }),
        interfaceLanguage: funcs.valuesFromArray({
          values: ['en-US', 'en-US'],
        }),
        isActive: funcs.valuesFromArray({
          values: [true, true],
        }),
      },
    },
  }));

  console.log('✅ Users seeded successfully!');
  console.log('👤 Superadmin:');
  console.log('   📧 Email: sa@lokiform.io');
  console.log('   🔑 Password:', password);
  console.log('👤 Regular User:');
  console.log('   📧 Email: user.01@yopmail.com');
  console.log('   🔑 Password:', password);
  console.log('⚠️  IMPORTANT: Please change the passwords after first login!');

  await connection.end();
  console.log('📦 Database connection closed');
}

function getConnectionString(): string {
  const host = process.env.DATABASE_HOST || 'localhost';
  const port = process.env.DATABASE_PORT || '5432';
  const user = process.env.DATABASE_USER || 'loki_form';
  const password = process.env.DATABASE_PASSWORD || 'loki_form';
  const database = process.env.DATABASE_NAME || 'loki_form';

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}

main().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});
