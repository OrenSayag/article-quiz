import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db } from './config';

async function main() {
  await migrate(db, { migrationsFolder: './drizzle' });
}

main();
