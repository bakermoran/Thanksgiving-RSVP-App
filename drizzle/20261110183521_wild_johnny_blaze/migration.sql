CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_obligations` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL,
	`invitee_id` integer,
	`category_id` integer NOT NULL,
	CONSTRAINT `fk_obligations_invitee_id_invitees_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `invitees`(`id`),
	CONSTRAINT `fk_obligations_category_id_obligation_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `obligation_categories`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_obligations`(`id`, `created_at`, `updated_at`, `name`, `invitee_id`, `category_id`) SELECT `id`, `created_at`, `updated_at`, `name`, `invitee_id`, `category_id` FROM `obligations`;--> statement-breakpoint
DROP TABLE `obligations`;--> statement-breakpoint
ALTER TABLE `__new_obligations` RENAME TO `obligations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_obligations_name` ON `obligations` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_users_email` ON `users` (`email`);