CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rsvps` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`event_id` integer NOT NULL,
	`invitee_id` integer NOT NULL,
	`is_attending` integer NOT NULL,
	CONSTRAINT `fk_rsvps_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`),
	CONSTRAINT `fk_rsvps_invitee_id_invitees_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `invitees`(`id`),
	CONSTRAINT "rsvps_is_attending_bool" CHECK("is_attending" IN (0, 1))
);
