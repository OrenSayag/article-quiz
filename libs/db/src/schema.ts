import {
  int,
  json,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import {
  InputContent,
  JobStatus,
  JobType,
  Quiz,
} from '@article-quiz/shared-types';

export const jobs = mysqlTable('jobs', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  status: mysqlEnum([
    JobStatus.STARTED,
    JobStatus.FAILED,
    JobStatus.SUCCESS,
    JobStatus.QUEUED,
  ]).notNull(),
  type: mysqlEnum([JobType.CREATE_QUIZ]).notNull(),
  data: json('data').$type<InputContent>().notNull(),
});

export const quizzes = mysqlTable('quizzes', {
  id: int('id').primaryKey().autoincrement(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  source: text().notNull(),
  data: json('data').$type<Quiz>().notNull(),
  timeToCreateInMs: int('time_to_create_in_ms').notNull(),
  modelUsed: varchar('model_used', { length: 244 }),
});

export const users = mysqlTable('user', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    fsp: 3,
  }),
  image: varchar('image', { length: 255 }),
  enabledSites: json('enabled_sites').$type<string[]>(),
});

export const userQuizHistory = mysqlTable('user_quiz_history', {
  id: int().primaryKey().autoincrement(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  quiz: int().references(() => quizzes.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  user: varchar({ length: 255 }).references(() => users.id),
});

export const accounts = mysqlTable(
  'account',
  {
    userId: varchar('userId', { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 2048 }),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = mysqlTable('session', {
  sessionToken: varchar('sessionToken', { length: 255 }).primaryKey(),
  userId: varchar('userId', { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});
