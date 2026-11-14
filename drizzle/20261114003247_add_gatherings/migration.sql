CREATE TABLE `gatherings` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `events` ADD `gathering_id` integer REFERENCES gatherings(id);--> statement-breakpoint
ALTER TABLE `invites` ADD `gathering_id` integer REFERENCES gatherings(id);--> statement-breakpoint
ALTER TABLE `invite_groups` ADD `gathering_id` integer REFERENCES gatherings(id);--> statement-breakpoint
ALTER TABLE `invitees` ADD `gathering_id` integer REFERENCES gatherings(id);--> statement-breakpoint
ALTER TABLE `obligation_categories` ADD `gathering_id` integer REFERENCES gatherings(id);--> statement-breakpoint
ALTER TABLE `obligations` ADD `gathering_id` integer REFERENCES gatherings(id);--> statement-breakpoint
ALTER TABLE `rsvps` ADD `gathering_id` integer REFERENCES gatherings(id);