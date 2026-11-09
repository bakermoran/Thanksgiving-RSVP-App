CREATE TABLE `invites` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`code` text NOT NULL,
	`redeemed_at` text,
	`redeemed_by` integer,
	CONSTRAINT `fk_invites_redeemed_by_invitees_id_fk` FOREIGN KEY (`redeemed_by`) REFERENCES `invitees`(`id`)
);
