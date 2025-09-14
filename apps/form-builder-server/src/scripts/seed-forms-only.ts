import { drizzle } from 'drizzle-orm/postgres-js';
import { reset } from 'drizzle-seed';
import postgres from 'postgres';

import { fields, forms, sections } from '../database/schema';
import { seedForms } from './seed-forms';

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

  console.log('🌱 Starting forms-only database seeding...');

  // Reset only forms-related tables
  console.log('🔄 Resetting forms, sections, and fields tables...');
  await reset(db, { forms, sections, fields });
  console.log('✅ Forms tables reset completed');

  // Seed forms (requires users to exist)
  await seedForms(db);

  await connection.end();
  console.log('📦 Database connection closed');
}

main().catch((error) => {
  console.error('❌ Error seeding forms:', error);
  process.exit(1);
});
