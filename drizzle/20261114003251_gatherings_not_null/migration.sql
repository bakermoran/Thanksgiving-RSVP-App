CREATE TABLE `__bak_sqlite_sequence` AS SELECT * FROM `sqlite_sequence`;--> statement-breakpoint
CREATE TABLE `__bak_invite_groups` AS SELECT * FROM `invite_groups`;--> statement-breakpoint
CREATE TABLE `__bak_invitees` AS SELECT * FROM `invitees`;--> statement-breakpoint
CREATE TABLE `__bak_invitee_aliases` AS SELECT * FROM `invitee_aliases`;--> statement-breakpoint
CREATE TABLE `__bak_events` AS SELECT * FROM `events`;--> statement-breakpoint
CREATE TABLE `__bak_obligation_categories` AS SELECT * FROM `obligation_categories`;--> statement-breakpoint
CREATE TABLE `__bak_obligations` AS SELECT * FROM `obligations`;--> statement-breakpoint
CREATE TABLE `__bak_invites` AS SELECT * FROM `invites`;--> statement-breakpoint
CREATE TABLE `__bak_rsvps` AS SELECT * FROM `rsvps`;--> statement-breakpoint
DROP TABLE `rsvps`;--> statement-breakpoint
DROP TABLE `invites`;--> statement-breakpoint
DROP TABLE `obligations`;--> statement-breakpoint
DROP TABLE `obligation_categories`;--> statement-breakpoint
DROP TABLE `events`;--> statement-breakpoint
DROP TABLE `invitee_aliases`;--> statement-breakpoint
DROP TABLE `invitees`;--> statement-breakpoint
DROP TABLE `invite_groups`;--> statement-breakpoint
CREATE TABLE `invite_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`gathering_id` integer NOT NULL,
	CONSTRAINT `fk_invite_groups_gathering_id_gatherings_id_fk` FOREIGN KEY (`gathering_id`) REFERENCES `gatherings`(`id`)
);
--> statement-breakpoint
CREATE TABLE `invitees` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`invite_group_id` integer NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`gathering_id` integer NOT NULL,
	CONSTRAINT `fk_invitees_invite_group_id_invite_groups_id_fk` FOREIGN KEY (`invite_group_id`) REFERENCES `invite_groups`(`id`),
	CONSTRAINT `fk_invitees_gathering_id_gatherings_id_fk` FOREIGN KEY (`gathering_id`) REFERENCES `gatherings`(`id`)
);
--> statement-breakpoint
CREATE TABLE `invitee_aliases` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`invitee_id` integer NOT NULL,
	`alias` text NOT NULL,
	CONSTRAINT `fk_invitee_aliases_invitee_id_invitees_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `invitees`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL,
	`startTime` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`endTime` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`address1` text NOT NULL,
	`address2` text,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`gathering_id` integer NOT NULL,
	CONSTRAINT `fk_events_gathering_id_gatherings_id_fk` FOREIGN KEY (`gathering_id`) REFERENCES `gatherings`(`id`)
);
--> statement-breakpoint
CREATE TABLE `obligation_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL,
	`sort_order` integer NOT NULL,
	`gathering_id` integer NOT NULL,
	CONSTRAINT `fk_obligation_categories_gathering_id_gatherings_id_fk` FOREIGN KEY (`gathering_id`) REFERENCES `gatherings`(`id`)
);
--> statement-breakpoint
CREATE TABLE `obligations` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text NOT NULL,
	`invitee_id` integer,
	`category_id` integer NOT NULL,
	`sort_order` integer NOT NULL,
	`gathering_id` integer NOT NULL,
	CONSTRAINT `fk_obligations_invitee_id_invitees_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `invitees`(`id`),
	CONSTRAINT `fk_obligations_category_id_obligation_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `obligation_categories`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_obligations_gathering_id_gatherings_id_fk` FOREIGN KEY (`gathering_id`) REFERENCES `gatherings`(`id`)
);
--> statement-breakpoint
CREATE TABLE `invites` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`code` text NOT NULL,
	`created_by` integer,
	`expires_at` text DEFAULT (datetime('now', '+7 days')) NOT NULL,
	`redeemed_at` text,
	`redeemed_by` integer,
	`gathering_id` integer NOT NULL,
	CONSTRAINT `fk_invites_created_by_invitees_id_fk` FOREIGN KEY (`created_by`) REFERENCES `invitees`(`id`),
	CONSTRAINT `fk_invites_redeemed_by_invitees_id_fk` FOREIGN KEY (`redeemed_by`) REFERENCES `invitees`(`id`),
	CONSTRAINT `fk_invites_gathering_id_gatherings_id_fk` FOREIGN KEY (`gathering_id`) REFERENCES `gatherings`(`id`)
);
--> statement-breakpoint
CREATE TABLE `rsvps` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`event_id` integer NOT NULL,
	`invitee_id` integer NOT NULL,
	`is_attending` integer NOT NULL,
	`gathering_id` integer NOT NULL,
	CONSTRAINT `fk_rsvps_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`),
	CONSTRAINT `fk_rsvps_invitee_id_invitees_id_fk` FOREIGN KEY (`invitee_id`) REFERENCES `invitees`(`id`),
	CONSTRAINT `fk_rsvps_gathering_id_gatherings_id_fk` FOREIGN KEY (`gathering_id`) REFERENCES `gatherings`(`id`),
	CONSTRAINT "rsvps_is_attending_bool" CHECK("is_attending" IN (0, 1))
);
--> statement-breakpoint
INSERT INTO `invite_groups`(`id`, `created_at`, `updated_at`, `gathering_id`) SELECT `id`, `created_at`, `updated_at`, `gathering_id` FROM `__bak_invite_groups`;--> statement-breakpoint
INSERT INTO `invitees`(`id`, `created_at`, `updated_at`, `invite_group_id`, `first_name`, `last_name`, `gathering_id`) SELECT `id`, `created_at`, `updated_at`, `invite_group_id`, `first_name`, `last_name`, `gathering_id` FROM `__bak_invitees`;--> statement-breakpoint
INSERT INTO `invitee_aliases`(`id`, `created_at`, `updated_at`, `invitee_id`, `alias`) SELECT `id`, `created_at`, `updated_at`, `invitee_id`, `alias` FROM `__bak_invitee_aliases`;--> statement-breakpoint
INSERT INTO `events`(`id`, `created_at`, `updated_at`, `name`, `startTime`, `endTime`, `address1`, `address2`, `city`, `state`, `zip`, `gathering_id`) SELECT `id`, `created_at`, `updated_at`, `name`, `startTime`, `endTime`, `address1`, `address2`, `city`, `state`, `zip`, `gathering_id` FROM `__bak_events`;--> statement-breakpoint
INSERT INTO `obligation_categories`(`id`, `created_at`, `updated_at`, `name`, `sort_order`, `gathering_id`) SELECT `id`, `created_at`, `updated_at`, `name`, `sort_order`, `gathering_id` FROM `__bak_obligation_categories`;--> statement-breakpoint
INSERT INTO `obligations`(`id`, `created_at`, `updated_at`, `name`, `invitee_id`, `category_id`, `sort_order`, `gathering_id`) SELECT `id`, `created_at`, `updated_at`, `name`, `invitee_id`, `category_id`, `sort_order`, `gathering_id` FROM `__bak_obligations`;--> statement-breakpoint
INSERT INTO `invites`(`id`, `created_at`, `updated_at`, `code`, `created_by`, `expires_at`, `redeemed_at`, `redeemed_by`, `gathering_id`) SELECT `id`, `created_at`, `updated_at`, `code`, `created_by`, `expires_at`, `redeemed_at`, `redeemed_by`, `gathering_id` FROM `__bak_invites`;--> statement-breakpoint
INSERT INTO `rsvps`(`id`, `created_at`, `updated_at`, `event_id`, `invitee_id`, `is_attending`, `gathering_id`) SELECT `id`, `created_at`, `updated_at`, `event_id`, `invitee_id`, `is_attending`, `gathering_id` FROM `__bak_rsvps`;--> statement-breakpoint
DELETE FROM `sqlite_sequence` WHERE `name` IN ('invite_groups', 'invitees', 'invitee_aliases', 'events', 'obligation_categories', 'obligations', 'invites', 'rsvps');--> statement-breakpoint
INSERT INTO `sqlite_sequence`(`name`, `seq`) SELECT `name`, `seq` FROM `__bak_sqlite_sequence` WHERE `name` IN ('invite_groups', 'invitees', 'invitee_aliases', 'events', 'obligation_categories', 'obligations', 'invites', 'rsvps');--> statement-breakpoint
DROP TABLE `__bak_sqlite_sequence`;--> statement-breakpoint
DROP TABLE `__bak_invite_groups`;--> statement-breakpoint
DROP TABLE `__bak_invitees`;--> statement-breakpoint
DROP TABLE `__bak_invitee_aliases`;--> statement-breakpoint
DROP TABLE `__bak_events`;--> statement-breakpoint
DROP TABLE `__bak_obligation_categories`;--> statement-breakpoint
DROP TABLE `__bak_obligations`;--> statement-breakpoint
DROP TABLE `__bak_invites`;--> statement-breakpoint
DROP TABLE `__bak_rsvps`;--> statement-breakpoint
CREATE INDEX `idx_invitee_aliases_alias` ON `invitee_aliases` (`alias`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_invite_code` ON `invites` (`code`);--> statement-breakpoint
CREATE INDEX `idx_invitees_fullname` ON `invitees` (`first_name`,`last_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_obligations_category_name` ON `obligation_categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_obligations_category_sort_order` ON `obligation_categories` (`sort_order`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_obligations_name` ON `obligations` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_obligations_sort_order` ON `obligations` (`sort_order`);--> statement-breakpoint
CREATE UNIQUE INDEX `uq_rsvps_event_invitee` ON `rsvps` (`event_id`,`invitee_id`);
