CREATE TABLE `user_quiz_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`quiz` int,
	`user` varchar(255),
	CONSTRAINT `user_quiz_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user_quiz_history` ADD CONSTRAINT `user_quiz_history_quiz_quizzes_id_fk` FOREIGN KEY (`quiz`) REFERENCES `quizzes`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_quiz_history` ADD CONSTRAINT `user_quiz_history_user_user_id_fk` FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;