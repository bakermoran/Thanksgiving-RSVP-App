CREATE TABLE `obligations` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL,
	`invitee_id` integer,
	CONSTRAINT `fk_obligations_invitee_id_invitees_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `invitees`(`id`)
);
