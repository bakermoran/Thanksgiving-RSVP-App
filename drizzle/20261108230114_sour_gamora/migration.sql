CREATE TABLE `invitee_aliases` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`invitee_id` integer NOT NULL,
	`alias` text NOT NULL,
	CONSTRAINT `fk_invitee_aliases_invitee_id_invitees_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `invitees`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `idx_invitee_aliases_alias` ON `invitee_aliases` (`alias`);