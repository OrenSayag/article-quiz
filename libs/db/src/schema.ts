import {
  int,
  json,
  mysqlEnum,
  mysqlTable,
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
