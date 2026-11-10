CREATE TABLE `obligation_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `obligations` ADD `category_id` integer REFERENCES obligation_categories(id);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_obligations_category_name` ON `obligation_categories` (`name`);