CREATE TABLE `invite_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `invitees` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`invite_group_id` integer NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	CONSTRAINT `fk_invitees_invite_group_id_invite_groups_id_fk` FOREIGN KEY (`invite_group_id`) REFERENCES `invite_groups`(`id`)
);
--> statement-breakpoint
CREATE INDEX `idx_invitees_fullname` ON `invitees` (`first_name`,`last_name`);