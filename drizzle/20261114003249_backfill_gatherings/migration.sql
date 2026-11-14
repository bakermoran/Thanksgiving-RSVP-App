INSERT INTO `gatherings` (`id`, `name`) VALUES (1, 'Thanksgiving');--> statement-breakpoint
UPDATE `events` SET `gathering_id` = 1 WHERE `gathering_id` IS NULL;--> statement-breakpoint
UPDATE `invites` SET `gathering_id` = 1 WHERE `gathering_id` IS NULL;--> statement-breakpoint
UPDATE `invite_groups` SET `gathering_id` = 1 WHERE `gathering_id` IS NULL;--> statement-breakpoint
UPDATE `invitees` SET `gathering_id` = 1 WHERE `gathering_id` IS NULL;--> statement-breakpoint
UPDATE `obligation_categories` SET `gathering_id` = 1 WHERE `gathering_id` IS NULL;--> statement-breakpoint
UPDATE `obligations` SET `gathering_id` = 1 WHERE `gathering_id` IS NULL;--> statement-breakpoint
UPDATE `rsvps` SET `gathering_id` = 1 WHERE `gathering_id` IS NULL;
