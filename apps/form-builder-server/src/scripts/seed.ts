import { drizzle } from 'drizzle-orm/postgres-js';
import { reset } from 'drizzle-seed';
import postgres from 'postgres';

import { fields, forms, sections, users } from '../database/schema';
import { seedForms } from './seed-forms';
import { seedUsers } from './seed-users';

async function main() {
  const connection = postgres(getConnectionString());
  const db = drizzle(connection);

  console.log('🌱 Starting database seeding...');

  // Reset the database first
  console.log('🔄 Resetting database...');
  await reset(db, { users, forms, sections, fields });
  console.log('✅ Database reset completed');

  // Seed users first
  await seedUsers(db);

  // Seed forms (depends on users being seeded first)
  await seedForms(db);

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
