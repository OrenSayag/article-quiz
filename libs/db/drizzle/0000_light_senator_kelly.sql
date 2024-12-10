CREATE TABLE `jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`status` enum('started','failed','success') NOT NULL,
	`type` enum('create-quiz') NOT NULL,
	`data` json NOT NULL,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`source` text NOT NULL,
	`data` json NOT NULL,
	CONSTRAINT `quizzes_id` PRIMARY KEY(`id`)
);
