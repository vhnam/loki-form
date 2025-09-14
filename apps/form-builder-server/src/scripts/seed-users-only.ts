import { drizzle } from 'drizzle-orm/postgres-js';
import { reset } from 'drizzle-seed';
import postgres from 'postgres';

import { users } from '../database/schema';
import { seedUsers } from './seed-users';

function getConnectionString(): string {
  const host = process.env.DATABASE_HOST || 'localhost';
  const port = process.env.DATABASE_PORT || '5432';
  const user = process.env.DATABASE_USER || 'loki_form';
  const password = process.env.DATABASE_PASSWORD || 'loki_form';
  const database = process.env.DATABASE_NAME || 'loki_form';

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}

async function main() {
  const connection = postgres(getConnectionString());
  const db = drizzle(connection);

  console.log('🌱 Starting users-only database seeding...');

  // Reset only users table
  console.log('🔄 Resetting users table...');
  await reset(db, { users });
  console.log('✅ Users table reset completed');

  // Seed users
  await seedUsers(db);

  await connection.end();
  console.log('📦 Database connection closed');
}

main().catch((error) => {
  console.error('❌ Error seeding users:', error);
  process.exit(1);
});
