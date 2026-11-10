-- Hand-edited: SQLite can't ADD COLUMN with an expression default, so rebuild the table.
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_invites` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`code` text NOT NULL,
	`created_by` integer,
	`expires_at` text DEFAULT (datetime('now', '+7 days')) NOT NULL,
	`redeemed_at` text,
	`redeemed_by` integer,
	CONSTRAINT `fk_invites_created_by_invitees_id_fk` FOREIGN KEY (`created_by`) REFERENCES `invitees`(`id`),
	CONSTRAINT `fk_invites_redeemed_by_invitees_id_fk` FOREIGN KEY (`redeemed_by`) REFERENCES `invitees`(`id`)
);--> statement-breakpoint
INSERT INTO `__new_invites` (`id`, `created_at`, `updated_at`, `code`, `expires_at`, `redeemed_at`, `redeemed_by`)
SELECT `id`, `created_at`, `updated_at`, `code`, datetime(`created_at`, '+7 days'), `redeemed_at`, `redeemed_by` FROM `invites`;--> statement-breakpoint
DROP TABLE `invites`;--> statement-breakpoint
ALTER TABLE `__new_invites` RENAME TO `invites`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `unique_invite_code` ON `invites` (`code`);
